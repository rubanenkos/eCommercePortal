import { Link } from 'react-router-dom'
import { ProjectOverview } from './ProjectOverview'
import { TeamMembers } from './TeamMembers'
import { ProgressChart } from './ProgressChart'
import { ActivityFeed } from './ActivityFeed'
import { QuickActions } from './QuickActions'
import type { Project } from '../types/project'
import type { TeamMember } from '../types/team'
import type { ActivityItem } from '../types/activity'
import type { QuickAction } from './QuickActions'

export interface TeamDashboardProps {
  projects: Project[]
  members: TeamMember[]
  activity: ActivityItem[]
  quickActions?: QuickAction[]
  onProjectClick?: (project: Project) => void
}

const DEFAULT_QUICK_ACTIONS: QuickAction[] = [
  { id: 'add-task', label: 'Add Task', icon: 'task', onClick: () => {} },
  { id: 'new-project', label: 'New Project', icon: 'add', onClick: () => {} },
  { id: 'invite', label: 'Invite Member', icon: 'user', onClick: () => {} },
  { id: 'reports', label: 'Reports', icon: 'chart', onClick: () => {} },
]

export function TeamDashboard({
  projects,
  members,
  activity,
  quickActions = DEFAULT_QUICK_ACTIONS,
  onProjectClick,
}: TeamDashboardProps) {

  const totalTasks = projects.reduce((s, p) => s + (p.taskCount ?? 0), 0)
  const completedTasks = projects.reduce((s, p) => s + (p.completedTasks ?? 0), 0)
  const todoTasks = totalTasks - completedTasks
  const inProgressTasks = Math.max(0, Math.floor(completedTasks * 0.3))

  const progressData = [
    { label: 'To Do', value: todoTasks },
    { label: 'In Progress', value: inProgressTasks },
    { label: 'Done', value: completedTasks },
  ].filter((d) => d.value > 0)

  const chartData = progressData.length > 0 ? progressData : [{ label: 'No tasks yet', value: 1 }]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <nav className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center gap-6">
          <Link to="/dashboard" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
            Tasks
          </Link>
          <Link to="/team" className="text-sm font-medium text-blue-600 dark:text-blue-400">
            Team
          </Link>
          <Link to="/settings" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
            Settings
          </Link>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Team Dashboard
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Collaborate and track progress across your projects
          </p>
        </header>

        <div className="space-y-6">
          <QuickActions actions={quickActions} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ProjectOverview projects={projects} onProjectClick={onProjectClick} />
            </div>
            <div>
              <TeamMembers members={members} maxDisplay={6} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ProgressChart data={chartData} title="Task Progress" />
            </div>
            <div>
              <ActivityFeed activities={activity} maxItems={5} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
