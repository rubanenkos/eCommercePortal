export type ProjectTrend = 'up' | 'down' | 'stable'

export interface Project {
  id: string
  name: string
  description?: string
  progress: number
  status: 'active' | 'on_hold' | 'completed'
  dueDate?: string
  taskCount?: number
  completedTasks?: number
  overdueTasks?: number
  /** Trend direction for progress (e.g. vs last period) */
  trend?: ProjectTrend
  /** Optional trend value (e.g. +5% change) */
  trendValue?: number
  /** When metrics were last updated (display string, e.g. "2 min ago") */
  lastUpdated?: string
  /** Timestamp for sorting by recency (ms) */
  lastUpdatedAt?: number
}
