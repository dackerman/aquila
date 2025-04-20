import express from 'express';
import cors from 'cors';
import { createDb } from '@aquila/data';

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Initialize database
const db = createDb();

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get('/health', async (_req, res) => {
  try {
    // Test database connection
    const result = await db.client.execute('SELECT 1 AS ok');

    if (result.rows[0].ok === 1) {
      res.status(200).json({ status: 'ok', database: 'connected' });
    } else {
      res.status(500).json({ status: 'error', message: 'Database check failed' });
    }
  } catch (error) {
    console.error('Database health check failed:', error);
    res.status(500).json({
      status: 'error',
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : String(error),
    });
  }
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
