import type { KanbanTask, KanbanStatus } from './types'

export interface AssigneeOption {
  id: string
  name: string
  avatar: string
}

export interface EditTaskModalProps {
  isOpen: boolean
  task: KanbanTask | null
  assignees: AssigneeOption[]
  onClose: () => void
  onSave: (taskId: string, updates: Partial<KanbanTask>) => void
}

export function EditTaskModal({ isOpen, task, assignees, onClose, onSave }: EditTaskModalProps) {
  if (!isOpen || !task) return null

  const assigneeOptions: AssigneeOption[] = task.assignee && !assignees.some((a) => a.id === task.assignee!.id)
    ? [{ id: task.assignee.id, name: task.assignee.name, avatar: task.assignee.avatar }, ...assignees]
    : assignees

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const title = (form.elements.namedItem('title') as HTMLInputElement)?.value?.trim()
    const description = (form.elements.namedItem('description') as HTMLTextAreaElement)?.value?.trim() || undefined
    const priority = (form.elements.namedItem('priority') as HTMLSelectElement)?.value as KanbanTask['priority']
    const dueDate = (form.elements.namedItem('dueDate') as HTMLInputElement)?.value?.trim() || undefined
    const assigneeId = (form.elements.namedItem('assignee') as HTMLSelectElement)?.value || undefined
    const status = (form.elements.namedItem('status') as HTMLSelectElement)?.value as KanbanStatus

    if (title) {
      const assignee = assigneeId ? assigneeOptions.find((a) => a.id === assigneeId) : undefined
      onSave(task.id, {
        title,
        description,
        priority,
        dueDate: dueDate || undefined,
        assignee: assignee ? { id: assignee.id, name: assignee.name, avatar: assignee.avatar } : undefined,
        status,
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
      aria-labelledby="edit-task-title"
    >
      <div
        className="w-full max-w-md rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-xl p-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="edit-task-title" className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Edit Task
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title
            </label>
            <input
              id="edit-title"
              name="title"
              type="text"
              required
              defaultValue={task.title}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              id="edit-description"
              name="description"
              rows={3}
              defaultValue={task.description}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="edit-priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Priority
            </label>
            <select
              id="edit-priority"
              name="priority"
              defaultValue={task.priority}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <label htmlFor="edit-status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status
            </label>
            <select
              id="edit-status"
              name="status"
              defaultValue={task.status}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white"
            >
              <option value="todo">Todo</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
          <div>
            <label htmlFor="edit-dueDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Due Date
            </label>
            <input
              id="edit-dueDate"
              name="dueDate"
              type="text"
              placeholder="e.g. Feb 25"
              defaultValue={task.dueDate ?? ''}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="edit-assignee" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Assignee
            </label>
            <select
              id="edit-assignee"
              name="assignee"
              defaultValue={task.assignee?.id ?? ''}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white"
            >
              <option value="">Unassigned</option>
              {assigneeOptions.map((a) => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2 justify-end pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
