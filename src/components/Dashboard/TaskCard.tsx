import type { Task } from '../types/dashboard'

export interface TaskCardProps extends Task {
  onStatusChange?: (taskId: string, status: Task['status']) => void
  onDelete?: (taskId: string) => void
}

/* WCAG AA: status/priority colors chosen for 4.5:1+ contrast on backgrounds */
const statusStyles = {
  todo: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200',
  in_progress: 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300',
  done: 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300',
}

const priorityStyles = {
  low: 'text-gray-600 dark:text-gray-300',
  medium: 'text-amber-600 dark:text-amber-400',
  high: 'text-red-600 dark:text-red-400',
}

export function TaskCard({
  id,
  title,
  description,
  status,
  priority,
  dueDate,
  onStatusChange,
  onDelete,
}: TaskCardProps) {
  return (
    <article
      className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm transition-all duration-300 hover:shadow-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 dark:focus-within:ring-offset-gray-900"
      aria-labelledby={`task-title-${id}`}
      data-testid="task-card"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3
            id={`task-title-${id}`}
            className="font-semibold text-gray-900 dark:text-white line-clamp-2"
          >
            {title}
          </h3>
          {description && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300 line-clamp-2">
              {description}
            </p>
          )}
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {priority && (
              <span
                className={`text-xs font-medium ${priorityStyles[priority]}`}
              >
                {priority.replace('_', ' ')}
              </span>
            )}
            {dueDate && (
              <span className="text-xs text-gray-500 dark:text-gray-300">
                Due {dueDate}
              </span>
            )}
          </div>
        </div>
        <select
          value={status}
          onChange={(e) =>
            onStatusChange?.(id, e.target.value as Task['status'])
          }
          aria-label={`Change status for ${title}`}
          className="shrink-0 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-2 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
      <div className="mt-3 flex items-center justify-between gap-2">
        <span
          className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[status]}`}
        >
          {status.replace('_', ' ')}
        </span>
        {onDelete && (
          <button
            type="button"
            onClick={() => onDelete(id)}
            aria-label={`Delete ${title}`}
            data-testid="task-delete"
            className="text-xs text-red-600 dark:text-red-400 hover:underline"
          >
            Delete
          </button>
        )}
      </div>
    </article>
  )
}
