"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runMigrations = runMigrations;
const index_1 = require("./index");
const migrator_1 = require("drizzle-orm/libsql/migrator");
// Main migration function
async function runMigrations(dbUrl) {
    console.log('Running database migrations...');
    const db = dbUrl ? (0, index_1.createDb)(dbUrl) : (0, index_1.createDb)();
    try {
        await (0, migrator_1.migrate)(db, { migrationsFolder: './drizzle' });
        console.log('Migrations completed successfully');
        return true;
    }
    catch (error) {
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
//# sourceMappingURL=migrate.js.map