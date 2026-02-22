import { Badge } from '../shared/Badge'
import { Avatar } from '../shared/Avatar'
import type { KanbanTask } from './types'

export interface TaskCardProps {
  task: KanbanTask
  onDragStart?: (e: React.DragEvent, task: KanbanTask) => void
  onDragEnd?: (e: React.DragEvent) => void
  onClick?: (task: KanbanTask) => void
}

const priorityConfig = {
  low: { variant: 'default' as const, label: 'Low' },
  medium: { variant: 'warning' as const, label: 'Medium' },
  high: { variant: 'error' as const, label: 'High' },
}

export function TaskCard({ task, onDragStart, onDragEnd, onClick }: TaskCardProps) {
  const p = priorityConfig[task.priority]
  return (
    <div
      draggable
      onClick={(e) => { if (!(e.target as HTMLElement).closest('button')) onClick?.(task) }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick?.(task) }}
      onDragStart={(e) => {
        e.dataTransfer.setData('application/json', JSON.stringify({ taskId: task.id, fromStatus: task.status }))
        e.dataTransfer.effectAllowed = 'move'
        onDragStart?.(e, task)
      }}
      onDragEnd={onDragEnd}
      className="rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-3 shadow-sm hover:shadow-md cursor-grab active:cursor-grabbing hover:ring-2 hover:ring-blue-400/50"
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 flex-1">{task.title}</h4>
        <Badge variant={p.variant} size="sm">{p.label}</Badge>
      </div>
      {task.description && (
        <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{task.description}</p>
      )}
      <div className="mt-3 flex items-center justify-between gap-2">
        {task.assignee ? (
          <div className="flex items-center gap-1.5 min-w-0">
            <Avatar src={task.assignee.avatar} alt={task.assignee.name} size="sm" />
            <span className="text-xs text-gray-600 dark:text-gray-300 truncate">{task.assignee.name}</span>
          </div>
        ) : (
          <span className="text-xs text-gray-400 dark:text-gray-500">Unassigned</span>
        )}
        {task.dueDate && <span className="text-xs text-gray-500 dark:text-gray-400 shrink-0">Due {task.dueDate}</span>}
      </div>
    </div>
  )
}
