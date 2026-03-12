import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

/**
 * Creates and configures the MCP server with example tools, resources, and prompts.
 */
export function createMcpServer(): McpServer {
  const server = new McpServer(
    {
      name: "the-bench",
      version: "1.0.0",
    },
    {
      capabilities: {
        logging: {},
      },
    }
  );

  // --- Tools ---

  server.tool(
    "echo",
    "Echoes back the provided message",
    { message: z.string().describe("The message to echo back") },
    async ({ message }) => ({
      content: [{ type: "text", text: `Echo: ${message}` }],
    })
  );

  server.tool(
    "add",
    "Adds two numbers together",
    {
      a: z.number().describe("First number"),
      b: z.number().describe("Second number"),
    },
    async ({ a, b }) => ({
      content: [{ type: "text", text: String(a + b) }],
    })
  );

  server.tool(
    "get_timestamp",
    "Returns the current server timestamp",
    async () => ({
      content: [{ type: "text", text: new Date().toISOString() }],
    })
  );

  // --- Resources ---

  server.resource(
    "server-info",
    "info://server",
    { description: "Information about this MCP server" },
    async () => ({
      contents: [
        {
          uri: "info://server",
          mimeType: "application/json",
          text: JSON.stringify(
            {
              name: "the-bench",
              version: "1.0.0",
              transport: "streamable-http",
              uptime: process.uptime(),
            },
            null,
            2
          ),
        },
      ],
    })
  );

  // --- Prompts ---

  server.prompt(
    "greeting",
    "Generate a personalized greeting",
    { name: z.string().describe("Name to greet") },
    async ({ name }) => ({
      messages: [
        {
          role: "user" as const,
          content: {
            type: "text" as const,
            text: `Please greet ${name} warmly and ask how they are doing today.`,
          },
        },
      ],
    })
  );

  return server;
}
