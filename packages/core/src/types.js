"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelSchema = exports.AgentConfigSchema = exports.ChatMessageSchema = exports.UserSchema = void 0;
const zod_1 = require("zod");
// User model
exports.UserSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    createdAt: zod_1.z.number(),
});
// Chat message model
exports.ChatMessageSchema = zod_1.z.object({
    id: zod_1.z.string(),
    channelId: zod_1.z.string(),
    authorId: zod_1.z.string(),
    role: zod_1.z.enum(['user', 'assistant', 'tool']),
    content: zod_1.z.string(),
    ts: zod_1.z.number(),
});
// Agent config model
exports.AgentConfigSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    model: zod_1.z.string(),
    systemPrompt: zod_1.z.string(),
    tools: zod_1.z.array(zod_1.z.string()),
    memoryPolicy: zod_1.z.string(),
});
// Channel model
exports.ChannelSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    type: zod_1.z.enum(['public', 'private', 'repo']),
});
//# sourceMappingURL=types.js.map