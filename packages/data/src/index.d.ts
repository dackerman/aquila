import * as schema from './schema.js';
export declare function createDb(dbUrl?: string, authToken?: string): import("drizzle-orm/libsql").LibSQLDatabase<typeof schema> & {
    client: import("@libsql/client").Client;
};
export declare const testDb: import("drizzle-orm/libsql").LibSQLDatabase<typeof schema> & {
    client: import("@libsql/client").Client;
};
export { schema };
export type UsersTable = typeof schema.users.$inferSelect;
export type MessagesTable = typeof schema.messages.$inferSelect;
