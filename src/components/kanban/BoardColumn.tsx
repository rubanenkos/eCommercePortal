import { TaskCard } from './TaskCard'
import type { KanbanTask, KanbanStatus } from './types'

export interface BoardColumnProps {
  id: KanbanStatus
  title: string
  tasks: KanbanTask[]
  onDragOver?: (e: React.DragEvent) => void
  onDrop?: (e: React.DragEvent, targetStatus: KanbanStatus) => void
  onDragStart?: (e: React.DragEvent, task: KanbanTask) => void
  onDragEnd?: (e: React.DragEvent) => void
  onTaskClick?: (task: KanbanTask) => void
}

const columnBgClasses: Record<KanbanStatus, string> = {
  todo: 'bg-gray-50 dark:bg-gray-900/50',
  in_progress: 'bg-blue-50/50 dark:bg-blue-900/10',
  done: 'bg-emerald-50/50 dark:bg-emerald-900/10',
}

export function BoardColumn({
  id,
  title,
  tasks,
  onDragOver,
  onDrop,
  onDragStart,
  onDragEnd,
  onTaskClick,
}: BoardColumnProps) {
  return (
    <div
      role="group"
      aria-label={`${title} column, ${tasks.length} ${tasks.length === 1 ? 'task' : 'tasks'}`}
      className={`flex flex-col w-72 shrink-0 rounded-xl border border-gray-200 dark:border-gray-700 ${columnBgClasses[id]}`}
      onDragOver={(e) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move'
        onDragOver?.(e)
      }}
      onDrop={(e) => {
        e.preventDefault()
        onDrop?.(e, id)
      }}
    >
      <div className="p-3 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
        </p>
      </div>
      <div className="p-2 flex-1 min-h-[200px] space-y-2 overflow-y-auto">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onClick={onTaskClick}
          />
        ))}
      </div>
    </div>
  )
}
