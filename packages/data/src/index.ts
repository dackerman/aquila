import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema.js';

// Create a libsql client
export function createDb(
  dbUrl: string = 'file:data.db',
  authToken?: string
) {
  const client = createClient({ url: dbUrl, authToken });
  
  // Enable WAL mode (Write Ahead Logging) for better concurrency
  client.execute('PRAGMA journal_mode = WAL');
  client.execute('PRAGMA synchronous = NORMAL');
  client.execute('PRAGMA foreign_keys = ON');
  
  const db = drizzle(client, { schema });
  
  // Expose client for direct SQL execution
  return Object.assign(db, { client });
}

// Export a memory DB instance for tests
export const testDb = createDb('file::memory:');

// Export schema for migrations
export { schema };

// Export types
export type UsersTable = typeof schema.users.$inferSelect;
export type MessagesTable = typeof schema.messages.$inferSelect;