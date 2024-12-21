import { useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useChatStore } from '../store/chatStore'
import type { Message, User } from '../types'

export function useRealtime() {
  const { addMessage, updateMessageStatus, setUserStatus } = useChatStore()

  useEffect(() => {
    const messageChannel = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          const newMessage = payload.new as Message
          addMessage(newMessage)
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'messages' },
        (payload) => {
          const updatedMessage = payload.new as Message
          updateMessageStatus(updatedMessage.id, updatedMessage.status!)
        }
      )
      .subscribe()

    const presenceChannel = supabase.channel('presence')
      .on('presence', { event: 'sync' }, () => {
        const presenceState = presenceChannel.presenceState<User>()
        Object.values(presenceState).forEach(users => {
          users.forEach(user => {
            setUserStatus(user.id, 'online')
          })
        })
      })
      .subscribe()

    return () => {
      supabase.removeChannel(messageChannel)
      supabase.removeChannel(presenceChannel)
    }
  }, [addMessage, updateMessageStatus, setUserStatus])
}