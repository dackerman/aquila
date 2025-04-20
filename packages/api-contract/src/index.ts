import { initTRPC } from '@trpc/server';
import { z } from 'zod';

// Define context type that will be used in all procedures
export interface Context {
  user?: {
    id: string;
    name: string;
  };
}

// Initialize tRPC with context type
const t = initTRPC.context<Context>().create();

// Export base router and procedure builders
export const router = t.router;
export const procedure = t.procedure;

// Define input types
export const HealthCheckSchema = z.object({});

// Define output types
export const HealthCheckResponseSchema = z.object({
  status: z.enum(['ok', 'error']),
  version: z.string().optional(),
});

// Export router type for client consumption
export type { Context };
export type AppRouter = typeof appRouter;

// Export the base router with the health endpoint
export const appRouter = router({
  health: procedure
    .input(HealthCheckSchema)
    .query(() => ({
      status: 'ok' as const,
      version: '0.1.0',
    })),
});