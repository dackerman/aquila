/**
 * API contract package
 * Type definitions for the API contract shared between client and server.
 */
import { z } from 'zod';

// Core types
export interface User {
  id: string;
  username: string;
  createdAt: number;
}

export interface Message {
  id: string;
  channelId: string;
  author: string;
  role: 'user' | 'assistant' | 'tool';
  content: string;
  timestamp: number;
}

export interface Channel {
  id: string;
  name: string;
  type: 'public' | 'private' | 'repo';
}

// tRPC context type
export interface TRPCContext {
  user?: {
    id: string;
    name: string;
  };
}

// Mock router and procedure for tRPC - in a real implementation, these would be properly implemented
type RouterMock = Record<string, unknown>;
export const router: RouterMock = {};
export const procedure: Record<string, unknown> = {};

// Zod schemas for validation
export const HealthCheckSchema = z.object({}).strict();

export const HealthCheckResponseSchema = z.object({
  status: z.enum(['ok', 'error']),
  version: z.string().optional(),
}).strict();

// Export types
export type Context = TRPCContext;

// Mock app router - in a real implementation, we would use tRPC
export const appRouter = {
  health: {
    query: async (): Promise<{status: string, version: string}> => ({
      status: 'ok',
      version: '0.1.0',
    }),
  },
};

export type AppRouter = typeof appRouter;

// Export api as an object with a router property
export const api = {
  router: {},
};