export interface MockPieChartProps {
  /** Chart title */
  title: string
  /** Segments with label and value (percentage) */
  data?: { label: string; value: number; color?: string }[]
  /** Height class */
  height?: string
}

const DEFAULT_COLORS = [
  'rgb(59, 130, 246)',   // blue-500
  'rgb(34, 197, 94)',    // green-500
  'rgb(234, 179, 8)',    // yellow-500
  'rgb(239, 68, 68)',    // red-500
  'rgb(168, 85, 247)',   // purple-500
]

const DEFAULT_DATA = [
  { label: 'Organic', value: 35 },
  { label: 'Direct', value: 28 },
  { label: 'Social', value: 18 },
  { label: 'Email', value: 12 },
  { label: 'Referral', value: 7 },
]

export function MockPieChart({
  title,
  data = DEFAULT_DATA,
  height = 'h-64',
}: MockPieChartProps) {
  const total = data.reduce((s, d) => s + d.value, 0)
  let acc = 0

  const segments = data.map((d, i) => {
    const pct = (d.value / total) * 100
    const start = acc
    acc += pct
    return {
      ...d,
      color: d.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length],
      start: (start / 100) * 360,
      end: (acc / 100) * 360,
    }
  })

  const size = 160
  const strokeWidth = 32
  const r = (size - strokeWidth) / 2

  return (
    <div
      className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden transition-colors duration-300"
      role="img"
      aria-label={`${title} pie chart`}
    >
      <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
      </div>
      <div className={`${height} p-4 flex flex-row items-center justify-between gap-4 bg-gray-50/50 dark:bg-gray-900/30 min-h-0`}>
        <div className="shrink-0 w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center">
          <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full max-w-full max-h-full" preserveAspectRatio="xMidYMid meet">
          {segments.map((seg, i) => {
            const largeArc = seg.end - seg.start > 180 ? 1 : 0
            const startRad = ((seg.start - 90) * Math.PI) / 180
            const endRad = ((seg.end - 90) * Math.PI) / 180
            const x1 = size / 2 + r * Math.cos(startRad)
            const y1 = size / 2 + r * Math.sin(startRad)
            const x2 = size / 2 + r * Math.cos(endRad)
            const y2 = size / 2 + r * Math.sin(endRad)
            const d = `M ${size/2} ${size/2} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`
            return (
              <path
                key={i}
                d={d}
                fill={seg.color}
                className="transition-opacity hover:opacity-90"
              />
            )
          })}
          </svg>
        </div>
        <div className="flex flex-col gap-1.5 justify-center">
          {segments.map((seg, i) => (
            <div key={i} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-sm shrink-0"
                style={{ backgroundColor: seg.color }}
              />
              <span className="text-xs text-gray-700 dark:text-gray-300">
                {seg.label} {seg.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
