import express from 'express';
import cors from 'cors';
import { createDb } from '@aquila/data';
import { eventBus } from '@aquila/core';
import { appRouter } from '@aquila/api-contract';
import { createExpressMiddleware } from '@trpc/server/adapters/express';

// Initialize Express app
const app = express();
const port = process.env['PORT'] ? parseInt(process.env['PORT']) : 3000;

// Initialize database
const db = createDb();

// Middleware
app.use(cors());
app.use(express.json());

// Global error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  const errorId = Math.random().toString(36).substr(2, 9); // Generate error ID for tracing
  
  // Log error with ID
  console.error(`[Error ${errorId}]`, err);
  
  // Emit error event
  eventBus.emit('error', { error: err, errorId, path: req.path });
  
  // Don't expose internal errors to clients
  res.status(500).json({
    status: 'error',
    message: 'An unexpected error occurred',
    errorId // Return error ID for support reference
  });
});

// Health check route
app.get('/health', async (_req, res, next) => {
  try {
    // Test database connection
    const result = await db.client.execute('SELECT 1 AS ok');

    // Ensure we have rows and the ok property exists
    if (result.rows && result.rows[0] && result.rows[0]['ok'] === 1) {
      res.status(200).json({ status: 'ok', database: 'connected' });
    } else {
      res.status(500).json({ status: 'error', message: 'Database check failed' });
    }
  } catch (error) {
    next(error); // Pass to error handler
  }
});

// API routes using tRPC
app.use(
  '/api',
  createExpressMiddleware({
    router: appRouter,
    createContext: () => ({ user: undefined }) // We'll enhance this later
  })
);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ status: 'error', message: 'Resource not found' });
});

// Start server
const server = app.listen(port, () => {
  console.log(`Gateway server running on http://localhost:${port}`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gateway...');
  server.close(() => {
    console.log('Gateway server closed');
    process.exit(0);
  });
});
