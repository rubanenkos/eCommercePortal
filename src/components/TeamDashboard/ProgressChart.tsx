import { Card } from '../shared/Card'

export interface ProgressChartProps {
  data: { label: string; value: number; color?: string }[]
  title?: string
}

const defaultColors = [
  'bg-blue-500',
  'bg-green-500',
  'bg-amber-500',
  'bg-purple-500',
  'bg-rose-500',
]

export function ProgressChart({ data, title = 'Task Progress' }: ProgressChartProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0)

  return (
    <Card padding="md">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{title}</h2>
      <div className="space-y-3">
        {data.map((item, i) => {
          const pct = total > 0 ? (item.value / total) * 100 : 0
          const color = item.color ?? defaultColors[i % defaultColors.length]
          return (
            <div key={item.label}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700 dark:text-gray-300">{item.label}</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {item.value} ({pct.toFixed(0)}%)
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <div
                  className={`h-full rounded-full ${color} transition-all duration-500`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
