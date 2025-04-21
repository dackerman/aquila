import * as schema from './schema';
export declare function createDb(dbUrl?: string, authToken?: string): import("drizzle-orm/libsql").LibSQLDatabase<typeof schema> & {
    client: import("@libsql/client", { with: { "resolution-mode": "import" } }).Client;
};
export declare const testDb: import("drizzle-orm/libsql").LibSQLDatabase<typeof schema> & {
    client: import("@libsql/client", { with: { "resolution-mode": "import" } }).Client;
};
export { schema };
export type UsersTable = typeof schema.users.$inferSelect;
export type MessagesTable = typeof schema.messages.$inferSelect;
