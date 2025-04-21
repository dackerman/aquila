/**
 * Gateway package
 * Entry point for the API gateway that exposes the tRPC router.
 */
import express, { Express } from 'express';

// In a real implementation, we would import these from their respective packages
// import { initDb, migrateDb } from '@aquila/data';
// import { api } from '@aquila/api-contract';

// Temporary mocks for imports that don't exist yet
const initDb = () => { /* mock implementation */ };
const migrateDb = () => Promise.resolve();
const api = { router: express.Router() };

// Initialize and migrate the database
initDb();
migrateDb().catch((err: Error) => {
  throw err;
});

/**
 * Create the Express app with tRPC router
 */
export function createApp(): Express {
  const app = express();
  
  // Add basic health check endpoint
  app.get('/health', (_req, res, _next) => {
    // eslint-disable-next-line no-console
    console.log('Health check requested');
    res.json({ status: 'ok' });
  });
  
  // Set up the tRPC router under /trpc path
  app.use('/trpc', api.router);
  
  return app;
}

/**
 * Start the server
 */
export function startServer(port = 4000) {
  const app = createApp();
  
  return new Promise<void>((resolve) => {
    const server = app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server started at http://localhost:${port}`);
      resolve();
    });
    
    // Handle shutdown
    const shutdown = () => {
      // eslint-disable-next-line no-console
      console.log('Shutting down server...');
      server.close(() => {
        // eslint-disable-next-line no-console
        console.log('Server stopped');
        process.exit(0);
      });
    };
    
    // Listen for termination signals
    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  });
}

// Auto-start server if this module is run directly
if (require.main === module) {
  startServer();
}