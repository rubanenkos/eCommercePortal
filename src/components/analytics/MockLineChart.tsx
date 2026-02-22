export interface MockLineChartProps {
  /** Chart title */
  title: string
  /** Data points (0-100 scale) */
  data?: number[]
  /** Height class */
  height?: string
}

const DEFAULT_DATA = [30, 45, 35, 55, 48, 62, 58, 70, 65, 78, 72, 85]

export function MockLineChart({
  title,
  data = DEFAULT_DATA,
  height = 'h-64',
}: MockLineChartProps) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const padding = 24
  const width = 400
  const chartHeight = 200

  const points = data.map((val, i) => {
    const x = padding + (i / (data.length - 1)) * (width - padding * 2)
    const y = padding + chartHeight - ((val - min) / range) * chartHeight
    return `${x},${y}`
  }).join(' ')

  return (
    <div
      className={`rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden transition-colors duration-300`}
      role="img"
      aria-label={`${title} line chart`}
    >
      <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
      </div>
      <div className={`${height} p-4 flex items-center justify-center bg-gray-50/50 dark:bg-gray-900/30`}>
        <svg
          viewBox={`0 0 ${width + padding * 2} ${chartHeight + padding * 2}`}
          className="w-full h-full max-h-[280px]"
          preserveAspectRatio="xMidYMid meet"
        >
          <polyline
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-blue-500"
            points={points}
          />
        </svg>
      </div>
    </div>
  )
}
