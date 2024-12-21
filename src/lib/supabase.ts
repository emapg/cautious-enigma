import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/database'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export const subscribeToMessages = (
  onMessage: (message: Database['public']['Tables']['messages']['Row']) => void
) => {
  const channel = supabase
    .channel('messages')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'messages' },
      (payload) => onMessage(payload.new as Database['public']['Tables']['messages']['Row'])
    )
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}