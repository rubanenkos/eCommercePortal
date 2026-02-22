import { Card } from '../shared/Card'

export interface ProgressChartDataItem {
  label: string
  value: number
  color?: string
}

export interface ProgressChartProps {
  data: ProgressChartDataItem[]
  title?: string
  completedLabel?: string
  totalLabel?: string
}

const defaultColors: Record<string, string> = {
  'Todo': 'text-gray-700 dark:text-gray-300',
  'To Do': 'text-gray-700 dark:text-gray-300',
  'In Progress': 'text-blue-600 dark:text-blue-400',
  'Completed': 'text-emerald-600 dark:text-emerald-400',
  'Done': 'text-emerald-600 dark:text-emerald-400',
  'Overdue': 'text-red-700 dark:text-red-400',
}

export function ProgressChart({
  data,
  title = 'Overall Progress',
  completedLabel,
  totalLabel,
}: ProgressChartProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0)
  const completed = data.find((d) => d.label === 'Completed' || d.label === 'Done')?.value ?? 0
  const completionPct = total > 0 ? Math.round((completed / total) * 100) : 0

  return (
    <Card padding="md">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{title}</h2>
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="flex flex-col items-center shrink-0">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-gray-200 dark:text-gray-700"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-blue-500"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray={`${completionPct}, 100`}
                strokeLinecap="round"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-gray-900 dark:text-white">
              {completionPct}%
            </span>
          </div>
          <p className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">
            {completedLabel ?? completed} / {totalLabel ?? total}
          </p>
        </div>
        <div className="flex-1 w-full min-w-0 space-y-3">
          {data.map((item) => {
            const colorClass = defaultColors[item.label] ?? 'text-gray-700 dark:text-gray-300'
            return (
              <div key={item.label} className="flex justify-between items-center text-sm">
                <span className={colorClass}>{item.label}</span>
                <span className="font-medium text-gray-900 dark:text-white tabular-nums">
                  {item.value} tasks
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
}
