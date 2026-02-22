import { createContext, useContext, useState, useCallback } from 'react'
import type { ActivityItem } from '../components/types/activity'

interface ActivityContextValue {
  activity: ActivityItem[]
  addActivity: (item: Omit<ActivityItem, 'id' | 'timestamp'>) => void
}

const ActivityContext = createContext<ActivityContextValue | null>(null)

function relativeTime(): string {
  return 'Just now'
}

export const INITIAL_ACTIVITY: ActivityItem[] = [
  { id: '1', type: 'task_completed', user: 'Alex Johnson', userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', message: 'completed Homepage layout', timestamp: '2 min ago', projectId: '1' },
  { id: '2', type: 'task_created', user: 'Sam Wilson', userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sam', message: 'created API auth flow', timestamp: '15 min ago', projectId: '2' },
  { id: '3', type: 'comment', user: 'Jordan Lee', userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan', message: 'commented on Design system', timestamp: '1 hour ago', projectId: '1' },
  { id: '4', type: 'member_joined', user: 'Morgan Taylor', message: 'joined the project', timestamp: '2 hours ago', projectId: '2' },
  { id: '5', type: 'file_uploaded', user: 'Casey Brown', userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Casey', message: 'uploaded test report', timestamp: '3 hours ago', projectId: '1' },
]

export function ActivityProvider({ children, initialActivity = INITIAL_ACTIVITY }: { children: React.ReactNode; initialActivity?: ActivityItem[] }) {
  const [activity, setActivity] = useState<ActivityItem[]>(initialActivity)

  const addActivity = useCallback((item: Omit<ActivityItem, 'id' | 'timestamp'>) => {
    setActivity((prev) => [
      {
        ...item,
        id: `act-${Date.now()}`,
        timestamp: relativeTime(),
      },
      ...prev,
    ])
  }, [])

  return (
    <ActivityContext.Provider value={{ activity, addActivity }}>
      {children}
    </ActivityContext.Provider>
  )
}

export function useActivity(): ActivityContextValue {
  const ctx = useContext(ActivityContext)
  if (!ctx) {
    throw new Error('useActivity must be used within ActivityProvider')
  }
  return ctx
}

export function useActivityOptional(): ActivityContextValue | null {
  return useContext(ActivityContext)
}
