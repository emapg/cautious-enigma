import React from 'react'
import { cn } from '../../lib/utils'

interface AvatarProps {
  src: string
  alt: string
  size?: 'sm' | 'md' | 'lg'
  status?: 'online' | 'offline' | 'away'
  className?: string
}

export function Avatar({ src, alt, size = 'md', status, className }: AvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  }

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    away: 'bg-yellow-500'
  }

  return (
    <div className="relative inline-block">
      <img
        src={src}
        alt={alt}
        className={cn(
          'rounded-full object-cover',
          sizeClasses[size],
          className
        )}
      />
      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full border-2 border-white',
            statusColors[status],
            size === 'sm' ? 'w-2 h-2' : 'w-3 h-3'
          )}
        />
      )}
    </div>
  )
}