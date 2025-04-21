import { z } from 'zod';
export interface EventBase {
    subject: string;
    payload: unknown;
    ts: number;
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
export declare class EventEmitter {
    private handlers;
    on(subject: string, handler: (event: EventBase) => void): () => void;
    emit(subject: string, payload: unknown): void;
}
export declare const eventBus: EventEmitter;
