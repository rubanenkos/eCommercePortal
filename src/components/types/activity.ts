export interface ActivityItem {
  id: string
  type: 'task_completed' | 'task_created' | 'comment' | 'member_joined' | 'file_uploaded'
  user: string
  userAvatar?: string
  message: string
  timestamp: string
  projectId?: string
}
