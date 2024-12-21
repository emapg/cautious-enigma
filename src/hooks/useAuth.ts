import { useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useChatStore } from '../store/chatStore'

export function useAuth() {
  const { setCurrentUser } = useChatStore()

  useEffect(() => {
    // Check initial auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setCurrentUser({
          id: session.user.id,
          email: session.user.email!,
          username: session.user.email!.split('@')[0],
          avatar_url: `https://api.dicebear.com/7.x/avatars/svg?seed=${session.user.id}`,
          created_at: session.user.created_at
        })
      }
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setCurrentUser({
          id: session.user.id,
          email: session.user.email!,
          username: session.user.email!.split('@')[0],
          avatar_url: `https://api.dicebear.com/7.x/avatars/svg?seed=${session.user.id}`,
          created_at: session.user.created_at
        })
      } else {
        setCurrentUser(null)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [setCurrentUser])
}