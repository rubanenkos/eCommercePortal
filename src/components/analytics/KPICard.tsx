export interface KPICardProps {
  /** KPI title */
  title: string
  /** Main value to display */
  value: string | number
  /** Optional change indicator (e.g. "+12%") */
  change?: string
  /** Change direction for styling */
  changeType?: 'positive' | 'negative' | 'neutral'
  /** Optional icon or visual element */
  icon?: React.ReactNode
}

export function KPICard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon,
}: KPICardProps) {
  const changeStyles = {
    positive: 'text-green-600 dark:text-green-400',
    negative: 'text-red-600 dark:text-red-400',
    neutral: 'text-gray-600 dark:text-gray-400',
  }

  return (
    <div
      className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm transition-colors duration-300"
      role="article"
      aria-label={`${title}: ${value}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </p>
          <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white tabular-nums">
            {value}
          </p>
          {change !== undefined && (
            <p className={`mt-1 text-sm font-medium ${changeStyles[changeType]}`}>
              {change}
            </p>
          )}
        </div>
        {icon && (
          <div className="rounded-lg bg-gray-100 dark:bg-gray-700 p-2.5 text-gray-600 dark:text-gray-300">
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}
