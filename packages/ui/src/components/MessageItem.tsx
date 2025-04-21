import { FC } from 'react'
import { Message } from '../mockData'

interface MessageItemProps {
  message: Message
}

const MessageItem: FC<MessageItemProps> = ({ message }) => {
  const formattedTime = new Date(message.timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
  
  const formattedDate = new Date(message.timestamp).toLocaleDateString([], {
    month: 'short',
    day: 'numeric'
  })

  return (
    <div className="mb-4 group hover:bg-gray-50 dark:hover:bg-gray-800 -mx-4 px-4 py-1 rounded">
      <div className="flex items-start">
        {/* Avatar */}
        <div className="w-10 h-10 rounded mr-3 bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-lg font-medium">
          {message.author.charAt(0)}
        </div>
        
        {/* Message Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline">
            <span className="font-bold mr-2">{message.author}</span>
            <span className="text-xs text-gray-500">{formattedDate} at {formattedTime}</span>
          </div>
          <div className="mt-1 text-gray-900 dark:text-gray-200 whitespace-pre-wrap">
            {message.content}
          </div>
        </div>
        
        {/* Message Actions - only visible on hover */}
        <div className="hidden group-hover:flex ml-2 text-gray-400">
          <button className="p-1 hover:text-gray-700 dark:hover:text-gray-300" aria-label="React to message">
            😀
          </button>
          <button className="p-1 hover:text-gray-700 dark:hover:text-gray-300" aria-label="Reply in thread">
            💬
          </button>
        </div>
      </div>
    </div>
  )
}

export default MessageItem