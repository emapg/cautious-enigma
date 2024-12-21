export interface User {
  id: string
  email: string
  username: string
  avatar_url: string
  created_at: string
  status?: 'online' | 'offline' | 'away'
  last_seen?: string
}

export interface Message {
  id: string
  content: string
  user_id: string
  created_at: string
  user: User
  reactions?: MessageReaction[]
  attachments?: Attachment[]
  status?: 'sent' | 'delivered' | 'read'
  thread_id?: string
  parent_id?: string
  reply_count?: number
}

export interface MessageReaction {
  id: string
  emoji: string
  user_id: string
  created_at: string
}

export interface Attachment {
  id: string
  url: string
  type: 'image' | 'file'
  name: string
  size: number
}

export interface TypingIndicator {
  user_id: string
  timestamp: number
}