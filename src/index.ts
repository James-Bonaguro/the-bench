import express from "express";
import cors from "cors";
import { randomUUID } from "node:crypto";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createMcpServer } from "./server.js";

const PORT = parseInt(process.env.PORT || "3000", 10);
const app = express();

app.use(cors());
app.use(express.json());

// Map of session ID -> transport for stateful sessions
const transports = new Map<string, StreamableHTTPServerTransport>();

// Handle MCP requests (POST for JSON-RPC messages)
app.post("/mcp", async (req, res) => {
  const sessionId = req.headers["mcp-session-id"] as string | undefined;

  // If we have a session ID, route to existing transport
  if (sessionId && transports.has(sessionId)) {
    const transport = transports.get(sessionId)!;
    await transport.handleRequest(req, res, req.body);
    return;
  }

  // New session — create transport and server
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

  // Store transport by session ID after connection (session ID is set during init)
  await transport.handleRequest(req, res, req.body);

  if (transport.sessionId) {
    transports.set(transport.sessionId, transport);
  }
});

// Handle SSE streams (GET for server-to-client notifications)
app.get("/mcp", async (req, res) => {
  const sessionId = req.headers["mcp-session-id"] as string | undefined;

  if (!sessionId || !transports.has(sessionId)) {
    res.status(400).json({ error: "Invalid or missing session ID" });
    return;
  }

  const transport = transports.get(sessionId)!;
  await transport.handleRequest(req, res);
});

// Handle session termination (DELETE)
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

// Health check endpoint
app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    sessions: transports.size,
    uptime: process.uptime(),
  });
});

app.listen(PORT, () => {
  console.log(`MCP Streamable HTTP server listening on port ${PORT}`);
  console.log(`  MCP endpoint: http://localhost:${PORT}/mcp`);
  console.log(`  Health check: http://localhost:${PORT}/health`);
});
