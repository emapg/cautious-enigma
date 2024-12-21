import { Phone, Video, MoreVertical } from 'lucide-react'
import { motion } from 'framer-motion'
import { MessageSearch } from './MessageSearch'

interface ChatHeaderProps {
  recipientName: string
  recipientStatus: string
  avatarUrl: string
  onSearch: (query: string) => void
}

export function ChatHeader({ recipientName, recipientStatus, avatarUrl, onSearch }: ChatHeaderProps) {
  return (
    <div className="border-b bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="relative"
          >
            <img
              src={avatarUrl}
              alt={recipientName}
              className="w-10 h-10 rounded-full"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
          </motion.div>
          <div>
            <h2 className="font-semibold">{recipientName}</h2>
            <p className="text-sm text-gray-500">{recipientStatus}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <MessageSearch onSearch={onSearch} />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Phone className="w-5 h-5 text-gray-600" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Video className="w-5 h-5 text-gray-600" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </motion.button>
        </div>
      </div>
    </div>
  )
}