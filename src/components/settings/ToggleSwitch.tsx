import type { InputHTMLAttributes } from 'react'

export interface ToggleSwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Label for the toggle */
  label?: string
  /** Description or helper text */
  description?: string
}

export function ToggleSwitch({
  label,
  description,
  id,
  className = '',
  disabled,
  ...props
}: ToggleSwitchProps) {
  const generatedId = id ?? `toggle-${Math.random().toString(36).slice(2)}`

  return (
    <label
      htmlFor={generatedId}
      className={`flex items-start gap-3 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      <div className="relative shrink-0">
        <input
          type="checkbox"
          id={generatedId}
          role="switch"
          aria-checked={props.checked ?? props.defaultChecked}
          disabled={disabled}
          className="peer sr-only"
          {...props}
        />
        <div
          className="h-6 w-11 rounded-full bg-gray-200 dark:bg-gray-600 transition-colors duration-200
            peer-checked:bg-blue-600 peer-focus:ring-2 peer-focus:ring-blue-500 peer-focus:ring-offset-2 dark:peer-focus:ring-offset-gray-900
            peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
        />
        <div
          className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200
            peer-checked:translate-x-5"
        />
      </div>
      {(label || description) && (
        <div className="flex-1 min-w-0">
          {label && (
            <span className="text-sm font-medium text-gray-900 dark:text-white block">
              {label}
            </span>
          )}
          {description && (
            <span className="text-xs text-gray-500 dark:text-gray-400 block mt-0.5">
              {description}
            </span>
          )}
        </div>
      )}
    </label>
  )
}
