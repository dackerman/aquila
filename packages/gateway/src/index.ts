import express from 'express';
import cors from 'cors';

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
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