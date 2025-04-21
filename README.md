# Aquila: Multi-Agent Orchestration Platform

A self-hosted platform that empowers developers to delegate cognitive work to AI colleagues while maintaining absolute ownership of code, credentials, and context.

## Features (Planned)

- **Multi-agent orchestration** – spawn, configure and route tasks between specialized agents
- **Hybrid memory subsystem** – short-term window, vector recall & note files with retrieval gating
- **Workspace ops** – per-agent git worktrees, shell execution, PR creation & code review
- **Self-hosted chat UI** – Slack-like channels and threads
- **Admin observability dashboard** – live event stream, prompt inspector, cost analytics
- **Pluggable tool layer** – MCP servers for shell, git, HTTP, DB, cloud APIs
- **Deterministic test harness** – stub LLMs, fake timers, memory-in-RAM for pipeline tests

## Project Structure

```
/packages
  core            // domain types, event emitter, util
  data            // drizzle schema + DB adapters
  api-contract    // tRPC routers & shared zod schemas
  gateway         // Express + tRPC entrypoint
  orchestrator    // task graph, schedulers, DI container
  agent-runtime   // model adapters, memory manager, tool client
  tools/          // mcp-shell, mcp-git, mcp-fs …
  ui              // Vite + React app for chat interface
  test-kit        // stubs, fake timers, harness
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+

### Installation

```bash
# Clone the repository
git clone https://github.com/[username]/llm-mux.git
cd llm-mux

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Start development server
pnpm dev
```

### Development

```bash
# Run type checking
pnpm typecheck

# Run linting
pnpm lint

# Run tests
pnpm test

# Run just the UI in development mode
pnpm dev:ui
```

## Running the UI

To start the UI in development mode:

```bash
cd packages/ui
pnpm install
pnpm dev
```

Or from the project root:

```bash
pnpm dev:ui
```

The UI will be available at http://localhost:3000

## API Endpoints

- `GET /health` - Basic health check endpoint
- `/trpc/*` - tRPC API router

## Current Status

This project is in early development. We're currently working on Phase 1 (Chat MVP):

- [x] Init workspace with pnpm mono-repo (Phase 0)
- [x] Set up TypeScript, ESLint, Prettier, Drizzle-ORM, Vitest (Phase 0)
- [x] Create a Gateway skeleton with a /health route (Phase 0)
- [x] Configure SQLite WAL with Drizzle migrations for users and messages tables (Phase 0)
- [x] Add GitHub Actions for CI (type-check and lint) (Phase 0)
- [x] Create Slack-like Chat UI skeleton (Phase 1)
- [ ] Add WebSocket transport for real-time updates (Phase 1)
- [ ] Create channel model with persisted public channel (Phase 1)
- [ ] Implement single agent loop with echo-bot role (Phase 1)
- [ ] Add local secrets vault for API keys (Phase 1)

## License

[MIT](LICENSE)