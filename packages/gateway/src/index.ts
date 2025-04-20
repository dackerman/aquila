import express from 'express';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter, Context } from '@aquila/api-contract';
import { createWsServer } from './websocket';
import { eventBus } from '@aquila/core';

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check route (non-tRPC for basic monitoring)
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', version: '0.1.0' });
});

// Create context for tRPC
const createContext = ({ req }: { req: express.Request }): Context => {
  // TODO: Implement proper auth middleware
  return {
    user: undefined,
  };
};

// Mount tRPC middleware
app.use(
  '/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

// Start server
const server = app.listen(PORT, () => {
  console.log(`Gateway server running on http://localhost:${PORT}`);
});

// Set up WebSocket server for tRPC
createWsServer({ server, router: appRouter });

// Publish server startup event
eventBus.emit('aquila.gateway.started', { port: PORT });

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gateway...');
  server.close(() => {
    console.log('Gateway server closed');
    process.exit(0);
  });
});