import { drizzle, BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';

// Flag to enable WAL mode for better concurrency
const ENABLE_WAL = true;

export function createDb(dbPath: string = 'data.db'): BetterSQLite3Database<typeof schema> {
  const sqlite = new Database(dbPath);
  
  // Enable WAL mode for better concurrency
  if (ENABLE_WAL) {
    sqlite.pragma('journal_mode = WAL');
    sqlite.pragma('synchronous = NORMAL');
    sqlite.pragma('foreign_keys = ON');
  }
  
  return drizzle(sqlite, { schema });
}

// Export singleton instance with default path
export const db = createDb();

// Export schema for migrations
export { schema };

// Export types
export type UsersTable = typeof schema.users.$inferSelect;
export type MessagesTable = typeof schema.messages.$inferSelect;