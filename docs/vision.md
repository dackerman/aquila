# Project Vision – Multi‑Agent Orchestration Platform (codename **Aquila**)

## 1 Vision Statement
Create the **definitive self‑hosted platform** that lets any technical professional spin up, direct and observe a fleet of specialised LLM agents—each running on the model of their choice—working together like human teammates to design, code, review and ship software, **without ever sending proprietary data off‑prem**.

## 2 Mission (North‑Star)
> **Empower developers to delegate cognitive work to AI colleagues while maintaining absolute ownership of code, credentials and context.**

## 3 Guiding Principles
| Principle | Implication |
|-----------|-------------|
| **Local‑first, privacy‑first** | Runs entirely on user‑owned hardware; only outbound traffic is metered API calls. |
| **Provider‑agnostic** | Seamlessly mix OpenAI, Claude, Gemini, Grok, local GGUF, etc.; swap models without touching orchestration logic. |
| **Composable roles** | Users define arbitrary system prompts, memory policies and tool scopes—no baked‑in role taxonomy. |
| **Stateful & self‑improving** | Agents retain full historical context, compress intelligently, and write durable notes to disk. |
| **Observable & debuggable** | Every message, tool call and cost metric is traceable in real time and replay‑able later. |
| **Deterministic & testable** | Entire system can run against stubbed providers, frozen time and mock tools for CI. |
| **Extensible by design** | New tools, models, transports or UIs can be added via explicit plugin interfaces.

## 4 Target Users & Personas
* **Solo engineer / indie hacker** – needs affordable AI pair‑programming without SaaS lock‑in.
* **CTO / Architect at a security‑sensitive firm** – wants to accelerate internal dev while keeping IP inside the firewall.
* **Researcher / Data scientist** – orchestrates specialised agents for literature review and experiment automation.

## 5 Core Capabilities
1. **Multi‑agent orchestration** – spawn, configure and route tasks between agents dynamically.
2. **Hybrid memory subsystem** – short‑term window, vector recall & note files with retrieval gating.
3. **Workspace ops** – per‑agent git worktrees, shell execution, PR creation & code review.
4. **Self‑hosted chat UI** – Slack‑like channels and threads built on Matrix‑react‑sdk components.
5. **Admin observability dashboard** – live event stream, prompt inspector, cost graphs (Langfuse‑powered).
6. **Pluggable tool layer** – MCP servers for shell, git, HTTP, DB, cloud APIs.
7. **Deterministic test harness** – stub LLMs, fake timers, memory‑in‑RAM for pipeline tests.

## 6 Differentiators
* **100 % data residency** – everything stored in SQLite + local FS; optional encrypted vault.
* **TypeScript end‑to‑end** – tRPC contracts give UI ↔ server type safety and mockability.
* **Event‑sourced kernel** – enables replay, time‑travel debugging and consistent state recovery.
* **Memory policy per agent** – fine‑grained cost/perf/privacy trade‑offs.
* **Out‑of‑the‑box GitHub workflows** – agents open and review PRs like human teammates.

## 7 Success Metrics (North‑Star KPIs)
| Metric | Target Yr‑1 |
|--------|------------|
| Time to first PR merged (cold install) | **< 15 min** |
| Average human tokens sent vs AI tokens produced | **≤ 1 : 20** |
| Mean cost per merged PR (OpenAI pricing) | **< US$0.30** |
| Reproducible CI pass rate with stubbed agents | **≥ 99 %** |
| P0 security incidents | **0**

## 8 High‑Level Roadmap
| Phase | Milestone (Done = keeps vision true) |
|-------|---------------------------------------|
| **0** | Monorepo bootstrap ⇢ pnpm, TS strict mode, Drizzle schema. |
| **1** | Single‑agent loop + chat UI MVP. |
| **2** | GitHub integration & workspace ops. |
| **3** | Multi‑agent routing + hybrid memory. |
| **4** | Admin dashboard & Langfuse tracing. |
| **5** | Deterministic test harness & CI suite. |
| **6** | Provider marketplace (plug‑in adapters). |
| **7** | Community alpha, docs & extension SDK.

## 9 Non‑Goals (for clarity)
* **No SaaS backend** – hosting, billing or storage services.
* **No closed federation** – we won’t re‑implement Slack or Matrix servers.
* **No attempt at full autonomy** – agents stay under explicit human direction.

## 10 Risks & Mitigations
| Risk | Mitigation |
|------|-----------|
| API pricing spikes | Runtime heuristics to downgrade models or rate‑limit. |
| Rapid model evolution | Adapter pattern isolates provider churn. |
| Memory bloat | Rolling summarisation + vector eviction thresholds. |
| Security breaches | Local‑only default bind, per‑agent user namespaces, encrypted vault. |

---
### The North‑Star
**When a developer can say, “Architect, draft the auth refactor,” watch two AI teammates debate implementation details in real‑time, and merge the resulting PR within minutes—**all while every byte of source stays on their own machine—**Aquila’s vision is realised.**

## 11 Human‑in‑the‑Loop Governance & Safety Controls
| Control Point | Default Behaviour | Rationale |
|---------------|------------------|-----------|
| **PR Creation** | Agents can open PRs, **never merge**. All PRs require one AI reviewer **plus human approval**. | Prevents premature merges and enables cost‑effective peer review before CEO involvement. |
| **AI → AI Review** | Every PR is auto‑assigned to a distinct reviewer agent with a different model or temperature. Disagreements flag the PR for human triage. | Diversity catches hallucinations and flaky logic. |
| **Conflict Detection** | On branch checkout, agents run `git status --porcelain` hooks; any staged overlapping edits with open PRs trigger a halt + Slack‑style notification. | Avoid dumb merge conflicts early. |
| **Budget Guardrails** | Each agent has a **cost quota** (USD or token) per job. Quota exhaustion pauses the agent and surfaces a dashboard alert. | Prevents runaway API spending. |
| **Workspace Sandboxing** | Agents operate in isolated git worktrees; writes outside the branch root are blocked by the shell MCP. | Contain side‑effects and enable easy rollback. |
| **Stop‑Conditions** | Orchestrator stops an agent if: (a) cost > quota, (b) ≥ N continuous tool errors, (c) reviewer agent issues a “BLOCK” verdict. | Automated safety net before human review. |
| **Checkpoint Commits** | Agents push incremental commits every K modified lines; allows granular diff review and revert. | Limits cumulative damage. |
| **CI Simulation** | Pre‑merge pipeline uses stubbed models & fake timers to replay the PR and ensure determinism. | Detects nondeterministic agent behaviour early. |
| **CEO Dashboards** | Live cost meter, blocked PR list, agent health panel. One‑click “freeze agent” control. | Empowers human CEO to intervene at will. |
