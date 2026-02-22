import { useState, useMemo, useCallback, useEffect } from 'react'
import { BoardColumn } from './BoardColumn'
import { AddTaskModal } from './AddTaskModal'
import { EditTaskModal } from './EditTaskModal'
import { useTeam } from '../../contexts/TeamContext'
import type { KanbanTask, KanbanStatus } from './types'

const STORAGE_KEY = 'kanban-board-tasks'

const INITIAL_TASKS: KanbanTask[] = [
  { id: '1', title: 'Review project proposal', description: 'Check the Q4 budget', status: 'todo', priority: 'high', dueDate: 'Feb 25', assignee: { id: '1', name: 'Alex Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' } },
  { id: '2', title: 'Update documentation', description: 'Add API changes', status: 'todo', priority: 'medium', dueDate: 'Feb 28', assignee: { id: '2', name: 'Sam Wilson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sam' } },
  { id: '3', title: 'Team standup prep', description: 'Prepare agenda', status: 'done', priority: 'low', dueDate: 'Feb 22', assignee: { id: '3', name: 'Jordan Lee', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan' } },
  { id: '4', title: 'Fix login bug', description: 'Session timeout on mobile', status: 'in_progress', priority: 'high', dueDate: 'Feb 24', assignee: { id: '4', name: 'Casey Brown', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Casey' } },
  { id: '5', title: 'Design system review', description: 'Audit components', status: 'in_progress', priority: 'medium', dueDate: 'Mar 1' },
  { id: '6', title: 'API integration tests', description: 'Add E2E tests', status: 'done', priority: 'high', dueDate: 'Feb 20', assignee: { id: '5', name: 'Morgan Taylor', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Morgan' } },
]

function loadTasks(): KanbanTask[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as KanbanTask[]
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    }
  } catch {
    /* ignore */
  }
  return INITIAL_TASKS
}

function saveTasks(tasks: KanbanTask[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  } catch {
    /* ignore */
  }
}

const COLUMNS: { id: KanbanStatus; title: string }[] = [
  { id: 'todo', title: 'Todo' },
  { id: 'in_progress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
]

export function KanbanBoard() {
  const { members } = useTeam()
  const [tasks, setTasks] = useState<KanbanTask[]>(loadTasks)
  const [searchQuery, setSearchQuery] = useState('')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')
  const [assigneeFilter, setAssigneeFilter] = useState<string>('all')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<KanbanTask | null>(null)
  const [, setDraggedTask] = useState<KanbanTask | null>(null)

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  const assignees = useMemo(() => members.map((m) => ({ id: m.id, name: m.name, avatar: m.avatar })), [members])

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = !searchQuery || task.title.toLowerCase().includes(searchQuery.toLowerCase()) || (task.description?.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter
      const matchesAssignee = assigneeFilter === 'all' || task.assignee?.name === assigneeFilter
      return matchesSearch && matchesPriority && matchesAssignee
    })
  }, [tasks, searchQuery, priorityFilter, assigneeFilter])

  const columnsWithTasks = useMemo(() => {
    return COLUMNS.map((col) => ({
      ...col,
      tasks: filteredTasks.filter((t) => t.status === col.id),
    }))
  }, [filteredTasks])

  const assigneeFilterOptions = useMemo(() => {
    const names = new Set(tasks.map((t) => t.assignee?.name).filter(Boolean))
    return Array.from(names) as string[]
  }, [tasks])

  const handleDrop = useCallback((e: React.DragEvent, targetStatus: KanbanStatus) => {
    e.preventDefault()
    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'))
      const { taskId } = data
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, status: targetStatus } : t))
      )
    } catch {
      /* ignore */
    }
    setDraggedTask(null)
  }, [])

  const handleAddTask = useCallback((input: {
    title: string
    description?: string
    priority: 'low' | 'medium' | 'high'
    dueDate?: string
    assignee?: { id: string; name: string; avatar: string }
  }) => {
    const newTask: KanbanTask = {
      id: String(Date.now()),
      title: input.title,
      description: input.description,
      status: 'todo',
      priority: input.priority,
      dueDate: input.dueDate,
      assignee: input.assignee,
    }
    setTasks((prev) => [newTask, ...prev])
    setIsAddModalOpen(false)
  }, [])

  const handleEditTask = useCallback((taskId: string, updates: Partial<KanbanTask>) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, ...updates } : t))
    )
    setEditingTask(null)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <main id="main-content" className="p-4 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Project Board
          </h1>
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            aria-label="Add new task"
          >
            Add Task
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
          <input
            type="search"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 min-w-[200px] rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400"
            aria-label="Search tasks"
          />
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white"
            aria-label="Filter by priority"
          >
            <option value="all">All priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <select
            value={assigneeFilter}
            onChange={(e) => setAssigneeFilter(e.target.value)}
            className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white"
            aria-label="Filter by assignee"
          >
            <option value="all">All assignees</option>
            {assigneeFilterOptions.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4">
          {columnsWithTasks.map((column) => (
            <BoardColumn
              key={column.id}
              id={column.id}
              title={column.title}
              tasks={column.tasks}
              onDrop={handleDrop}
              onDragStart={(_, task) => setDraggedTask(task)}
              onDragEnd={() => setDraggedTask(null)}
              onTaskClick={setEditingTask}
            />
          ))}
        </div>
      </main>

      <AddTaskModal
        isOpen={isAddModalOpen}
        assignees={assignees}
        onClose={() => setIsAddModalOpen(false)}
        onAddTask={handleAddTask}
      />

      <EditTaskModal
        isOpen={editingTask != null}
        task={editingTask}
        assignees={assignees}
        onClose={() => setEditingTask(null)}
        onSave={handleEditTask}
      />
    </div>
  )
}
