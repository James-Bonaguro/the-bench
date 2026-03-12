import { describe, it, expect, beforeAll, afterAll } from "vitest";
import express from "express";
import cors from "cors";
import { randomUUID } from "node:crypto";
import { Server } from "node:http";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createMcpServer } from "../src/server.js";

let httpServer: Server;
let baseUrl: string;

// Map of session ID -> transport for stateful sessions
const transports = new Map<string, StreamableHTTPServerTransport>();

beforeAll(async () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.post("/mcp", async (req, res) => {
    const sessionId = req.headers["mcp-session-id"] as string | undefined;

    if (sessionId && transports.has(sessionId)) {
      const transport = transports.get(sessionId)!;
      await transport.handleRequest(req, res, req.body);
      return;
    }

    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: () => randomUUID(),
    });

    const server = createMcpServer();

    transport.onclose = () => {
      if (transport.sessionId) {
        transports.delete(transport.sessionId);
      }
    };

    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);

    if (transport.sessionId) {
      transports.set(transport.sessionId, transport);
    }
  });

  app.get("/mcp", async (req, res) => {
    const sessionId = req.headers["mcp-session-id"] as string | undefined;
    if (!sessionId || !transports.has(sessionId)) {
      res.status(400).json({ error: "Invalid or missing session ID" });
      return;
    }
    const transport = transports.get(sessionId)!;
    await transport.handleRequest(req, res);
  });

  app.delete("/mcp", async (req, res) => {
    const sessionId = req.headers["mcp-session-id"] as string | undefined;
    if (!sessionId || !transports.has(sessionId)) {
      res.status(400).json({ error: "Invalid or missing session ID" });
      return;
    }
    const transport = transports.get(sessionId)!;
    await transport.handleRequest(req, res);
    transports.delete(sessionId);
  });

  await new Promise<void>((resolve) => {
    httpServer = app.listen(0, () => {
      const addr = httpServer.address();
      if (typeof addr === "object" && addr) {
        baseUrl = `http://localhost:${addr.port}`;
      }
      resolve();
    });
  });
});

afterAll(async () => {
  // Close all transports
  for (const transport of transports.values()) {
    await transport.close();
  }
  transports.clear();

  await new Promise<void>((resolve, reject) => {
    httpServer.close((err) => (err ? reject(err) : resolve()));
  });
});

async function createClient(): Promise<Client> {
  const client = new Client({ name: "test-client", version: "1.0.0" });
  const transport = new StreamableHTTPClientTransport(
    new URL(`${baseUrl}/mcp`)
  );
  await client.connect(transport);
  return client;
}

describe("MCP Streamable HTTP Server", () => {
  it("should connect and initialize", async () => {
    const client = await createClient();
    const info = client.getServerVersion();
    expect(info?.name).toBe("the-bench");
    expect(info?.version).toBe("1.0.0");
    await client.close();
  });

  it("should list tools", async () => {
    const client = await createClient();
    const result = await client.listTools();
    const names = result.tools.map((t) => t.name);
    expect(names).toContain("echo");
    expect(names).toContain("add");
    expect(names).toContain("get_timestamp");
    await client.close();
  });

  it("should call echo tool", async () => {
    const client = await createClient();
    const result = await client.callTool({
      name: "echo",
      arguments: { message: "hello world" },
    });
    expect(result.content).toEqual([
      { type: "text", text: "Echo: hello world" },
    ]);
    await client.close();
  });

  it("should call add tool", async () => {
    const client = await createClient();
    const result = await client.callTool({
      name: "add",
      arguments: { a: 3, b: 7 },
    });
    expect(result.content).toEqual([{ type: "text", text: "10" }]);
    await client.close();
  });

  it("should call get_timestamp tool", async () => {
    const client = await createClient();
    const result = await client.callTool({ name: "get_timestamp" });
    const content = result.content as Array<{ type: string; text: string }>;
    expect(content[0].type).toBe("text");
    // Verify it's a valid ISO date string
    expect(() => new Date(content[0].text)).not.toThrow();
    expect(new Date(content[0].text).getTime()).toBeGreaterThan(0);
    await client.close();
  });

  it("should list resources", async () => {
    const client = await createClient();
    const result = await client.listResources();
    expect(result.resources).toHaveLength(1);
    expect(result.resources[0].name).toBe("server-info");
    expect(result.resources[0].uri).toBe("info://server");
    await client.close();
  });

  it("should read server-info resource", async () => {
    const client = await createClient();
    const result = await client.readResource({ uri: "info://server" });
    expect(result.contents).toHaveLength(1);
    const parsed = JSON.parse(result.contents[0].text as string);
    expect(parsed.name).toBe("the-bench");
    expect(parsed.transport).toBe("streamable-http");
    await client.close();
  });

  it("should list prompts", async () => {
    const client = await createClient();
    const result = await client.listPrompts();
    expect(result.prompts).toHaveLength(1);
    expect(result.prompts[0].name).toBe("greeting");
    await client.close();
  });

  it("should get greeting prompt", async () => {
    const client = await createClient();
    const result = await client.getPrompt({
      name: "greeting",
      arguments: { name: "Alice" },
    });
    expect(result.messages).toHaveLength(1);
    expect(result.messages[0].role).toBe("user");
    expect(
      (result.messages[0].content as { type: string; text: string }).text
    ).toContain("Alice");
    await client.close();
  });
});
