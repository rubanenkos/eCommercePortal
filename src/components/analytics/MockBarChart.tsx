export interface MockBarChartProps {
  /** Chart title */
  title: string
  /** Bar values (0-100 scale) */
  data?: { label: string; value: number }[]
  /** Height class */
  height?: string
}

const DEFAULT_DATA = [
  { label: 'Jan', value: 65 },
  { label: 'Feb', value: 78 },
  { label: 'Mar', value: 52 },
  { label: 'Apr', value: 89 },
  { label: 'May', value: 71 },
  { label: 'Jun', value: 95 },
]

export function MockBarChart({
  title,
  data = DEFAULT_DATA,
  height = 'h-64',
}: MockBarChartProps) {
  const maxVal = Math.max(...data.map((d) => d.value))

  return (
    <div
      className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden transition-colors duration-300"
      role="img"
      aria-label={`${title} bar chart`}
    >
      <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
      </div>
      <div className={`${height} p-4 flex items-end justify-around gap-2 bg-gray-50/50 dark:bg-gray-900/30`}>
        {data.map((d) => (
          <div key={d.label} className="flex-1 flex flex-col items-center gap-1 min-w-0">
            <div
              className="w-full max-w-[48px] rounded-t bg-blue-500 dark:bg-blue-600 transition-all duration-500"
              style={{ height: `${(d.value / maxVal) * 120}px` }}
            />
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400 truncate w-full text-center">
              {d.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
