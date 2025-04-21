import { z } from 'zod';
import { ChatMessageSchema } from './types';

// Base event interface with generic payload type
export interface EventBase<T = unknown> {
  id: string;
  subject: string;
  payload: T;
  ts: number;
  meta?: Record<string, unknown>;
}

// Known event types for type safety
export enum EventType {
  CHAT_MESSAGE = 'chat.message',
  ERROR = 'error',
  SYSTEM = 'system',
  USER_UPDATED = 'user.updated'
}

// Chat message event
export const ChatMessageEventSchema = ChatMessageSchema;
export type ChatMessageEvent = z.infer<typeof ChatMessageEventSchema>;

// Error event schema
export const ErrorEventSchema = z.object({
  error: z.any(),
  errorId: z.string(),
  path: z.string().optional(),
});

export type ErrorEvent = z.infer<typeof ErrorEventSchema>;

// Event handler type
export type EventHandler<T = unknown> = (event: EventBase<T>) => void | Promise<void>;

/**
 * Enhanced event emitter with:
 * - Type safety for known events
 * - Async handler support
 * - Error handling for handlers
 * - Event history for debugging
 */
export class EventEmitter {
  private handlers: Map<string, Array<EventHandler>> = new Map();
  private eventHistory: Array<EventBase> = [];
  private maxHistorySize = 100;
  private errorHandler?: (error: Error, event: EventBase) => void;

  /**
   * Subscribe to events by subject
   * @param subject The event subject to listen for, or '*' for all events
   * @param handler The handler function
   * @returns Unsubscribe function
   */
  public on<T = unknown>(subject: string, handler: EventHandler<T>): () => void {
    if (!this.handlers.has(subject)) {
      this.handlers.set(subject, []);
    }
    
    this.handlers.get(subject)?.push(handler as EventHandler);
    
    // Return unsubscribe function
    return () => {
      const handlers = this.handlers.get(subject);
      if (handlers) {
        const index = handlers.indexOf(handler as EventHandler);
        if (index !== -1) {
          handlers.splice(index, 1);
        }
      }
    };
  }

  /**
   * Subscribe to a specific event type with proper typing
   */
  public onEvent<T>(eventType: EventType, handler: EventHandler<T>): () => void {
    return this.on<T>(eventType, handler);
  }
  
  /**
   * Set global error handler for event processing errors
   */
  public setErrorHandler(handler: (error: Error, event: EventBase) => void): void {
    this.errorHandler = handler;
  }

  /**
   * Emit an event
   * @param subject Event subject
   * @param payload Event payload
   * @param meta Optional metadata
   */
  public emit<T>(subject: string, payload: T, meta?: Record<string, unknown>): void {
    const event: EventBase<T> = {
      id: this.generateEventId(),
      subject,
      payload,
      ts: Date.now(),
      meta
    };
    
    // Store in history
    this.addToHistory(event);
    
    // Execute handlers asynchronously to avoid blocking
    Promise.resolve().then(() => {
      // Call specific handlers
      this.executeHandlers(subject, event);
      
      // Call wildcard handlers
      this.executeHandlers('*', event);
    });
  }

  /**
   * Get recent events for debugging
   */
  public getRecentEvents(limit = this.maxHistorySize): Array<EventBase> {
    return this.eventHistory.slice(-limit);
  }

  /**
   * Clear event history
   */
  public clearHistory(): void {
    this.eventHistory = [];
  }

  /**
   * Execute handlers with error handling
   */
  private executeHandlers(subject: string, event: EventBase): void {
    this.handlers.get(subject)?.forEach(handler => {
      try {
        const result = handler(event);
        
        // Handle promise rejection
        if (result instanceof Promise) {
          result.catch(error => {
            this.handleError(error, event);
          });
        }
      } catch (error) {
        this.handleError(error instanceof Error ? error : new Error(String(error)), event);
      }
    });
  }
  
  /**
   * Handle errors from event handlers
   */
  private handleError(error: Error, event: EventBase): void {
    if (this.errorHandler) {
      this.errorHandler(error, event);
    } else {
      console.error(`Error in event handler for ${event.subject}:`, error);
    }
  }
  
  /**
   * Generate a unique event ID
   */
  private generateEventId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
  }
  
  /**
   * Add event to history with limit
   */
  private addToHistory(event: EventBase): void {
    this.eventHistory.push(event);
    if (this.eventHistory.length > this.maxHistorySize) {
      this.eventHistory.shift();
    }
  }
}

// Default singleton instance
export const eventBus = new EventEmitter();