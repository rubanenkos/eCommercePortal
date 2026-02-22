export interface Project {
  id: string
  name: string
  description?: string
  progress: number
  status: 'active' | 'on_hold' | 'completed'
  dueDate?: string
  taskCount?: number
  completedTasks?: number
}
