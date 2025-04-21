import { useState } from 'react'
import Sidebar from './components/Sidebar'
import ChatArea from './components/ChatArea'
import { mockChannels, mockDms, mockMessages } from './mockData'

function App() {
  const [activeChannel, setActiveChannel] = useState('general')
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar 
        channels={mockChannels} 
        directMessages={mockDms}
        activeChannel={activeChannel}
        onSelectChannel={setActiveChannel}
      />
      <ChatArea 
        channelName={activeChannel} 
        messages={mockMessages[activeChannel] || []}
      />
    </div>
  )
}

export default App