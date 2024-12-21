import { motion } from 'framer-motion'
import { MessageThread } from './MessageThread'
import { MessageStatus } from './MessageStatus'
import { MessageReactions } from './MessageReactions'
import { formatMessageTime } from '../lib/utils'
import { Reply } from 'lucide-react'
import { useState } from 'react'
import type { Message } from '../types'

interface MessageBubbleProps {
  message: Message
  isOwn: boolean
  onAddReaction: (messageId: string, emoji: string) => void
}

export function MessageBubble({ message, isOwn, onAddReaction }: MessageBubbleProps) {
  const [showThread, setShowThread] = useState(false)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}
      >
        <div className={`flex ${isOwn ? 'flex-row-reverse' : 'flex-row'} items-end gap-2 max-w-[80%]`}>
          <motion.img
            whileHover={{ scale: 1.1 }}
            src={message.user.avatar_url || `https://api.dicebear.com/7.x/avatars/svg?seed=${message.user.username}`}
            alt={message.user.username}
            className="w-8 h-8 rounded-full cursor-pointer"
          />
          <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className={`px-4 py-2 rounded-2xl ${
                isOwn ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-900'
              }`}
            >
              {message.parent_id && (
                <div className="text-xs opacity-70 mb-1">
                  Replying to {message.parent_id}
                </div>
              )}
              <p className="text-sm">{message.content}</p>
              {message.attachments?.map(attachment => (
                <motion.div
                  key={attachment.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2"
                >
                  {attachment.type === 'image' ? (
                    <img
                      src={attachment.url}
                      alt={attachment.name}
                      className="max-w-xs rounded-lg"
                    />
                  ) : (
                    <div className="flex items-center gap-2 bg-white/10 rounded p-2">
                      <span className="text-sm">{attachment.name}</span>
                      <span className="text-xs">({Math.round(attachment.size / 1024)}KB)</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-500">
                {formatMessageTime(new Date(message.created_at))}
              </span>
              {message.reply_count > 0 && (
                <button
                  onClick={() => setShowThread(true)}
                  className="flex items-center gap-1 text-xs text-blue-500 hover:text-blue-600"
                >
                  <Reply className="w-3 h-3" />
                  {message.reply_count} replies
                </button>
              )}
            </div>
            {message.reactions && (
              <MessageReactions
                reactions={message.reactions}
                onAddReaction={(emoji) => onAddReaction(message.id, emoji)}
              />
            )}
            {message.status && <MessageStatus status={message.status} />}
          </div>
        </div>
      </motion.div>
      {showThread && (
        <MessageThread
          messages={[]} // This would be populated from the thread messages
          parentMessage={message}
          onClose={() => setShowThread(false)}
          currentUserId={message.user_id}
          onAddReaction={onAddReaction}
        />
      )}
    </>
  )
}