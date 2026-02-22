export interface AvatarProps {
  src: string
  alt?: string
  size?: 'sm' | 'md' | 'lg'
  status?: 'online' | 'away' | 'offline'
  className?: string
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
}

const statusClasses = {
  online: 'bg-green-500',
  away: 'bg-amber-500',
  offline: 'bg-gray-400',
}

export function Avatar({ src, alt = '', size = 'md', status, className = '' }: AvatarProps) {
  return (
    <div className={`relative inline-block ${className}`}>
      <img
        src={src}
        alt={alt}
        className={`${sizeClasses[size]} rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700`}
      />
      {status && (
        <span
          className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white dark:ring-gray-900 ${statusClasses[status]}`}
          aria-hidden
        />
      )}
    </div>
  )
}
