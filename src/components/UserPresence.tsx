import { motion } from 'framer-motion'
import { User } from '../types'

interface UserPresenceProps {
  user: User
  status: 'online' | 'offline' | 'away'
  lastSeen?: string
}

export function UserPresence({ user, status, lastSeen }: UserPresenceProps) {
  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    away: 'bg-yellow-500'
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center gap-2"
    >
      <div className="relative">
        <img
          src={user.avatar_url}
          alt={user.username}
          className="w-10 h-10 rounded-full"
        />
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`absolute bottom-0 right-0 w-3 h-3 ${statusColors[status]} rounded-full border-2 border-white`}
        />
      </div>
      <div>
        <p className="font-medium">{user.username}</p>
        <p className="text-xs text-gray-500">
          {status === 'online' ? 'Active now' : `Last seen ${lastSeen}`}
        </p>
      </div>
    </motion.div>
  )
}