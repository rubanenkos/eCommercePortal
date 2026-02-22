import { Card } from '../shared/Card'
import { Avatar } from '../shared/Avatar'
import type { ActivityItem } from '../types/activity'

export interface ActivityFeedProps {
  activities: ActivityItem[]
  maxItems?: number
}

const typeIcons: Record<ActivityItem['type'], string> = {
  task_completed: '✓',
  task_created: '+',
  comment: '💬',
  member_joined: '👋',
  file_uploaded: '📎',
}

export function ActivityFeed({ activities, maxItems = 5 }: ActivityFeedProps) {
  const displayActivities = activities.slice(0, maxItems)

  return (
    <Card padding="none">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Latest updates from your team</p>
      </div>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {displayActivities.map((activity) => (
          <li key={activity.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <div className="flex gap-3">
              <div className="shrink-0">
                {activity.userAvatar ? (
                  <Avatar src={activity.userAvatar} alt={activity.user} size="sm" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-sm">
                    {typeIcons[activity.type]}
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-gray-900 dark:text-white">
                  <span className="font-medium">{activity.user}</span>{' '}
                  <span className="text-gray-600 dark:text-gray-400">{activity.message}</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{activity.timestamp}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  )
}
