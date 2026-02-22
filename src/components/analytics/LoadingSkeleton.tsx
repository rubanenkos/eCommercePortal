export interface LoadingSkeletonProps {
  /** Type of skeleton */
  variant?: 'card' | 'chart' | 'table' | 'text'
  /** Additional class names */
  className?: string
}

export function LoadingSkeleton({
  variant = 'card',
  className = '',
}: LoadingSkeletonProps) {
  const base = 'rounded bg-gray-200 dark:bg-gray-700 animate-pulse'

  if (variant === 'card') {
    return (
      <div className={`rounded-xl border border-gray-200 dark:border-gray-700 p-5 ${className}`}>
        <div className={`${base} h-4 w-24 mb-3`} />
        <div className={`${base} h-8 w-32 mb-2`} />
        <div className={`${base} h-4 w-20`} />
      </div>
    )
  }

  if (variant === 'chart') {
    return (
      <div className={`rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden ${className}`}>
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className={`${base} h-4 w-32`} />
        </div>
        <div className="p-6 flex items-end gap-2 h-64">
          {[40, 65, 45, 80, 55, 70, 60].map((h, i) => (
            <div
              key={i}
              className={`flex-1 ${base} min-w-[24px]`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'table') {
    return (
      <div className={`rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden ${className}`}>
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className={`${base} h-4 w-40`} />
        </div>
        <div className="p-5 space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex gap-4">
              <div className={`${base} h-4 flex-1`} />
              <div className={`${base} h-4 w-20`} />
              <div className={`${base} h-4 w-16`} />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <div className={`${base} h-4 w-full`} />
      <div className={`${base} h-4 w-4/5`} />
      <div className={`${base} h-4 w-3/5`} />
    </div>
  )
}
