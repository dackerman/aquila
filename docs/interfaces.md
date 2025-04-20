Here are the **major system boundaries**, with the key interfaces and data types that cross each:

---

## 1  UI ↔ Gateway (tRPC) citeturn2file0
**Procedures & Payloads**
- `postChat(input: { channel: string; text: string }) → ChatMessage`
- `subscribeChat(input: { channel: string }) → stream<ChatMessage>`
- `listAgents() → AgentConfig[]`
- `createAgent(input: AgentConfig) → AgentConfig`
- `listChannels() → Channel[]`

**Core Types**
```ts
interface ChatMessage {
  id: string;
  agentId: string | 'human';
  channelId: string;
  role: 'user'|'assistant'|'tool';
  content: string;
  ts: number;
}

interface AgentConfig {
  id: string;
  name: string;
  model: string;
  systemPrompt: string;
  tools: string[];
  memoryPolicy: string;
}

interface Channel {
  id: string;
  name: string;
  type: 'public'|'private'|'repo';
}
```

---

## 2  Gateway → Event Bus (NATS / in‑mem) citeturn2file2
**Published Subjects & Payloads**
- `aquila.chat.message` → `ChatMessageEvent { …same fields as ChatMessage… }`
- `aquila.task.created` → `TaskCreatedEvent { taskId, creatorId, spec: TaskSpec }`
- `aquila.job.queued` → `JobQueuedEvent { jobId, taskId, agentId }`
- `aquila.tool.call` → `ToolCallEvent { callId, agentId, toolId, input }`
- `aquila.tool.result` → `ToolResultEvent { callId, output, cost, duration }`
- `aquila.run.finished` → `RunFinishedEvent { jobId, success, tokens, cost }`

---

## 3  Orchestrator → BullMQ Queue
```ts
interface JobPayload {
  jobId:    string;
  taskId:   string;
  agentId:  string;
  spec:     TaskSpec;
  context:  ChatMessage[];      // assembled snapshot
}
```

---

## 4  Worker ↔ ModelAdapter
```ts
// Request
interface ModelRequest {
  modelId:   string;
  prompt:    string;
  functions?: FunctionSpec[];
  maxTokens?: number;
}

// Response
interface ModelResponse {
  content:      string;
  functionCall?: { name: string; arguments: any };
}
```

---

## 5  Worker ↔ ToolClient (MCP JSON‑RPC) citeturn2file2
```jsonc
// Standard JSON‑RPC 2.0 envelope
{
  "jsonrpc": "2.0",
  "id":       "<callId>",
  "method":   "<toolId>",
  "params":   { /* tool‐specific input */ }
}
// →
{
  "jsonrpc": "2.0",
  "id":       "<callId>",
  "result":   { /* tool‐specific output */ }
}
```

---

## 6  Data Layer (Drizzle‑ORM / SQLite) citeturn2file2
```ts
// messages table
messages: {
  id:       Text,
  channel:  Text,
  author:   Text,
  role:     Text,
  content:  Text,
  ts:       Integer,
}

// agents table
agents: {
  id:            Text,
  name:          Text,
  model:         Text,
  system_prompt: Text,
  memory_policy: Text,
}

// tasks, jobs, embeddings similarly defined…
```

---

## 7  Gateway ↔ GitHub App
- **Outgoing**:
  ```ts
  interface PRCreateRequest {
    repo: string;
    branch: string;
    title: string;
    body:  string;
  }
  ```
- **Incoming Webhook**:
  ```ts
  interface PullRequestEvent {
    action: 'opened'|'reviewed'|'closed';
    number: number;
    repo:   { full_name: string };
    sender: { login: string };
    // …etc
  }
  ```
  Mapped into `aquila.chat.message` or `aquila.task.created`.

---

## 8  UI Admin ↔ Gateway
- `subscribeEvents(filter: EventFilter) → stream<EventRecord>`
- `getCostMetrics(agentId?: string) → CostSnapshot[]`

```ts
interface EventRecord {
  subject: string;  // e.g. 'aquila.tool.call'
  payload: any;
  ts:      number;
}

interface CostSnapshot {
  agentId: string;
  tokens:  number;
  cost:    number;
  ts:      number;
}
```

---

Together, these interfaces and types define the **full contract** between UI, API, agents, tool layers, and persistence—ensuring **type safety**, **auditability**, and **testability** across the entire Aquila platform.
