import { z } from 'zod';
export interface EventBase<T = unknown> {
    id: string;
    subject: string;
    payload: T;
    ts: number;
    meta?: Record<string, unknown>;
}
export declare enum EventType {
    CHAT_MESSAGE = "chat.message",
    ERROR = "error",
    SYSTEM = "system",
    USER_UPDATED = "user.updated"
}
export declare const ChatMessageEventSchema: z.ZodObject<{
    id: z.ZodString;
    channelId: z.ZodString;
    authorId: z.ZodString;
    role: z.ZodEnum<["user", "assistant", "tool"]>;
    content: z.ZodString;
    ts: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: string;
    channelId: string;
    authorId: string;
    role: "user" | "assistant" | "tool";
    content: string;
    ts: number;
}, {
    id: string;
    channelId: string;
    authorId: string;
    role: "user" | "assistant" | "tool";
    content: string;
    ts: number;
}>;
export type ChatMessageEvent = z.infer<typeof ChatMessageEventSchema>;
export declare const ErrorEventSchema: z.ZodObject<{
    error: z.ZodAny;
    errorId: z.ZodString;
    path: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    errorId: string;
    error?: any;
    path?: string | undefined;
}, {
    errorId: string;
    error?: any;
    path?: string | undefined;
}>;
export type ErrorEvent = z.infer<typeof ErrorEventSchema>;
export type EventHandler<T = unknown> = (event: EventBase<T>) => void | Promise<void>;
/**
 * Enhanced event emitter with:
 * - Type safety for known events
 * - Async handler support
 * - Error handling for handlers
 * - Event history for debugging
 */
export declare class EventEmitter {
    private handlers;
    private eventHistory;
    private maxHistorySize;
    private errorHandler?;
    /**
     * Subscribe to events by subject
     * @param subject The event subject to listen for, or '*' for all events
     * @param handler The handler function
     * @returns Unsubscribe function
     */
    on<T = unknown>(subject: string, handler: EventHandler<T>): () => void;
    /**
     * Subscribe to a specific event type with proper typing
     */
    onEvent<T>(eventType: EventType, handler: EventHandler<T>): () => void;
    /**
     * Set global error handler for event processing errors
     */
    setErrorHandler(handler: (error: Error, event: EventBase) => void): void;
    /**
     * Emit an event
     * @param subject Event subject
     * @param payload Event payload
     * @param meta Optional metadata
     */
    emit<T>(subject: string, payload: T, meta?: Record<string, unknown>): void;
    /**
     * Get recent events for debugging
     */
    getRecentEvents(limit?: number): Array<EventBase>;
    /**
     * Clear event history
     */
    clearHistory(): void;
    /**
     * Execute handlers with error handling
     */
    private executeHandlers;
    /**
     * Handle errors from event handlers
     */
    private handleError;
    /**
     * Generate a unique event ID
     */
    private generateEventId;
    /**
     * Add event to history with limit
     */
    private addToHistory;
}
export declare const eventBus: EventEmitter;
