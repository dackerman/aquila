import { FC } from 'react'
import { Channel, DirectMessage } from '../mockData'
import { FaHashtag, FaCircle } from 'react-icons/fa'

interface SidebarProps {
  channels: Channel[]
  directMessages: DirectMessage[]
  activeChannel: string
  onSelectChannel: (channelId: string) => void
}

const Sidebar: FC<SidebarProps> = ({ 
  channels, 
  directMessages, 
  activeChannel, 
  onSelectChannel 
}) => {
  return (
    <div className="w-60 bg-slate-800 text-white flex flex-col h-full">
      {/* Workspace Header */}
      <div className="p-3 border-b border-gray-700 bg-slate-900">
        <h1 className="text-xl font-bold">Aquila</h1>
        <p className="text-sm text-gray-400">Multi-agent orchestration</p>
      </div>
      
      {/* Channels */}
      <div className="p-3">
        <h2 className="text-xs uppercase tracking-wider text-gray-400 mb-1">Channels</h2>
        <ul>
          {channels.map(channel => (
            <li 
              key={channel.id}
              className={`py-1 px-2 rounded cursor-pointer flex items-center ${
                activeChannel === channel.id ? 'bg-slack-blue' : 'hover:bg-gray-700'
              }`}
              onClick={() => onSelectChannel(channel.id)}
            >
              <FaHashtag className="mr-2 text-gray-400" size={12} />
              <span>{channel.name}</span>
              {channel.unread > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2">
                  {channel.unread}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
      
      {/* Direct Messages */}
      <div className="p-3">
        <h2 className="text-xs uppercase tracking-wider text-gray-400 mb-1">Direct Messages</h2>
        <ul>
          {directMessages.map(dm => (
            <li 
              key={dm.id}
              className={`py-1 px-2 rounded cursor-pointer flex items-center ${
                activeChannel === dm.id ? 'bg-slack-blue' : 'hover:bg-gray-700'
              }`}
              onClick={() => onSelectChannel(dm.id)}
            >
              <FaCircle 
                className={`mr-2 ${dm.online ? 'text-green-500' : 'text-gray-500'}`} 
                size={8} 
              />
              <span>{dm.name}</span>
              {dm.unread > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2">
                  {dm.unread}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mt-auto p-3 border-t border-gray-700 bg-slate-900">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold mr-2">
            D
          </div>
          <div className="text-sm">
            <p className="font-medium">David</p>
            <p className="text-xs text-green-500">Active</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar