import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
// Users table
export const users = sqliteTable('users', {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    createdAt: integer('created_at').notNull(),
});
// Messages table
export const messages = sqliteTable('messages', {
    id: text('id').primaryKey(),
    channelId: text('channel_id').notNull(),
    authorId: text('author_id').notNull(),
    role: text('role', { enum: ['user', 'assistant', 'tool'] }).notNull(),
    content: text('content').notNull(),
    ts: integer('ts').notNull(),
});
//# sourceMappingURL=schema.js.map