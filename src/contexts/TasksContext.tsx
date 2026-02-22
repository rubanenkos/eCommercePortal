import { createContext, useContext, useState, useCallback } from 'react'
import type { Task } from '../components/types/dashboard'
import { useActivity } from './ActivityContext'
import { useUser } from './UserContext'

const INITIAL_TASKS: Task[] = [
  { id: '1', title: 'Review project proposal', description: 'Check the Q4 budget', status: 'in_progress', priority: 'high', dueDate: 'Feb 25' },
  { id: '2', title: 'Update documentation', description: 'Add API changes', status: 'todo', priority: 'medium', dueDate: 'Feb 28' },
  { id: '3', title: 'Team standup prep', description: 'Prepare agenda', status: 'done', priority: 'low', dueDate: 'Feb 22' },
  { id: '4', title: 'Fix login bug', description: 'Session timeout on mobile', status: 'in_progress', priority: 'high', dueDate: 'Feb 24' },
]

interface TasksContextValue {
  tasks: Task[]
  updateTaskStatus: (taskId: string, status: Task['status']) => void
  addTask: (task: Omit<Task, 'id'>) => void
  deleteTask: (taskId: string) => void
}

const TasksContext = createContext<TasksContextValue | null>(null)

function TasksProviderInner({ children }: { children: React.ReactNode }) {
  const { addActivity } = useActivity()
  const { user } = useUser()
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS)

  const updateTaskStatus = useCallback((taskId: string, status: Task['status']) => {
    setTasks((prev) => {
      const task = prev.find((t) => t.id === taskId)
      const next = prev.map((t) => (t.id === taskId ? { ...t, status } : t))
      if (task && status === 'done') {
        addActivity({
          type: 'task_completed',
          user: user?.name ?? 'User',
          userAvatar: user?.avatar,
          message: `completed ${task.title}`,
        })
      }
      return next
    })
  }, [addActivity, user])

  const addTask = useCallback((task: Omit<Task, 'id'>) => {
    const newTask: Task = { ...task, id: String(Date.now()) }
    setTasks((prev) => [newTask, ...prev])
    addActivity({
      type: 'task_created',
      user: user?.name ?? 'User',
      userAvatar: user?.avatar,
      message: `created ${task.title}`,
    })
  }, [addActivity, user])

  const deleteTask = useCallback((taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId))
  }, [])

  return (
    <TasksContext.Provider value={{ tasks, updateTaskStatus, addTask, deleteTask }}>
      {children}
    </TasksContext.Provider>
  )
}

export function TasksProvider({ children }: { children: React.ReactNode }) {
  return <TasksProviderInner>{children}</TasksProviderInner>
}

export function useTasks(): TasksContextValue {
  const ctx = useContext(TasksContext)
  if (!ctx) {
    throw new Error('useTasks must be used within TasksProvider')
  }
  return ctx
}

export function useTasksOptional(): TasksContextValue | null {
  return useContext(TasksContext)
}
