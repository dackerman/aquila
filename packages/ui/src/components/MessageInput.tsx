import { FC, useState } from 'react'
import { FaPaperclip, FaBold, FaItalic, FaCode, FaMicrophone } from 'react-icons/fa'

interface MessageInputProps {
  channelName: string
}

const MessageInput: FC<MessageInputProps> = ({ channelName }) => {
  const [message, setMessage] = useState('')
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send the message to the server
    // eslint-disable-next-line no-console
    console.log(`Sending message to ${channelName}: ${message}`)
    setMessage('')
  }

  const placeholderText = channelName.includes('-') || ['general', 'random', 'backend'].includes(channelName)
    ? `Message #${channelName}`
    : `Message ${channelName}`

  return (
    <div className="px-4 pb-4">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">
        {/* Formatting Tools */}
        <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-600 flex">
          <button type="button" className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 mr-1">
            <FaBold size={14} />
          </button>
          <button type="button" className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 mr-1">
            <FaItalic size={14} />
          </button>
          <button type="button" className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <FaCode size={14} />
          </button>
        </div>
        
        {/* Input Area */}
        <div className="p-3 flex items-end">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 bg-transparent outline-none resize-none max-h-32"
            placeholder={placeholderText}
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                if (message.trim()) handleSubmit(e)
              }
            }}
          />
          
          <div className="flex ml-2 text-gray-500">
            <button type="button" className="p-1 hover:text-gray-700 dark:hover:text-gray-300 mr-2">
              <FaPaperclip size={16} />
            </button>
            <button type="button" className="p-1 hover:text-gray-700 dark:hover:text-gray-300">
              <FaMicrophone size={16} />
            </button>
          </div>
        </div>
      </form>
      <p className="text-xs text-gray-500 mt-2 text-center">
        Press Shift + Enter for a new line. Press Enter to send.
      </p>
    </div>
  )
}

export default MessageInput