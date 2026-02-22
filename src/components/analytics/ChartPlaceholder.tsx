export interface ChartPlaceholderProps {
  /** Chart title */
  title: string
  /** Chart type label for placeholder */
  chartType?: string
  /** Optional height override */
  height?: string
}

export function ChartPlaceholder({
  title,
  chartType = 'Chart',
  height = 'h-64',
}: ChartPlaceholderProps) {
  return (
    <div
      className={`rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden transition-colors duration-300`}
      role="img"
      aria-label={`${title} chart placeholder`}
    >
      <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
      </div>
      <div
        className={`${height} flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900/50`}
      >
        <div className="flex flex-col items-center gap-2 text-gray-400 dark:text-gray-500">
          <ChartIcon className="w-12 h-12" />
          <p className="text-sm font-medium">{chartType} placeholder</p>
          <p className="text-xs">Connect your chart library (e.g. Recharts, Chart.js)</p>
        </div>
      </div>
    </div>
  )
}

function ChartIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4v16"
      />
    </svg>
  )
}
