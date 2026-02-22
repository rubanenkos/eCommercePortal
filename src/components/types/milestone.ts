export interface ProjectMilestone {
  id: string
  name: string
  projectId: string
  projectName: string
  date: string
  /** ISO date for sorting */
  dateSort: string
  status: 'completed' | 'upcoming' | 'overdue'
}
