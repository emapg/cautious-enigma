import { motion, AnimatePresence } from 'framer-motion'
import { MessageBubble } from './MessageBubble'
import { Message } from '../types'
import { MessageStatus } from './MessageStatus'

interface MessageThreadProps {
  messages: Message[]
  parentMessage: Message
  onClose: () => void
  currentUserId: string
  onAddReaction: (messageId: string, emoji: string) => void
}

export function MessageThread({
  messages,
  parentMessage,
  onClose,
  currentUserId,
  onAddReaction
}: MessageThreadProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 300 }}
        className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg border-l"
      >
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Thread</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
          <div className="mt-4">
            <MessageBubble
              message={parentMessage}
              isOwn={parentMessage.user_id === currentUserId}
              onAddReaction={onAddReaction}
            />
          </div>
        </div>
        <div className="p-4 space-y-4 h-[calc(100vh-200px)] overflow-y-auto">
          {messages.map(message => (
            <div key={message.id} className="flex flex-col">
              <MessageBubble
                message={message}
                isOwn={message.user_id === currentUserId}
                onAddReaction={onAddReaction}
              />
              <MessageStatus status={message.status} />
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}