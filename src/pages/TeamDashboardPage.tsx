import { TeamDashboard } from '../components/TeamDashboard/TeamDashboard'
import type { Project } from '../components/types/project'
import type { TeamMember } from '../components/types/team'
import type { ActivityItem } from '../components/types/activity'
import type { ProjectMilestone } from '../components/types/milestone'

const now = Date.now()
const MOCK_PROJECTS: Project[] = [
  { id: '1', name: 'Website Redesign', description: 'Modernize the company website', progress: 65, status: 'active', dueDate: 'Mar 15', taskCount: 20, completedTasks: 13, overdueTasks: 2, trend: 'up', trendValue: 12, lastUpdated: '2 min ago', lastUpdatedAt: now - 120_000 },
  { id: '2', name: 'Mobile App', description: 'iOS and Android app development', progress: 30, status: 'active', dueDate: 'Apr 30', taskCount: 45, completedTasks: 14, overdueTasks: 3, trend: 'up', trendValue: 5, lastUpdated: '15 min ago', lastUpdatedAt: now - 900_000 },
  { id: '3', name: 'API Integration', description: 'Third-party API integrations', progress: 100, status: 'completed', dueDate: 'Feb 10', taskCount: 8, completedTasks: 8, trend: 'stable', lastUpdated: '1 hour ago', lastUpdatedAt: now - 3_600_000 },
  { id: '4', name: 'Q4 Marketing', description: 'Campaign planning and execution', progress: 15, status: 'on_hold', dueDate: 'May 1', taskCount: 12, completedTasks: 2, trend: 'down', trendValue: 3, lastUpdated: '2 hours ago', lastUpdatedAt: now - 7_200_000 },
]

const MOCK_MEMBERS: TeamMember[] = [
  { id: '1', name: 'Alex Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', role: 'Lead', status: 'online', email: 'alex@example.com' },
  { id: '2', name: 'Sam Wilson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sam', role: 'Developer', status: 'online', email: 'sam@example.com' },
  { id: '3', name: 'Jordan Lee', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan', role: 'Designer', status: 'away', email: 'jordan@example.com' },
  { id: '4', name: 'Casey Brown', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Casey', role: 'QA', status: 'offline', email: 'casey@example.com' },
  { id: '5', name: 'Morgan Taylor', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Morgan', role: 'PM', status: 'online', email: 'morgan@example.com' },
]

const MOCK_MILESTONES: ProjectMilestone[] = [
  { id: 'm1', name: 'Design Review', projectId: '1', projectName: 'Website Redesign', date: 'Mar 10', dateSort: '2025-03-10', status: 'completed' },
  { id: 'm2', name: 'Launch', projectId: '1', projectName: 'Website Redesign', date: 'Mar 15', dateSort: '2025-03-15', status: 'upcoming' },
  { id: 'm3', name: 'Alpha Release', projectId: '2', projectName: 'Mobile App', date: 'Apr 15', dateSort: '2025-04-15', status: 'upcoming' },
  { id: 'm4', name: 'API Integration', projectId: '3', projectName: 'API Integration', date: 'Feb 10', dateSort: '2025-02-10', status: 'completed' },
  { id: 'm5', name: 'Campaign Kickoff', projectId: '4', projectName: 'Q4 Marketing', date: 'May 1', dateSort: '2025-05-01', status: 'upcoming' },
  { id: 'm6', name: 'Sprint Planning', projectId: '4', projectName: 'Q4 Marketing', date: 'Feb 20', dateSort: '2025-02-20', status: 'overdue' },
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
      milestones={MOCK_MILESTONES}
      onProjectClick={(project) => console.log('Project clicked:', project.name)}
      onMemberMessage={(member) => console.log('Message:', member.name)}
    />
  )
}
