import { TeamDashboard } from '../components/TeamDashboard/TeamDashboard'
import type { Project } from '../components/types/project'
import type { TeamMember } from '../components/types/team'
import type { ActivityItem } from '../components/types/activity'

const MOCK_PROJECTS: Project[] = [
  { id: '1', name: 'Website Redesign', description: 'Modernize the company website', progress: 65, status: 'active', dueDate: 'Mar 15', taskCount: 20, completedTasks: 13 },
  { id: '2', name: 'Mobile App', description: 'iOS and Android app development', progress: 30, status: 'active', dueDate: 'Apr 30', taskCount: 45, completedTasks: 14 },
  { id: '3', name: 'API Integration', description: 'Third-party API integrations', progress: 100, status: 'completed', dueDate: 'Feb 10', taskCount: 8, completedTasks: 8 },
  { id: '4', name: 'Q4 Marketing', description: 'Campaign planning and execution', progress: 15, status: 'on_hold', dueDate: 'May 1', taskCount: 12, completedTasks: 2 },
]

const MOCK_MEMBERS: TeamMember[] = [
  { id: '1', name: 'Alex Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', role: 'Lead', status: 'online' },
  { id: '2', name: 'Sam Wilson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sam', role: 'Developer', status: 'online' },
  { id: '3', name: 'Jordan Lee', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan', role: 'Designer', status: 'away' },
  { id: '4', name: 'Casey Brown', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Casey', role: 'QA', status: 'offline' },
  { id: '5', name: 'Morgan Taylor', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Morgan', role: 'PM', status: 'online' },
]

const MOCK_ACTIVITY: ActivityItem[] = [
  { id: '1', type: 'task_completed', user: 'Alex Johnson', userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', message: 'completed Homepage layout', timestamp: '2 min ago', projectId: '1' },
  { id: '2', type: 'task_created', user: 'Sam Wilson', userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sam', message: 'created API auth flow', timestamp: '15 min ago', projectId: '2' },
  { id: '3', type: 'comment', user: 'Jordan Lee', userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan', message: 'commented on Design system', timestamp: '1 hour ago', projectId: '1' },
  { id: '4', type: 'member_joined', user: 'Morgan Taylor', message: 'joined the project', timestamp: '2 hours ago', projectId: '2' },
  { id: '5', type: 'file_uploaded', user: 'Casey Brown', userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Casey', message: 'uploaded test report', timestamp: '3 hours ago', projectId: '1' },
]

export function TeamDashboardPage() {
  return (
    <TeamDashboard
      projects={MOCK_PROJECTS}
      members={MOCK_MEMBERS}
      activity={MOCK_ACTIVITY}
      onProjectClick={(project) => console.log('Project clicked:', project.name)}
    />
  )
}
