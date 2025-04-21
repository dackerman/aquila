export interface Channel {
  id: string;
  name: string;
  unread: number;
}

export interface DirectMessage {
  id: string;
  name: string;
  online: boolean;
  unread: number;
}

export interface Message {
  id: string;
  author: string;
  content: string;
  timestamp: number;
  role: 'user' | 'assistant' | 'tool';
}

export const mockChannels: Channel[] = [
  { id: 'general', name: 'general', unread: 0 },
  { id: 'random', name: 'random', unread: 2 },
  { id: 'project-aquila', name: 'project-aquila', unread: 0 },
  { id: 'backend', name: 'backend', unread: 5 },
];

export const mockDms: DirectMessage[] = [
  { id: 'architect', name: 'Architect', online: true, unread: 0 },
  { id: 'coder', name: 'Coder', online: false, unread: 1 },
  { id: 'reviewer', name: 'Reviewer', online: true, unread: 0 },
  { id: 'david', name: 'David', online: true, unread: 0 },
];

export const mockMessages: Record<string, Message[]> = {
  'general': [
    {
      id: '1',
      author: 'David',
      content: 'Hello everyone! Welcome to the Aquila project.',
      timestamp: Date.now() - 1000 * 60 * 60 * 24,
      role: 'user'
    },
    {
      id: '2',
      author: 'Architect',
      content: 'Hi David! I\'m ready to help with any system design questions.',
      timestamp: Date.now() - 1000 * 60 * 60 * 23,
      role: 'assistant'
    },
    {
      id: '3',
      author: 'Coder',
      content: 'Hello! Looking forward to implementing the code once we have the design.',
      timestamp: Date.now() - 1000 * 60 * 60 * 22,
      role: 'assistant'
    },
    {
      id: '4',
      author: 'Reviewer',
      content: 'I\'ll make sure the code meets our quality standards before merging.',
      timestamp: Date.now() - 1000 * 60 * 60 * 21,
      role: 'assistant'
    },
    {
      id: '5',
      author: 'David',
      content: 'Great! Let\'s start by setting up our basic project structure.',
      timestamp: Date.now() - 1000 * 60 * 60 * 20,
      role: 'user'
    },
    {
      id: '6',
      author: 'Architect',
      content: 'I recommend we use a monorepo structure with pnpm workspaces. We can organize packages by functionality.',
      timestamp: Date.now() - 1000 * 60 * 60 * 19,
      role: 'assistant'
    },
  ],
  'random': [
    {
      id: '1',
      author: 'Coder',
      content: 'Did anyone watch the new AI documentary?',
      timestamp: Date.now() - 1000 * 60 * 60 * 12,
      role: 'assistant'
    },
    {
      id: '2',
      author: 'David',
      content: 'Not yet! Is it good?',
      timestamp: Date.now() - 1000 * 60 * 60 * 11,
      role: 'user'
    },
    {
      id: '3',
      author: 'Coder',
      content: 'Yes, highly recommend it. Very insightful about where the field is headed.',
      timestamp: Date.now() - 1000 * 60 * 60 * 10,
      role: 'assistant'
    },
  ],
  'project-aquila': [
    {
      id: '1',
      author: 'David',
      content: 'Let\'s discuss the roadmap for the Aquila project.',
      timestamp: Date.now() - 1000 * 60 * 60 * 48,
      role: 'user'
    },
    {
      id: '2',
      author: 'Architect',
      content: 'I\'ve reviewed the milestones document. I think we should start with the Chat UI since it\'s a key part of the project.',
      timestamp: Date.now() - 1000 * 60 * 60 * 47,
      role: 'assistant'
    },
    {
      id: '3',
      author: 'Coder',
      content: 'I can work on the WebSocket connection for real-time updates once the basic UI is in place.',
      timestamp: Date.now() - 1000 * 60 * 60 * 46,
      role: 'assistant'
    },
  ],
  'backend': [
    {
      id: '1',
      author: 'Architect',
      content: 'We need to decide on the database schema for storing messages and channels.',
      timestamp: Date.now() - 1000 * 60 * 60 * 36,
      role: 'assistant'
    },
    {
      id: '2',
      author: 'David',
      content: 'Let\'s use SQLite with Drizzle ORM as mentioned in the architecture doc.',
      timestamp: Date.now() - 1000 * 60 * 60 * 35,
      role: 'user'
    },
    {
      id: '3',
      author: 'Architect',
      content: 'Good choice. SQLite in WAL mode should handle our needs well for the MVP.',
      timestamp: Date.now() - 1000 * 60 * 60 * 34,
      role: 'assistant'
    },
  ],
  'architect': [
    {
      id: '1',
      author: 'David',
      content: 'Can you help me think through the agent orchestration design?',
      timestamp: Date.now() - 1000 * 60 * 60 * 5,
      role: 'user'
    },
    {
      id: '2',
      author: 'Architect',
      content: 'Of course. I\'d recommend using an event-driven approach where each agent subscribes to specific event types and can publish new events.',
      timestamp: Date.now() - 1000 * 60 * 60 * 4,
      role: 'assistant'
    },
    {
      id: '3',
      author: 'Architect',
      content: 'This would allow for loose coupling between agents and make it easier to add new agent types in the future.',
      timestamp: Date.now() - 1000 * 60 * 60 * 4,
      role: 'assistant'
    },
  ],
  'coder': [
    {
      id: '1',
      author: 'David',
      content: 'Once the design is finalized, we\'ll need to implement the core agent runtime.',
      timestamp: Date.now() - 1000 * 60 * 60 * 3,
      role: 'user'
    },
    {
      id: '2',
      author: 'Coder',
      content: 'I can start working on that. I\'ll need the API contracts for the model adapters and tool clients.',
      timestamp: Date.now() - 1000 * 60 * 60 * 2,
      role: 'assistant'
    },
  ],
};