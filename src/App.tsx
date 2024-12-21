import React from 'react'
import { ChatHeader } from './components/ChatHeader'
import { ChatMessages } from './components/ChatMessages'
import { ChatInput } from './components/ChatInput'
import { useChatStore } from './store/chatStore'

function App() {
  const { messages, currentUser, addMessage } = useChatStore()

  // Temporary user for demo
  React.useEffect(() => {
    useChatStore.getState().setCurrentUser({
      id: '1',
      email: 'john@example.com',
      username: 'John Doe',
      avatar_url: 'https://api.dicebear.com/7.x/avatars/svg?seed=john',
      created_at: new Date().toISOString()
    })
  }, [])

  const handleSendMessage = (content: string) => {
    if (!currentUser) return

    const newMessage: Message = {
      id: crypto.randomUUID(),
      content,
      user_id: currentUser.id,
      created_at: new Date().toISOString(),
      user: currentUser
    }

    addMessage(newMessage)
  }

  if (!currentUser) return null

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <ChatHeader
        recipientName="Alice Smith"
        recipientStatus="Online"
        avatarUrl="https://api.dicebear.com/7.x/avatars/svg?seed=alice"
      />
      <ChatMessages
        messages={messages}
        currentUserId={currentUser.id}
      />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  )
}

export default App