"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const data_1 = require("@aquila/data");
// Initialize Express app
const app = (0, express_1.default)();
const port = process.env['PORT'] ? parseInt(process.env['PORT']) : 3000;
// Initialize database
const db = (0, data_1.createDb)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Health check route
app.get('/health', async (_req, res) => {
    try {
        // Test database connection
        const result = await db.client.execute('SELECT 1 AS ok');
        // Ensure we have rows and the ok property exists
        if (result.rows && result.rows[0] && result.rows[0]['ok'] === 1) {
            res.status(200).json({ status: 'ok', database: 'connected' });
        }
        else {
            res.status(500).json({ status: 'error', message: 'Database check failed' });
        }
    }
    catch (error) {
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
//# sourceMappingURL=index.js.map