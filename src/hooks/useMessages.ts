import { useEffect } from 'react'
import { useChatStore } from '../store/chatStore'
import { fetchMessages } from '../lib/messages'
import { subscribeToMessages } from '../lib/supabase'

export function useMessages() {
  const { messages, setMessages, addMessage } = useChatStore()

  useEffect(() => {
    // Fetch initial messages
    fetchMessages().then(setMessages)

    // Subscribe to new messages
    const unsubscribe = subscribeToMessages((newMessage) => {
      fetchMessages().then(setMessages)
    })

    return () => {
      unsubscribe()
    }
  }, [setMessages])

  return messages
}