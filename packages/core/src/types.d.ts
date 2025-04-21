import { z } from 'zod';
export declare const UserSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    createdAt: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    email: string;
    createdAt: number;
}, {
    id: string;
    name: string;
    email: string;
    createdAt: number;
}>;
export type User = z.infer<typeof UserSchema>;
export declare const ChatMessageSchema: z.ZodObject<{
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
export type ChatMessage = z.infer<typeof ChatMessageSchema>;
export declare const AgentConfigSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    model: z.ZodString;
    systemPrompt: z.ZodString;
    tools: z.ZodArray<z.ZodString, "many">;
    memoryPolicy: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    model: string;
    systemPrompt: string;
    tools: string[];
    memoryPolicy: string;
}, {
    id: string;
    name: string;
    model: string;
    systemPrompt: string;
    tools: string[];
    memoryPolicy: string;
}>;
export type AgentConfig = z.infer<typeof AgentConfigSchema>;
export declare const ChannelSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    type: z.ZodEnum<["public", "private", "repo"]>;
}, "strip", z.ZodTypeAny, {
    type: "public" | "private" | "repo";
    id: string;
    name: string;
}, {
    type: "public" | "private" | "repo";
    id: string;
    name: string;
}>;
export type Channel = z.infer<typeof ChannelSchema>;
