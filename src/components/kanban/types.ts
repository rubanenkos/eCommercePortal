export type KanbanStatus = 'todo' | 'in_progress' | 'done'
export type KanbanPriority = 'low' | 'medium' | 'high'

export interface KanbanTask {
  id: string
  title: string
  description?: string
  status: KanbanStatus
  priority: KanbanPriority
  dueDate?: string
  assignee?: {
    id: string
    name: string
    avatar: string
  }
}

export interface KanbanColumn {
  id: KanbanStatus
  title: string
  tasks: KanbanTask[]
}
