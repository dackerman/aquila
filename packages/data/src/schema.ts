import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { User, ChatMessage } from '@aquila/core';

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

// Export validation helpers
export const validators = {
  validateUser: (userData: unknown): userData is User => {
    return !!userData && 
      typeof userData === 'object' &&
      'id' in userData &&
      'name' in userData &&
      'email' in userData;
  },
  validateMessage: (messageData: unknown): messageData is ChatMessage => {
    return !!messageData && 
      typeof messageData === 'object' &&
      'id' in messageData &&
      'channelId' in messageData &&
      'authorId' in messageData &&
      'role' in messageData &&
      'content' in messageData;
  }
};