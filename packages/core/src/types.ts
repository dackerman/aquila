import { z } from 'zod';

// User model
export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  createdAt: z.number(),
});

export type User = z.infer<typeof UserSchema>;

// Chat message model
export const ChatMessageSchema = z.object({
  id: z.string(),
  channelId: z.string(),
  authorId: z.string(),
  role: z.enum(['user', 'assistant', 'tool']),
  content: z.string(),
  ts: z.number(),
});

export type ChatMessage = z.infer<typeof ChatMessageSchema>;

// Agent config model
export const AgentConfigSchema = z.object({
  id: z.string(),
  name: z.string(),
  model: z.string(),
  systemPrompt: z.string(),
  tools: z.array(z.string()),
  memoryPolicy: z.string(),
});

export type AgentConfig = z.infer<typeof AgentConfigSchema>;

// Channel model
export const ChannelSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(['public', 'private', 'repo']),
});

export type Channel = z.infer<typeof ChannelSchema>;