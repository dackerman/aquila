// Stub for data layer - will be replaced with SQLite + Drizzle implementation
// once build dependencies are resolved

export const schema = {
  users: {
    name: 'users'
  },
  messages: {
    name: 'messages'
  }
};

// Placeholder for DB connection
export const db = {
  query: async () => {
    return [];
  }
};

// Type definitions
export interface UsersTable {
  id: string;
  name: string;
  email: string;
  createdAt: number;
}

export interface MessagesTable {
  id: string;
  channelId: string;
  authorId: string;
  role: 'user' | 'assistant' | 'tool';
  content: string;
  ts: number;
}