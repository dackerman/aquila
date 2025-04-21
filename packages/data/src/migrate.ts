import { createDb } from './index.js';
import { migrate } from 'drizzle-orm/libsql/migrator';

// Main migration function
export async function runMigrations(dbUrl?: string) {
  console.log('Running database migrations...');
  const db = dbUrl ? createDb(dbUrl) : createDb();
  
  try {
    await migrate(db, { migrationsFolder: './drizzle' });
    console.log('Migrations completed successfully');
    return true;
  } catch (error) {
    console.error('Migration failed:', error);
    return false;
  }
}

// Run migrations when this file is executed directly
// Using fileURLToPath to check if this is the main module
import { fileURLToPath } from 'url';

const isMainModule = process.argv[1] === fileURLToPath(import.meta.url);
if (isMainModule) {
  runMigrations().catch(err => {
    console.error('Migration script failed:', err);
    process.exit(1);
  });
}