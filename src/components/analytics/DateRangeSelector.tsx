import { useState, useRef, useEffect } from 'react'

export type DatePreset = '7d' | '30d' | '90d' | 'custom'

export interface DateRangeSelectorProps {
  /** Currently selected preset */
  value?: DatePreset
  /** Callback when range changes */
  onChange?: (preset: DatePreset, startDate?: string, endDate?: string) => void
}

const PRESETS: { id: DatePreset; label: string }[] = [
  { id: '7d', label: 'Last 7 days' },
  { id: '30d', label: 'Last 30 days' },
  { id: '90d', label: 'Last 90 days' },
  { id: 'custom', label: 'Custom' },
]

export function DateRangeSelector({
  value = '30d',
  onChange,
}: DateRangeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<DatePreset>(value)
  const [customStart, setCustomStart] = useState('')
  const [customEnd, setCustomEnd] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (preset: DatePreset) => {
    setSelected(preset)
    if (preset !== 'custom') {
      onChange?.(preset)
      setIsOpen(false)
    }
  }

  const handleCustomApply = () => {
    if (customStart && customEnd) {
      onChange?.('custom', customStart, customEnd)
      setIsOpen(false)
    }
  }

  const displayLabel = PRESETS.find((p) => p.id === selected)?.label ?? 'Select range'

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select date range"
        className="inline-flex items-center gap-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <CalendarIcon className="w-4 h-4" />
        {displayLabel}
        <ChevronIcon className="w-4 h-4" />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-64 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg z-10"
          role="listbox"
        >
          <div className="p-2">
            {PRESETS.filter((p) => p.id !== 'custom').map((preset) => (
              <button
                key={preset.id}
                role="option"
                aria-selected={selected === preset.id}
                onClick={() => handleSelect(preset.id)}
                className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  selected === preset.id
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {preset.label}
              </button>
            ))}
            <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
              <p className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                Custom range
              </p>
              <div className="flex gap-2 p-2">
                <input
                  type="date"
                  value={customStart}
                  onChange={(e) => setCustomStart(e.target.value)}
                  className="flex-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-2 py-1.5 text-sm text-gray-900 dark:text-white"
                />
                <input
                  type="date"
                  value={customEnd}
                  onChange={(e) => setCustomEnd(e.target.value)}
                  className="flex-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-2 py-1.5 text-sm text-gray-900 dark:text-white"
                />
              </div>
              <button
                type="button"
                onClick={handleCustomApply}
                disabled={!customStart || !customEnd}
                className="w-full mt-2 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )
}
