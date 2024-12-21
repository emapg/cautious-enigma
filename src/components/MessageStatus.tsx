import { Check, CheckCheck } from 'lucide-react'
import { motion } from 'framer-motion'

interface MessageStatusProps {
  status: 'sent' | 'delivered' | 'read'
}

export function MessageStatus({ status }: MessageStatusProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex justify-end mt-1"
    >
      {status === 'sent' && (
        <Check className="w-4 h-4 text-gray-400" />
      )}
      {status === 'delivered' && (
        <CheckCheck className="w-4 h-4 text-gray-400" />
      )}
      {status === 'read' && (
        <CheckCheck className="w-4 h-4 text-blue-500" />
      )}
    </motion.div>
  )
}