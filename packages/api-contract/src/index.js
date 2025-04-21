"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = exports.HealthCheckResponseSchema = exports.HealthCheckSchema = exports.procedure = exports.router = void 0;
const server_1 = require("@trpc/server");
const zod_1 = require("zod");
// Initialize tRPC with context type
const t = server_1.initTRPC.context().create();
// Export base router and procedure builders
exports.router = t.router;
exports.procedure = t.procedure;
// Define input types
exports.HealthCheckSchema = zod_1.z.object({});
// Define output types
exports.HealthCheckResponseSchema = zod_1.z.object({
    status: zod_1.z.enum(['ok', 'error']),
    version: zod_1.z.string().optional(),
});
// Export the base router with the health endpoint
exports.appRouter = (0, exports.router)({
    health: exports.procedure
        .input(exports.HealthCheckSchema)
        .query(() => ({
        status: 'ok',
        version: '0.1.0',
    })),
});
//# sourceMappingURL=index.js.map