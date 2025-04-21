import React from 'react';
import { ChatMessage } from './ChatMessage';

interface Message {
  id: string;
  author: string;
  role: 'user' | 'assistant' | 'tool';
  content: string;
  timestamp: number;
}

interface MessageListProps {
  messages: Message[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="flex-grow overflow-y-auto p-3">
      {messages.length === 0 ? (
        <div className="h-full flex items-center justify-center text-gray-500">
          <p>No messages yet. Start a conversation!</p>
        </div>
      ) : (
        messages.map((message) => (
          <ChatMessage 
            key={message.id}
            id={message.id}
            author={message.author}
            role={message.role}
            content={message.content} 
            timestamp={message.timestamp} 
          />
        ))
      )}
    </div>
  );
};
