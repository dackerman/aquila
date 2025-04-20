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
  ui              // Next.js app, shadcn components, recoil store
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
```

## API Endpoints

- `GET /health` - Basic health check endpoint
- `/trpc/*` - tRPC API router

## Current Status

This project is in early development. Phase 0 (Monorepo Bootstrap) has been completed:

- [x] Init workspace with pnpm mono-repo
- [x] Set up TypeScript, ESLint, Prettier, Drizzle-ORM, Vitest
- [x] Create a Gateway skeleton with a /health route
- [x] Configure SQLite WAL with Drizzle migrations for users and messages tables
- [x] Add GitHub Actions for CI (type-check and lint)

## License

[MIT](LICENSE)