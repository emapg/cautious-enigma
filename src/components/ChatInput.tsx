import { useState } from 'react'
import { Send, Paperclip, Smile } from 'lucide-react'
import { motion } from 'framer-motion'

interface ChatInputProps {
  onSendMessage: (content: string) => void
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message)
      setMessage('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="border-t bg-white p-4">
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <Paperclip className="w-5 h-5 text-gray-500" />
        </button>
        <div className="flex-1 relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="w-full px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-blue-500 transition-colors"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Smile className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <motion.button
          type="submit"
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          disabled={!message.trim()}
        >
          <Send className="w-5 h-5" />
        </motion.button>
      </div>
    </form>
  )
}