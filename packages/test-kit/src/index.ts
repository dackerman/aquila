/**
 * Test kit package
 * Entry point for test utilities, stubs and harnesses.
 */
import { EventType } from '@aquila/core';
// Import will be available once data package is properly implemented
// import { db } from '@aquila/data';
import { v4 as uuidv4 } from 'uuid';

// Mock db for now until the real one is implemented
const db = {
  run: async (_sql: string, _params?: unknown[]) => ({})
};

/**
 * Test event bus for tracking events during tests
 */
export class TestEventBus {
  private events: Array<{ subject: string; payload: unknown }> = [];
  private listeners: Map<string, Array<(event: unknown) => void>> = new Map();
  
  /**
   * Clear all recorded events
   */
  public clear(): void {
    this.events = [];
  }
  
  /**
   * Get all recorded events
   */
  public getEvents(): Array<{ subject: string; payload: unknown }> {
    return [...this.events];
  }
  
  /**
   * Get events of a specific type
   */
  public getEventsByType(eventType: string): Array<{ subject: string; payload: unknown }> {
    return this.events.filter(event => event.subject === eventType);
  }
  
  /**
   * Mock emitting an event to the bus
   */
  public emit(subject: string, payload: unknown): void {
    this.events.push({ subject, payload });
    
    // Notify listeners
    const subjectListeners = this.listeners.get(subject) || [];
    for (const listener of subjectListeners) {
      listener({ subject, payload });
    }
    
    // Notify wildcard listeners
    const wildcardListeners = this.listeners.get('*') || [];
    for (const listener of wildcardListeners) {
      listener({ subject, payload });
    }
  }
  
  /**
   * Mock registering an event listener
   */
  public on(subject: string, callback: (event: unknown) => void): void {
    if (!this.listeners.has(subject)) {
      this.listeners.set(subject, []);
    }
    
    const listeners = this.listeners.get(subject);
    if (listeners) {
      listeners.push(callback);
    }
  }
  
  /**
   * Clear all listeners
   */
  public clearListeners(): void {
    this.listeners.clear();
  }
  
  /**
   * Mock for onEvent method
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public onEvent<T>(eventType: EventType, callback: (event: unknown) => void): () => void {
    this.on(eventType, callback);
    
    // Return function to unsubscribe
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return () => {
      // Unsubscribe logic
    };
  }
}

/**
 * Creates an in-memory database for testing
 */
export async function createTestDatabase() {
  // Reset the database - in the real implementation this would create an in-memory DB
  await db.run('DELETE FROM messages');
  await db.run('DELETE FROM users');
  
  // Seed with test data
  await db.run(
    'INSERT INTO users (id, username, created_at) VALUES (?, ?, ?)',
    [uuidv4(), 'test_user', Date.now()]
  );
  
  return db;
}

/**
 * Create stub model adapter for testing
 */
export function createStubModelAdapter() {
  return {
    complete: async () => ({ content: 'Test response from stub model' }),
    stream: async function* () {
      yield { content: 'Test ' };
      yield { content: 'response ' };
      yield { content: 'from ' };
      yield { content: 'stub ' };
      yield { content: 'model' };
    }
  };
}

// Export singleton instances for testing
export const testEventBus = new TestEventBus();
