import { useRef, useEffect } from 'react'
import { MessageBubble } from './MessageBubble'
import type { Message } from '../types'

interface ChatMessagesProps {
  messages: Message[]
  currentUserId: string
}

export function ChatMessages({ messages, currentUserId }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
          isOwn={message.user_id === currentUserId}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}