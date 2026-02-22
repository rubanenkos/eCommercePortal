import { Link } from 'react-router-dom'
import { MetricCard } from './MetricCard'
import { ProjectOverview } from './ProjectOverview'
import { TeamMembers } from './TeamMembers'
import { ActivityFeed } from './ActivityFeed'
import { QuickActions } from './QuickActions'
import type { Project } from '../types/project'
import type { TeamMember } from '../types/team'
import type { ActivityItem } from '../types/activity'
import type { QuickAction } from './QuickActions'

function ClipboardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  )
}

function LightningIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  )
}

function FolderIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
  )
}

function PeopleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  )
}

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
  const inProgressTasks = Math.max(0, Math.floor(totalTasks * 0.3))
  const activeProjects = projects.filter((p) => p.status === 'active').length
  const completedProjects = projects.filter((p) => p.status === 'completed').length
  const onlineMembers = members.filter((m) => m.status === 'online').length

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
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" aria-label="Key metrics">
            <MetricCard
              title="Total Tasks"
              value={totalTasks}
              subtitle={`${completedTasks} completed`}
              icon={<ClipboardIcon className="w-6 h-6" />}
              variant="blue"
            />
            <MetricCard
              title="In Progress"
              value={inProgressTasks}
              subtitle="Active tasks"
              icon={<LightningIcon className="w-6 h-6" />}
              variant="yellow"
            />
            <MetricCard
              title="Active Projects"
              value={activeProjects}
              subtitle={`${completedProjects} completed`}
              icon={<FolderIcon className="w-6 h-6" />}
              variant="green"
            />
            <MetricCard
              title="Team Members"
              value={members.length}
              subtitle={`${onlineMembers} online`}
              icon={<PeopleIcon className="w-6 h-6" />}
              variant="purple"
            />
          </section>

          <QuickActions actions={quickActions} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ProjectOverview projects={projects} onProjectClick={onProjectClick} />
            </div>
            <div>
              <TeamMembers members={members} maxDisplay={6} />
            </div>
          </div>

          <ActivityFeed activities={activity} maxItems={5} />
        </div>
      </div>
    </div>
  )
}
