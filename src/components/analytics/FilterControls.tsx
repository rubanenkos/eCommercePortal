export interface FilterOption {
  value: string
  label: string
}

export interface FilterConfig {
  id: string
  label: string
  options: FilterOption[]
}

export interface FilterControlsProps {
  /** Filter configurations */
  filters: FilterConfig[]
  /** Current filter values */
  values: Record<string, string>
  /** Callback when a filter changes */
  onChange: (filterId: string, value: string) => void
}

export function FilterControls({
  filters,
  values,
  onChange,
}: FilterControlsProps) {
  return (
    <div
      className="flex flex-wrap items-center gap-3"
      role="group"
      aria-label="Filter controls"
    >
      {filters.map((filter) => (
        <div key={filter.id} className="flex items-center gap-2">
          <label
            htmlFor={`filter-${filter.id}`}
            className="text-sm font-medium text-gray-700 dark:text-gray-300 shrink-0"
          >
            {filter.label}
          </label>
          <select
            id={`filter-${filter.id}`}
            value={values[filter.id] ?? ''}
            onChange={(e) => onChange(filter.id, e.target.value)}
            aria-label={`Filter by ${filter.label}`}
            className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[120px]"
          >
            {filter.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  )
}
