import { useEffect, useState } from 'react'
import { useThemeOptional } from '../../contexts/ThemeContext'

const STORAGE_KEY = 'portal-theme'

export interface DarkModeToggleProps {
  /** Controlled mode - when provided, component acts as controlled */
  isDark?: boolean
  /** Callback when mode changes */
  onToggle?: (isDark: boolean) => void
  /** Additional class names */
  className?: string
}

export function DarkModeToggle({
  isDark: controlledIsDark,
  onToggle,
  className = '',
}: DarkModeToggleProps) {
  const themeContext = useThemeOptional()
  const [fallbackDark, setFallbackDark] = useState(() => {
    if (typeof window === 'undefined') return false
    try {
      return localStorage.getItem(STORAGE_KEY) === 'dark'
    } catch { return false }
  })

  const isDark = controlledIsDark ?? themeContext?.isDark ?? fallbackDark

  useEffect(() => {
    const root = document.documentElement
    if (isDark) root.classList.add('dark')
    else root.classList.remove('dark')
  }, [isDark])

  useEffect(() => {
    if (themeContext || controlledIsDark !== undefined) return
    try { localStorage.setItem(STORAGE_KEY, fallbackDark ? 'dark' : 'light') } catch { /* ignore */ }
  }, [fallbackDark, themeContext, controlledIsDark])

  const handleClick = () => {
    const next = !isDark
    if (themeContext) {
      themeContext.setTheme(next ? 'dark' : 'light')
    } else if (controlledIsDark === undefined) {
      setFallbackDark(next)
    }
    onToggle?.(next)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      className={`p-2 rounded-lg text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${className}`}
    >
      {isDark ? (
        <SunIcon className="w-5 h-5" />
      ) : (
        <MoonIcon className="w-5 h-5" />
      )}
    </button>
  )
}

function SunIcon({ className }: { className?: string }) {
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
        strokeWidth={2}
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  )
}

function MoonIcon({ className }: { className?: string }) {
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
        strokeWidth={2}
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  )
}
