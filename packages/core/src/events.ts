import { z } from 'zod';
import { ChatMessageSchema } from './types';

// Base event interface
export interface EventBase {
  subject: string;
  payload: unknown;
  ts: number;
}

// Chat message event
export const ChatMessageEventSchema = ChatMessageSchema;
export type ChatMessageEvent = z.infer<typeof ChatMessageEventSchema>;

// Simple in-memory event emitter
export class EventEmitter {
  private handlers: Map<string, Array<(event: EventBase) => void>> = new Map();

  public on(subject: string, handler: (event: EventBase) => void): () => void {
    if (!this.handlers.has(subject)) {
      this.handlers.set(subject, []);
    }
    
    this.handlers.get(subject)?.push(handler);
    
    // Return unsubscribe function
    return () => {
      const handlers = this.handlers.get(subject);
      if (handlers) {
        const index = handlers.indexOf(handler);
        if (index !== -1) {
          handlers.splice(index, 1);
        }
      }
    };
  }

  public emit(subject: string, payload: unknown): void {
    const event: EventBase = {
      subject,
      payload,
      ts: Date.now(),
    };
    
    // Call all handlers for this subject
    this.handlers.get(subject)?.forEach(handler => handler(event));
    
    // Also call wildcard handlers
    this.handlers.get('*')?.forEach(handler => handler(event));
  }
}

// Default singleton instance
export const eventBus = new EventEmitter();