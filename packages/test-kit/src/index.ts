/**
 * Test Kit package
 * Utilities for testing Aquila components.
 */
import { EventEmitter, eventBus, ChatMessage, User, AgentConfig } from '@aquila/core';
import { createDb, testDb } from '@aquila/data';
import { v4 as uuidv4 } from 'uuid';

/**
 * Test context for isolated tests
 */
export interface TestContext {
  db: ReturnType<typeof createDb>;
  events: EventEmitter;
  cleanup: () => Promise<void>;
}

/**
 * Creates an isolated test context with its own DB and event emitter
 */
export async function createTestContext(): Promise<TestContext> {
  // Create in-memory test database
  const db = testDb;
  
  // Create isolated event emitter
  const events = new EventEmitter();
  
  // Cleanup function
  const cleanup = async () => {
    // Clean up database (in a real implementation, we would drop tables)
    await db.client.execute('DELETE FROM users');
    await db.client.execute('DELETE FROM messages');
  };
  
  return { db, events, cleanup };
}

/**
 * Create a test user
 */
export function createTestUser(overrides: Partial<User> = {}): User {
  return {
    id: overrides.id || uuidv4(),
    name: overrides.name || 'Test User',
    email: overrides.email || `test-${Date.now()}@example.com`,
    createdAt: overrides.createdAt || Date.now(),
  };
}

/**
 * Create test message
 */
export function createTestMessage(overrides: Partial<ChatMessage> = {}): ChatMessage {
  return {
    id: overrides.id || uuidv4(),
    channelId: overrides.channelId || 'test-channel',
    authorId: overrides.authorId || 'test-user',
    role: overrides.role || 'user',
    content: overrides.content || 'Test message',
    ts: overrides.ts || Date.now(),
  };
}

/**
 * Create test agent config
 */
export function createTestAgentConfig(overrides: Partial<AgentConfig> = {}): AgentConfig {
  return {
    id: overrides.id || uuidv4(),
    name: overrides.name || 'Test Agent',
    model: overrides.model || 'test-model',
    systemPrompt: overrides.systemPrompt || 'You are a test agent',
    tools: overrides.tools || [],
    memoryPolicy: overrides.memoryPolicy || 'session',
  };
}

/**
 * Mock agent for testing
 */
export class MockAgent {
  public messages: ChatMessage[] = [];
  
  constructor(public config: AgentConfig) {}
  
  async process(message: ChatMessage): Promise<ChatMessage> {
    this.messages.push(message);
    
    // Create a response
    const response: ChatMessage = {
      id: uuidv4(),
      channelId: message.channelId,
      authorId: this.config.id,
      role: 'assistant',
      content: `Mock response to: ${message.content}`,
      ts: Date.now(),
    };
    
    return response;
  }
}

/**
 * Capture events for testing
 */
export function captureEvents(emitter: EventEmitter, subject: string): ChatMessage[] {
  const events: ChatMessage[] = [];
  const unsubscribe = emitter.on<ChatMessage>(subject, (event) => {
    events.push(event.payload);
  });
  
  return events;
}

/**
 * Wait for an event to be emitted
 */
export function waitForEvent(emitter: EventEmitter, subject: string, timeout = 5000): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`Timeout waiting for event ${subject}`));
    }, timeout);
    
    const unsubscribe = emitter.on<unknown>(subject, (event) => {
      clearTimeout(timer);
      unsubscribe();
      resolve(event.payload);
    });
  });
}

// Re-export testDb for convenience
export { testDb };