import { useNavigate } from 'react-router-dom'
import { TeamDashboard } from '../components/TeamDashboard/TeamDashboard'
import { useUser } from '../contexts/UserContext'
import { useTasks } from '../contexts/TasksContext'
import { useActivity } from '../contexts/ActivityContext'
import { useTeam } from '../contexts/TeamContext'
import type { Project } from '../components/types/project'
import type { ProjectMilestone } from '../components/types/milestone'

const now = Date.now()
const MOCK_PROJECTS: Project[] = [
  { id: '1', name: 'Website Redesign', description: 'Modernize the company website', progress: 65, status: 'active', dueDate: 'Mar 15', taskCount: 20, completedTasks: 13, overdueTasks: 2, trend: 'up', trendValue: 12, lastUpdated: '2 min ago', lastUpdatedAt: now - 120_000 },
  { id: '2', name: 'Mobile App', description: 'iOS and Android app development', progress: 30, status: 'active', dueDate: 'Apr 30', taskCount: 45, completedTasks: 14, overdueTasks: 3, trend: 'up', trendValue: 5, lastUpdated: '15 min ago', lastUpdatedAt: now - 900_000 },
  { id: '3', name: 'API Integration', description: 'Third-party API integrations', progress: 100, status: 'completed', dueDate: 'Feb 10', taskCount: 8, completedTasks: 8, trend: 'stable', lastUpdated: '1 hour ago', lastUpdatedAt: now - 3_600_000 },
  { id: '4', name: 'Q4 Marketing', description: 'Campaign planning and execution', progress: 15, status: 'on_hold', dueDate: 'May 1', taskCount: 12, completedTasks: 2, trend: 'down', trendValue: 3, lastUpdated: '2 hours ago', lastUpdatedAt: now - 7_200_000 },
]

const MOCK_MILESTONES: ProjectMilestone[] = [
  { id: 'm1', name: 'Design Review', projectId: '1', projectName: 'Website Redesign', date: 'Mar 10', dateSort: '2025-03-10', status: 'completed' },
  { id: 'm2', name: 'Launch', projectId: '1', projectName: 'Website Redesign', date: 'Mar 15', dateSort: '2025-03-15', status: 'upcoming' },
  { id: 'm3', name: 'Alpha Release', projectId: '2', projectName: 'Mobile App', date: 'Apr 15', dateSort: '2025-04-15', status: 'upcoming' },
  { id: 'm4', name: 'API Integration', projectId: '3', projectName: 'API Integration', date: 'Feb 10', dateSort: '2025-02-10', status: 'completed' },
  { id: 'm5', name: 'Campaign Kickoff', projectId: '4', projectName: 'Q4 Marketing', date: 'May 1', dateSort: '2025-05-01', status: 'upcoming' },
  { id: 'm6', name: 'Sprint Planning', projectId: '4', projectName: 'Q4 Marketing', date: 'Feb 20', dateSort: '2025-02-20', status: 'overdue' },
]

export function TeamDashboardPage() {
  const navigate = useNavigate()
  const { user, logout } = useUser()
  const { tasks } = useTasks()
  const { activity } = useActivity()
  const { members, addMember } = useTeam()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleInviteMember = () => {
    const name = `New Member ${members.length + 1}`
    addMember({
      name,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
      role: 'Member',
      status: 'offline',
      email: `member${members.length + 1}@example.com`,
    })
  }

  return (
    <TeamDashboard
      projects={MOCK_PROJECTS}
      members={members}
      activity={activity}
      tasks={tasks}
      milestones={MOCK_MILESTONES}
      user={user ?? {
        name: 'Test User',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Test',
        email: 'test@example.com',
      }}
      userMenuItems={[
        { label: 'Profile', href: '#' },
        { label: 'Settings', href: '/settings' },
        { divider: true },
        { label: 'Sign out', onClick: handleLogout },
      ]}
      quickActions={[
        { id: 'new-task', label: 'New Task', icon: 'add', variant: 'blue', onClick: () => {}, href: '/dashboard' },
        { id: 'new-project', label: 'New Project', icon: 'folder', variant: 'green', onClick: () => {} },
        { id: 'invite', label: 'Invite Member', icon: 'people', variant: 'purple', onClick: handleInviteMember },
        { id: 'upload', label: 'Upload File', icon: 'upload', variant: 'orange', onClick: () => {} },
      ]}
      onProjectClick={(project) => console.log('Project clicked:', project.name)}
      onMemberMessage={(member) => console.log('Message:', member.name)}
    />
  )
}
