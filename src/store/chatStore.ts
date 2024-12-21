import { create } from 'zustand'
import type { Message, User, TypingIndicator } from '../types'

interface ChatState {
  messages: Message[]
  currentUser: User | null
  users: Record<string, User>
  typingUsers: TypingIndicator[]
  searchQuery: string
  addMessage: (message: Message) => void
  setCurrentUser: (user: User | null) => void
  updateMessageStatus: (messageId: string, status: Message['status']) => void
  setUserStatus: (userId: string, status: User['status']) => void
  setTypingStatus: (userId: string) => void
  setSearchQuery: (query: string) => void
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  currentUser: null,
  users: {},
  typingUsers: [],
  searchQuery: '',

  addMessage: (message) => set((state) => ({
    messages: [...state.messages, message]
  })),

  setCurrentUser: (user) => set({ currentUser: user }),

  updateMessageStatus: (messageId, status) => set((state) => ({
    messages: state.messages.map(msg =>
      msg.id === messageId ? { ...msg, status } : msg
    )
  })),

  setUserStatus: (userId, status) => set((state) => ({
    users: {
      ...state.users,
      [userId]: { ...state.users[userId], status }
    }
  })),

  setTypingStatus: (userId) => set((state) => ({
    typingUsers: [
      ...state.typingUsers.filter(u => u.user_id !== userId),
      { user_id: userId, timestamp: Date.now() }
    ]
  })),

  setSearchQuery: (query) => set({ searchQuery: query })
}))