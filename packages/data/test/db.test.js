import { describe, test, expect, beforeAll, afterAll } from 'vitest';
import { createDb } from '../src/index.js';
import { users, messages } from '../src/schema.js';
import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';
describe('Database integration tests', () => {
    const testDbUrl = 'file::memory:'; // Use in-memory SQLite for tests
    const db = createDb(testDbUrl);
    beforeAll(async () => {
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
    afterAll(async () => {
        // Clean up
        await db.client.execute(`DROP TABLE IF EXISTS users`);
        await db.client.execute(`DROP TABLE IF EXISTS messages`);
    });
    test('should insert and retrieve a user', async () => {
        // Arrange
        const userId = nanoid();
        const testUser = {
            id: userId,
            name: 'Test User',
            email: `test-${userId}@example.com`,
            createdAt: Date.now()
        };
        // Act
        await db.insert(users).values(testUser);
        // Assert
        const retrievedUser = await db.select().from(users).where(eq(users.id, userId));
        expect(retrievedUser.length).toBe(1);
        expect(retrievedUser[0]).toMatchObject({
            id: userId,
            name: 'Test User',
            email: `test-${userId}@example.com`
        });
    });
    test('should insert and retrieve a message', async () => {
        // Arrange
        const messageId = nanoid();
        const testMessage = {
            id: messageId,
            channelId: 'channel-1',
            authorId: 'user-1',
            role: 'user',
            content: 'Hello, world!',
            ts: Date.now()
        };
        // Act
        await db.insert(messages).values(testMessage);
        // Assert
        const retrievedMessage = await db.select().from(messages).where(eq(messages.id, messageId));
        expect(retrievedMessage.length).toBe(1);
        expect(retrievedMessage[0]).toMatchObject({
            id: messageId,
            channelId: 'channel-1',
            authorId: 'user-1',
            role: 'user',
            content: 'Hello, world!'
        });
    });
});
//# sourceMappingURL=db.test.js.map