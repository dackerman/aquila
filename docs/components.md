Below is a deeper dive into each major component, its responsibilities, and key implementation considerations:

---

## 1  Core & Data Layer
**Responsibilities:**
- Define all domain types (agents, messages, tasks, jobs, embeddings) in TypeScript interfaces.
- Provide an **append‑only event store** in SQLite (WAL mode) for replayable state and audit trails.
- Expose data access through **Drizzle‑ORM** models and migrations.

**Key considerations:**
- Keep table schemas normalized to avoid write contention (e.g. separate `messages`, `embeddings`, `jobs`).
- Use SQLite’s WAL and shared cache for high read concurrency; batch writes for heavy‑load phases.
- All events (`aquila.*` subjects) are also appended to SQLite for deterministic replay. citeturn2file2

---

## 2  Gateway / API
**Responsibilities:**
- Serve the **tRPC** HTTP & WebSocket endpoints used by both the Chat UI and Admin dashboard.
- Authenticate clients via signed JWTs and enforce per‑IP rate limits.
- Translate incoming requests (`postChat`, GitHub webhooks) into internal events on the Event Bus.

**Key considerations:**
- Leverage **tRPC** to generate end‑to‑end TypeScript types, enabling UI ↔ server mockability.
- Separate public chat routes from privileged admin routes under distinct middleware stacks.
- Publish every successful procedure call as an `aquila.*` event for downstream consumption. citeturn2file2

---

## 3  Event Bus & Orchestrator
**Responsibilities:**
1. **Event Bus**: Fan‑out all domain events (`chat.message`, `task.created`, `tool.call`, etc.) via NATS (or an in‑mem stub in dev).
2. **Orchestrator**: Consume task‑related events, build a **DAG** of dependent jobs, and enqueue them into **BullMQ** (Redis).

**Key considerations:**
- Use subjects like `aquila.job.queued` and `aquila.run.finished` to signal state transitions.
- Enforce rate‑limits, retry policies, and back‑pressure at the orchestrator before enqueuing new jobs.
- Persist all task graphs in SQLite to allow paused workflows to resume after crashes. citeturn2file2

---

## 4  Agent Runtime
**Responsibilities:**
- Run each agent in its own worker process or Bun isolate to sandbox memory and dependencies.
- Assemble prompts by merging:
  1. **Short‑term buffer** (last N tokens).
  2. **Vector recall** (top K semantic hits).
  3. **Long‑term notes** (on‑disk markdown).
  4. **System prompt** (free‑form role instructions).
- Invoke the appropriate **ModelAdapter** (OpenAI, Claude, etc.), parse function‑call responses, and emit `tool.call` events.

**Key considerations:**
- Memory policies (`hybrid` default) gate when to run embeddings vs. summarizations, following Letta/MemGPT patterns. citeturn2file0
- Stream completions back to the Gateway for low‑latency UI updates.
- Capture cost and token usage per call for real‑time billing dashboards.

---

## 5  Tool Layer (MCP Servers)
**Responsibilities:**
- Offer isolated JSON‑RPC endpoints for:
  - **Shell** (`mcp-shell.js`): sandboxed read‑only commands or chrooted exec.
  - **Git** (`mcp-git.js`): branch creation, commits, diffs, PR creation.
  - **Filesystem** (`mcp-fs.js`): controlled CRUD on each agent’s workspace.
  - **Custom**: HTTP proxies, cloud API connectors, vault access.

**Key considerations:**
- Enforce per‑agent ACLs: agents only see their own workspaces and allowed tools.
- Log every tool invocation as `aquila.tool.call`/`aquila.tool.result` for observability.
- Keep MCPs lightweight—bind to localhost and expose only JSON‑RPC to prevent privilege escalation. citeturn2file2

---

## 6  Frontend UI
**Responsibilities:**
- **Chat client**: real‑time channels & threads; send/receive messages over WebSocket.
- **Admin dashboard**: live event stream, prompt inspector, cost/token charts, memory‑window previews.

**Key considerations:**
- Build on **Next.js** with client‑side routing (App Router) and React 18 concurrent features.
- Integrate or fork **Matrix‑react‑sdk** for Slack‑style UX, or implement minimal thread support with Tailwind + shadcn/ui.
- Use **Recharts** (via Chakra or shadcn) for cost analytics and **Langfuse** embeds for trace visuals. citeturn2file0

---

## 7  GitHub Integration
**Responsibilities:**
- Host a **GitHub App** that:
  - Opens issues/PRs on behalf of agents.
  - Listens to review/comments webhooks and republishes them as `chat.message` events.
- Manage **per‑agent worktrees** under `/workspace/<agent>` for isolated Git operations.

**Key considerations:**
- Use `simple-git` or `@octokit/rest` in the Git MCP; enforce branch‑naming conventions.
- Mirror human approvals (`:+1:`) and merge actions back into the system as events.
- Wire CI smoke tests to run `npm test` inside each worktree before allowing PR drafts. citeturn2file2

---

## 8  Testing & CI Harness
**Responsibilities:**
- Provide **TestKit** utilities to:
  - Stub out ModelAdapters with regex or canned responses.
  - Swap the real Event Bus with an in‑memory emitter.
  - Use `memfs` to virtualize the filesystem under test.
  - Control time deterministically via `@sinonjs/fake-timers`.

**Key considerations:**
- Structure tests to cover full workflows: e.g. “task → architect → coder → reviewer → merged PR.”
- Gate CI on ≥ 80 % coverage; include e2e scenarios that run entirely offline.
- Leverage **Vitest** for speedy TS recompilation and deterministic test order. citeturn2file0

---

Each component aligns directly with our vision of an **observable**, **deterministic**, and **extensible** multi‑agent orchestration platform, and will be tackled incrementally per the “Aquila Milestones” roadmap.
