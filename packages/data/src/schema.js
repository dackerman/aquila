"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messages = exports.users = void 0;
const sqlite_core_1 = require("drizzle-orm/sqlite-core");
// Users table
exports.users = (0, sqlite_core_1.sqliteTable)('users', {
    id: (0, sqlite_core_1.text)('id').primaryKey(),
    name: (0, sqlite_core_1.text)('name').notNull(),
    email: (0, sqlite_core_1.text)('email').notNull().unique(),
    createdAt: (0, sqlite_core_1.integer)('created_at').notNull(),
});
// Messages table
exports.messages = (0, sqlite_core_1.sqliteTable)('messages', {
    id: (0, sqlite_core_1.text)('id').primaryKey(),
    channelId: (0, sqlite_core_1.text)('channel_id').notNull(),
    authorId: (0, sqlite_core_1.text)('author_id').notNull(),
    role: (0, sqlite_core_1.text)('role', { enum: ['user', 'assistant', 'tool'] }).notNull(),
    content: (0, sqlite_core_1.text)('content').notNull(),
    ts: (0, sqlite_core_1.integer)('ts').notNull(),
});
//# sourceMappingURL=schema.js.map