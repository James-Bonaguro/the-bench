# the-bench

MCP server with Streamable HTTP transport support, built with the official [@modelcontextprotocol/sdk](https://github.com/modelcontextprotocol/typescript-sdk).

## Quick Start

```bash
npm install
npm run dev
```

The server starts on `http://localhost:3000/mcp` (configurable via `PORT` env var).

## Endpoints

- `POST /mcp` — JSON-RPC messages (initialize, tool calls, etc.)
- `GET /mcp` — SSE stream for server-to-client notifications
- `DELETE /mcp` — Session termination
- `GET /health` — Health check

## Example Tools

| Tool | Description |
|------|-------------|
| `echo` | Echoes back a message |
| `add` | Adds two numbers |
| `get_timestamp` | Returns the current server timestamp |

## Scripts

```bash
npm run dev      # Start with tsx (hot reload)
npm run build    # Compile TypeScript
npm start        # Run compiled output
npm test         # Run tests
```
