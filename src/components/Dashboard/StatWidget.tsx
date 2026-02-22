import type { StatWidgetData } from '../types/dashboard'

export interface StatWidgetProps extends StatWidgetData {
  /** Optional icon or visual element */
  icon?: React.ReactNode
  /** Show live/real-time indicator */
  live?: boolean
}

export function StatWidget({
  label,
  value,
  change,
  changeType = 'neutral',
  icon,
  live = false,
}: StatWidgetProps) {
  /* WCAG AA contrast: green-400/600, red-400/600, gray-400 on dark - all meet 4.5:1+ */
  const changeColors = {
    positive: 'text-green-600 dark:text-green-400',
    negative: 'text-red-600 dark:text-red-400',
    neutral: 'text-gray-600 dark:text-gray-300',
  }

  return (
    <div
      className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm transition-colors duration-300 relative"
      role="article"
      aria-label={`${label}: ${value}${live ? ', live' : ''}`}
    >
      {live && (
        <span className="absolute top-3 right-3 flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          Live
        </span>
      )}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-300">
            {label}
          </p>
          <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white tabular-nums">
            {value}
          </p>
          {change !== undefined && (
            <p
              className={`mt-1 text-sm font-medium ${changeColors[changeType]}`}
            >
              {change}
            </p>
          )}
        </div>
        {icon && (
          <div className="rounded-lg bg-gray-100 dark:bg-gray-700 p-2 text-gray-600 dark:text-gray-300">
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}
