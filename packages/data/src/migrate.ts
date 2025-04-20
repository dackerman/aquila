import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { createDb } from './index';

// Main migration function
async function runMigrations() {
  console.log('Running database migrations...');
  const db = createDb();
  
  try {
    migrate(db, { migrationsFolder: './drizzle' });
    console.log('Migrations completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

// Run migrations when this file is executed directly
if (require.main === module) {
  runMigrations();
}

export { runMigrations };