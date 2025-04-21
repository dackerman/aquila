import { FC } from 'react'
import { Message } from '../mockData'
import MessageItem from './MessageItem'
import MessageInput from './MessageInput'
import { FaHashtag, FaUser, FaInfo } from 'react-icons/fa'

interface ChatAreaProps {
  channelName: string
  messages: Message[]
}

const ChatArea: FC<ChatAreaProps> = ({ channelName, messages }) => {
  // Determine if the channel is a direct message or regular channel
  const isDM = !channelName.includes('-') && !['general', 'random', 'backend'].includes(channelName)
  
  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Channel Header */}
      <header className="h-14 border-b border-gray-200 dark:border-gray-700 px-4 flex items-center justify-between">
        <div className="flex items-center">
          {isDM ? (
            <FaUser className="mr-2 text-gray-500" />
          ) : (
            <FaHashtag className="mr-2 text-gray-500" />
          )}
          <h2 className="font-bold">{channelName}</h2>
        </div>
        <div className="flex items-center text-gray-600 dark:text-gray-300">
          <button className="mr-3 hover:text-gray-900 dark:hover:text-white" aria-label="Channel Information">
            <FaInfo />
          </button>
        </div>
      </header>
      
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-500">
            <div className="text-4xl mb-4">
              {isDM ? <FaUser /> : <FaHashtag />}
            </div>
            <p className="text-xl font-medium mb-2">
              Welcome to {isDM ? channelName : `#${channelName}`}!
            </p>
            <p className="text-sm text-center max-w-md">
              {isDM 
                ? `This is the beginning of your direct message history with ${channelName}.`
                : `This is the beginning of the #${channelName} channel. Send a message to start the conversation!`
              }
            </p>
          </div>
        ) : (
          messages.map(message => (
            <MessageItem 
              key={message.id} 
              message={message} 
            />
          ))
        )}
      </div>
      
      {/* Message Input */}
      <MessageInput channelName={channelName} />
    </div>
  )
}

export default ChatArea