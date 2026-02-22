import type { FeedUser } from './types'

export interface UserAvatarProps {
  user: FeedUser
  size?: 'sm' | 'md' | 'lg'
  showName?: boolean
  className?: string
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
}

export function UserAvatar({ user, size = 'md', showName = false, className = '' }: UserAvatarProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img
        src={user.avatar}
        alt={user.name}
        className={`${sizeClasses[size]} rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700 shrink-0`}
      />
      {showName && (
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.name}</p>
          {user.username && (
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">@{user.username}</p>
          )}
        </div>
      )}
    </div>
  )
}
