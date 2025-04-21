import React from 'react';

type MessageRole = 'user' | 'assistant' | 'tool';

interface ChatMessageProps {
  id: string;
  author: string;
  role: MessageRole;
  content: string;
  timestamp: number;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  author,
  role,
  content,
  timestamp,
}) => {
  const formattedTime = new Date(timestamp).toLocaleTimeString();
  
  return (
    <div className={`flex p-3 ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div 
        className={`max-w-[70%] rounded-lg p-3 ${
          role === 'user' 
            ? 'bg-blue-500 text-white' 
            : role === 'assistant'
              ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100' 
              : 'bg-green-100 dark:bg-green-900 text-gray-900 dark:text-gray-100'
        }`}
      >
        <div className="font-medium text-sm mb-1">{author}</div>
        <div className="whitespace-pre-wrap">{content}</div>
        <div className="text-xs mt-1 opacity-70">{formattedTime}</div>
      </div>
    </div>
  );
};
