# Aquila Project Milestones

---

## Phase 0 – Monorepo Bootstrap
- **Init workspace**: create pnpm mono‑repo, workspace `package.json`, strict `tsconfig`.
- **Core libraries**: add TypeScript, ESLint, Prettier, Drizzle‑ORM, Vitest.
- **Gateway skeleton**: tRPC server with a single `GET /health` route.
- **Database**: set up SQLite WAL, Drizzle migrations, `users` + `messages` tables.
- **CI seed**: GitHub Actions running type‑check and lint.

**🎯 Demo Artifact**: clone repo, run `pnpm dev`; receive `{"status":"ok"}` from `/health`.

---

## Phase 1 – Chat MVP
- **WebSocket transport**: add real‑time tRPC subscription endpoint.
- **Chat UI**: minimal Next.js page with message list and input box.
- **Channel model**: create `channels` table; persisted public channel `#general`.
- **Single agent loop**: `OpenAIAdapter` + echo‑bot role; messages stored in DB.
- **Local secrets vault**: load API key from encrypted `.env.age`.

**🎯 Demo Artifact**: two browser tabs exchange messages with an AI echo‑bot in `#general`, all offline except OpenAI API call.

---

## Phase 2 – GitHub Integration & Workspace Ops
- **Workspace manager**: per‑agent `git worktree` under `/workspace`.
- **Shell MCP**: HTTP tool server exposing read‑only shell commands.
- **GitHub App**: minimal app that can open issues/PRs; webhooks routed to gateway.
- **Coder agent**: writes to branch, commits, opens PR via GitHub App.
- **CI smoke tests**: run `npm test` in agent worktree on PR.

**🎯 Demo Artifact**: type “generate README” → coder agent creates branch, commits README, opens PR visible in GitHub UI.

---

## Phase 3 – Multi‑Agent Routing + Hybrid Memory
- **Task orchestrator**: event‑bus router assigning jobs to agents.
- **Memory subsystem**: short‑term buffer, vector store, note files, SELF‑RAG gating.
- **Reviewer agent**: leaves inline comments, blocks or approves PR.
- **Role configurator**: UI panel to spawn/edit agents with free‑form prompts.

**🎯 Demo Artifact**: architect decomposes task → coder opens PR → reviewer comments → human merges.

---

## Phase 4 – Admin Dashboard & Observability
- **Langfuse integration**: trace every message, tool call, cost.
- **Live event stream**: real‑time log viewer with filters.
- **Prompt inspector**: click message to view full prompt/response diff.
- **Cost analytics**: token + $ graphs per agent and per task.

**🎯 Demo Artifact**: admin visits `/admin`, watches tokens and cost tick up live while agents chat.

---

## Phase 5 – Deterministic Test Harness & CI
- **Stub adapters**: regex‑based LLM responder for unit tests.
- **Fake timers & bus**: inject deterministic time and in‑mem event bus.
- **End‑to‑end scenarios**: tests for “task → PR merged” flow passing in CI.
- **Coverage gating**: pull‑request fails if coverage < 80 %.

**🎯 Demo Artifact**: `pnpm test` runs full agent workflow locally without internet; CI badge green.

---

## Phase 6 – Provider Marketplace & Extension SDK
- **Adapter plugin API**: load model/tool adapters dynamically via ES modules.
- **Marketplace UI**: install/enable adapters from a YAML manifest.
- **Local model support**: add GGUF/Llama via Ollama bridge.

**🎯 Demo Artifact**: from UI, click “Enable Claude‑3” and run task with Anthropic without changing code.

---

## Phase 7 – Community Alpha & Documentation
- **Install script**: one‑liner `curl | bash` spins up containers.
- **Docs site**: mkdocs with quick‑start, architecture, plugin how‑to.
- **Issue templates**: bug, feature, discussion categories.
- **Community Discord / Matrix**: public support channel.

**🎯 Demo Artifact**: public repo README screencast shows end‑to‑end task solved; community can reproduce on their laptops.
