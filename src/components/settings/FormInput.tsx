import type { InputHTMLAttributes, SelectHTMLAttributes } from 'react'

export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Label for the input */
  label: string
  /** Error message for validation */
  error?: string
  /** Helper text */
  hint?: string
}

export function FormInput({
  label,
  error,
  hint,
  id,
  className = '',
  required,
  ...props
}: FormInputProps) {
  const generatedId = id ?? `input-${Math.random().toString(36).slice(2)}`

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={generatedId}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
        {required && <span className="text-red-500 ml-0.5" aria-hidden>*</span>}
      </label>
      <input
        id={generatedId}
        required={required}
        aria-invalid={!!error}
        aria-describedby={
          error ? `${generatedId}-error` : hint ? `${generatedId}-hint` : undefined
        }
        className={`block w-full rounded-lg border px-3 py-2 text-sm transition-colors
          bg-white dark:bg-gray-800
          border-gray-300 dark:border-gray-600
          text-gray-900 dark:text-white
          placeholder-gray-500 dark:placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? 'border-red-500 dark:border-red-500' : ''}
          ${className}`}
        {...props}
      />
      {error && (
        <p id={`${generatedId}-error`} className="text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
      {hint && !error && (
        <p id={`${generatedId}-hint`} className="text-xs text-gray-500 dark:text-gray-400">
          {hint}
        </p>
      )}
    </div>
  )
}

export interface FormSelectOption {
  value: string
  label: string
}

export interface FormSelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  /** Label for the select */
  label: string
  /** Options for the dropdown */
  options: FormSelectOption[]
  /** Error message for validation */
  error?: string
  /** Helper text */
  hint?: string
}

export function FormSelect({
  label,
  options,
  error,
  hint,
  id,
  className = '',
  required,
  ...props
}: FormSelectProps) {
  const generatedId = id ?? `select-${Math.random().toString(36).slice(2)}`

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={generatedId}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
        {required && <span className="text-red-500 ml-0.5" aria-hidden>*</span>}
      </label>
      <select
        id={generatedId}
        required={required}
        aria-invalid={!!error}
        aria-describedby={
          error ? `${generatedId}-error` : hint ? `${generatedId}-hint` : undefined
        }
        className={`block w-full rounded-lg border px-3 py-2 text-sm transition-colors
          bg-white dark:bg-gray-800
          border-gray-300 dark:border-gray-600
          text-gray-900 dark:text-white
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? 'border-red-500 dark:border-red-500' : ''}
          ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={`${generatedId}-error`} className="text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
      {hint && !error && (
        <p id={`${generatedId}-hint`} className="text-xs text-gray-500 dark:text-gray-400">
          {hint}
        </p>
      )}
    </div>
  )
}

export interface FormTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Label for the textarea */
  label: string
  /** Error message for validation */
  error?: string
  /** Helper text */
  hint?: string
}

export function FormTextarea({
  label,
  error,
  hint,
  id,
  className = '',
  required,
  ...props
}: FormTextareaProps) {
  const generatedId = id ?? `textarea-${Math.random().toString(36).slice(2)}`

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={generatedId}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
        {required && <span className="text-red-500 ml-0.5" aria-hidden>*</span>}
      </label>
      <textarea
        id={generatedId}
        required={required}
        aria-invalid={!!error}
        aria-describedby={
          error ? `${generatedId}-error` : hint ? `${generatedId}-hint` : undefined
        }
        className={`block w-full rounded-lg border px-3 py-2 text-sm transition-colors resize-y min-h-[80px]
          bg-white dark:bg-gray-800
          border-gray-300 dark:border-gray-600
          text-gray-900 dark:text-white
          placeholder-gray-500 dark:placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? 'border-red-500 dark:border-red-500' : ''}
          ${className}`}
        {...props}
      />
      {error && (
        <p id={`${generatedId}-error`} className="text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
      {hint && !error && (
        <p id={`${generatedId}-hint`} className="text-xs text-gray-500 dark:text-gray-400">
          {hint}
        </p>
      )}
    </div>
  )
}
