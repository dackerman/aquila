import { createDb } from './index';
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
if (require.main === module) {
  runMigrations().catch(err => {
    console.error('Migration script failed:', err);
    process.exit(1);
  });
}