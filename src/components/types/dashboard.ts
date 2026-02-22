import type { ReactNode } from 'react'

export interface DashboardNavItem {
  label: string
  href: string
  icon?: ReactNode
}

export interface Task {
  id: string
  title: string
  description?: string
  status: 'todo' | 'in_progress' | 'done'
  priority?: 'low' | 'medium' | 'high'
  dueDate?: string
}

export interface StatWidgetData {
  label: string
  value: string | number
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
}
