import { motion } from 'framer-motion'
import type { MessageReaction } from '../types'

interface MessageReactionsProps {
  reactions: MessageReaction[]
  onAddReaction: (emoji: string) => void
}

const commonEmojis = ['👍', '❤️', '😊', '🎉', '👏', '🔥']

export function MessageReactions({ reactions, onAddReaction }: MessageReactionsProps) {
  const reactionCounts = reactions.reduce((acc, reaction) => {
    acc[reaction.emoji] = (acc[reaction.emoji] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="flex flex-wrap gap-1 mt-1">
      {Object.entries(reactionCounts).map(([emoji, count]) => (
        <motion.button
          key={emoji}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onAddReaction(emoji)}
          className="px-2 py-1 text-xs bg-gray-100 rounded-full hover:bg-gray-200"
        >
          {emoji} {count}
        </motion.button>
      ))}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative group"
      >
        <button className="px-2 py-1 text-xs bg-gray-100 rounded-full hover:bg-gray-200">
          +
        </button>
        <div className="absolute bottom-full left-0 mb-2 hidden group-hover:flex bg-white shadow-lg rounded-lg p-2 gap-1">
          {commonEmojis.map(emoji => (
            <button
              key={emoji}
              onClick={() => onAddReaction(emoji)}
              className="hover:bg-gray-100 p-1 rounded"
            >
              {emoji}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}