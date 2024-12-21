import { Search } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

interface MessageSearchProps {
  onSearch: (query: string) => void
}

export function MessageSearch({ onSearch }: MessageSearchProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      initial={false}
      animate={{ width: isExpanded ? 200 : 40 }}
      className="relative"
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
      >
        <Search className="w-5 h-5 text-gray-600" />
      </motion.button>
      {isExpanded && (
        <motion.input
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          type="text"
          placeholder="Search messages..."
          onChange={(e) => onSearch(e.target.value)}
          className="absolute left-0 top-0 w-full h-full px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-blue-500"
        />
      )}
    </motion.div>
  )
}