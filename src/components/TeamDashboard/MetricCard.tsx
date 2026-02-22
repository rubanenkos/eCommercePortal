export interface MetricCardProps {
  title: string
  value: number
  subtitle: string
  icon: React.ReactNode
  variant: 'blue' | 'yellow' | 'green' | 'purple'
}

const iconBgClasses = {
  blue: 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400',
  yellow: 'bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400',
  green: 'bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400',
  purple: 'bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-400',
}

export function MetricCard({ title, value, subtitle, icon, variant }: MetricCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm transition-colors duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <p className="mt-1 text-3xl font-bold text-gray-900 dark:text-white tabular-nums">{value}</p>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>
        </div>
        <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${iconBgClasses[variant]}`}>
          {icon}
        </div>
      </div>
    </div>
  )
}
