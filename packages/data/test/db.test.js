"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const src_1 = require("../src");
const schema_1 = require("../src/schema");
const drizzle_orm_1 = require("drizzle-orm");
const nanoid_1 = require("nanoid");
(0, vitest_1.describe)('Database integration tests', () => {
    const testDbUrl = 'file::memory:'; // Use in-memory SQLite for tests
    const db = (0, src_1.createDb)(testDbUrl);
    (0, vitest_1.beforeAll)(async () => {
        // Create tables in memory
        await db.client.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        created_at INTEGER NOT NULL
      )
    `);
        await db.client.execute(`
      CREATE TABLE IF NOT EXISTS messages (
        id TEXT PRIMARY KEY,
        channel_id TEXT NOT NULL,
        author_id TEXT NOT NULL,
        role TEXT NOT NULL,
        content TEXT NOT NULL,
        ts INTEGER NOT NULL
      )
    `);
    });
    (0, vitest_1.afterAll)(async () => {
        // Clean up
        await db.client.execute(`DROP TABLE IF EXISTS users`);
        await db.client.execute(`DROP TABLE IF EXISTS messages`);
    });
    (0, vitest_1.test)('should insert and retrieve a user', async () => {
        // Arrange
        const userId = (0, nanoid_1.nanoid)();
        const testUser = {
            id: userId,
            name: 'Test User',
            email: `test-${userId}@example.com`,
            createdAt: Date.now()
        };
        // Act
        await db.insert(schema_1.users).values(testUser);
        // Assert
        const retrievedUser = await db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.id, userId));
        (0, vitest_1.expect)(retrievedUser.length).toBe(1);
        (0, vitest_1.expect)(retrievedUser[0]).toMatchObject({
            id: userId,
            name: 'Test User',
            email: `test-${userId}@example.com`
        });
    });
    (0, vitest_1.test)('should insert and retrieve a message', async () => {
        // Arrange
        const messageId = (0, nanoid_1.nanoid)();
        const testMessage = {
            id: messageId,
            channelId: 'channel-1',
            authorId: 'user-1',
            role: 'user',
            content: 'Hello, world!',
            ts: Date.now()
        };
        // Act
        await db.insert(schema_1.messages).values(testMessage);
        // Assert
        const retrievedMessage = await db.select().from(schema_1.messages).where((0, drizzle_orm_1.eq)(schema_1.messages.id, messageId));
        (0, vitest_1.expect)(retrievedMessage.length).toBe(1);
        (0, vitest_1.expect)(retrievedMessage[0]).toMatchObject({
            id: messageId,
            channelId: 'channel-1',
            authorId: 'user-1',
            role: 'user',
            content: 'Hello, world!'
        });
    });
});
//# sourceMappingURL=db.test.js.map