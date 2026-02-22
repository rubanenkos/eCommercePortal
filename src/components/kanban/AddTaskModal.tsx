export interface AssigneeOption {
  id: string
  name: string
  avatar: string
}

export interface AddTaskModalProps {
  isOpen: boolean
  assignees: AssigneeOption[]
  onClose: () => void
  onAddTask?: (task: {
    title: string
    description?: string
    priority: 'low' | 'medium' | 'high'
    dueDate?: string
    assignee?: { id: string; name: string; avatar: string }
  }) => void
}

export function AddTaskModal({ isOpen, assignees, onClose, onAddTask }: AddTaskModalProps) {
  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const title = (form.elements.namedItem('title') as HTMLInputElement)?.value?.trim()
    const description = (form.elements.namedItem('description') as HTMLTextAreaElement)?.value?.trim() || undefined
    const priority = (form.elements.namedItem('priority') as HTMLSelectElement)?.value as 'low' | 'medium' | 'high'
    const dueDate = (form.elements.namedItem('dueDate') as HTMLInputElement)?.value?.trim() || undefined
    const assigneeId = (form.elements.namedItem('assignee') as HTMLSelectElement)?.value || undefined

    if (title) {
      const assignee = assigneeId ? assignees.find((a) => a.id === assigneeId) : undefined
      onAddTask?.({
        title,
        description,
        priority: priority ?? 'medium',
        dueDate,
        assignee: assignee ? { id: assignee.id, name: assignee.name, avatar: assignee.avatar } : undefined,
      })
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 dark:bg-black/70"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-task-title"
    >
      <div
        className="w-full max-w-md rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-xl p-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="add-task-title" className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Add New Task
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="task-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title
            </label>
            <input
              id="task-title"
              name="title"
              type="text"
              required
              placeholder="Task title"
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400"
            />
          </div>
          <div>
            <label htmlFor="task-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              id="task-description"
              name="description"
              rows={3}
              placeholder="Task description"
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400"
            />
          </div>
          <div>
            <label htmlFor="task-priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Priority
            </label>
            <select
              id="task-priority"
              name="priority"
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <label htmlFor="task-dueDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Due Date
            </label>
            <input
              id="task-dueDate"
              name="dueDate"
              type="text"
              placeholder="e.g. Feb 25"
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400"
            />
          </div>
          <div>
            <label htmlFor="task-assignee" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Assignee
            </label>
            <select
              id="task-assignee"
              name="assignee"
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white"
            >
              <option value="">Unassigned</option>
              {assignees.map((a) => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2 justify-end pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              aria-label="Cancel and close"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              aria-label="Add task"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
