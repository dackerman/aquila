import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { UserSchema, ChatMessageSchema } from '@aquila/core';

// Users table - based on the schema defined in core
export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  createdAt: integer('created_at').notNull(),
});

// Messages table - based on the schema defined in core
export const messages = sqliteTable('messages', {
  id: text('id').primaryKey(),
  channelId: text('channel_id').notNull(),
  authorId: text('author_id').notNull(),
  role: text('role', { enum: ['user', 'assistant', 'tool'] }).notNull(),
  content: text('content').notNull(),
  ts: integer('ts').notNull(),
});

// Export Zod schemas from core for validation
export const validators = {
  users: UserSchema,
  messages: ChatMessageSchema
};