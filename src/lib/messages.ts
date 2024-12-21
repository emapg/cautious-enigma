import { supabase } from './supabase'
import type { Message } from '../types'

export async function fetchMessages() {
  const { data, error } = await supabase
    .from('messages')
    .select(`
      *,
      user:user_id (
        id,
        email,
        username,
        avatar_url
      )
    `)
    .order('created_at', { ascending: true })

  if (error) throw error
  return data as Message[]
}

export async function sendMessage(content: string, userId: string) {
  const { data, error } = await supabase
    .from('messages')
    .insert([
      {
        content,
        user_id: userId,
      },
    ])
    .select()

  if (error) throw error
  return data[0]
}