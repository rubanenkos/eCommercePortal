import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HeaderActions } from '../Dashboard/HeaderActions'
import { NavIcons } from '../shared/NavIcons'
import type { HeaderActionsUser, HeaderActionsDropdownItem, HeaderActionsNotification } from '../Dashboard/HeaderActions'
import { MetricCard } from './MetricCard'
import { ProjectOverview } from './ProjectOverview'
import { TeamMembers } from './TeamMembers'
import { ActivityFeed } from './ActivityFeed'
import { QuickActions } from './QuickActions'
import { ProgressCharts } from './ProgressCharts'
import type { Project } from '../types/project'
import type { TeamMember } from '../types/team'
import type { ActivityItem } from '../types/activity'
import type { ProjectMilestone } from '../types/milestone'
import type { QuickAction } from './QuickActions'
import type { Task } from '../types/dashboard'

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

function MenuIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

export interface TeamDashboardProps {
  projects: Project[]
  members: TeamMember[]
  activity: ActivityItem[]
  milestones?: ProjectMilestone[]
  /** When provided, metrics and progress chart use tasks (from Task Dashboard) */
  tasks?: Task[]
  quickActions?: QuickAction[]
  onProjectClick?: (project: Project) => void
  onMemberMessage?: (member: TeamMember) => void
  /** User info for header (avatar, menu) */
  user?: HeaderActionsUser
  /** Notifications for header */
  notifications?: HeaderActionsNotification[]
  /** User menu items (e.g. Sign out) */
  userMenuItems?: HeaderActionsDropdownItem[]
  /** Callback when notification is clicked */
  onNotificationClick?: (id: string) => void
}

const DEFAULT_QUICK_ACTIONS: QuickAction[] = [
  { id: 'new-task', label: 'New Task', icon: 'add', variant: 'blue', onClick: () => {} },
  { id: 'new-project', label: 'New Project', icon: 'folder', variant: 'green', onClick: () => {} },
  { id: 'invite', label: 'Invite Member', icon: 'people', variant: 'purple', onClick: () => {} },
  { id: 'upload', label: 'Upload File', icon: 'upload', variant: 'orange', onClick: () => {} },
]

const DEFAULT_NOTIFICATIONS: HeaderActionsNotification[] = [
  { id: '1', title: 'Task completed', message: 'Review project proposal was marked as done', time: '2 min ago', read: false },
  { id: '2', title: 'New assignment', message: 'You were assigned to Fix login bug', time: '1 hour ago', read: false },
  { id: '3', title: 'Reminder', message: 'Team standup in 30 minutes', time: '3 hours ago', read: true },
]

export function TeamDashboard({
  projects,
  members,
  activity,
  milestones = [],
  tasks,
  quickActions = DEFAULT_QUICK_ACTIONS,
  onProjectClick,
  onMemberMessage,
  user,
  notifications = DEFAULT_NOTIFICATIONS,
  userMenuItems = [],
  onNotificationClick,
}: TeamDashboardProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setMobileMenuOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const fromTasks = tasks != null && tasks.length > 0
  const totalTasks = fromTasks ? tasks!.length : projects.reduce((s, p) => s + (p.taskCount ?? 0), 0)
  const completedTasks = fromTasks ? tasks!.filter((t) => t.status === 'done').length : projects.reduce((s, p) => s + (p.completedTasks ?? 0), 0)
  const inProgressTasks = fromTasks ? tasks!.filter((t) => t.status === 'in_progress').length : Math.max(0, Math.floor(totalTasks * 0.3))
  const activeProjects = projects.filter((p) => p.status === 'active').length
  const completedProjects = projects.filter((p) => p.status === 'completed').length
  const onlineMembers = members.filter((m) => m.status === 'online').length

  const navLinks = [
    { to: '/dashboard', label: 'Tasks', icon: NavIcons.TaskIcon },
    { to: '/team', label: 'Team', icon: NavIcons.TeamIcon },
    { to: '/board', label: 'Board', icon: NavIcons.BoardIcon },
    { to: '/feed', label: 'Feed', icon: NavIcons.FeedIcon },
    { to: '/settings', label: 'Settings', icon: NavIcons.SettingsIcon },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Mobile menu backdrop */}
      {mobileMenuOpen && (
        <button
          type="button"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close menu"
          className="fixed inset-0 z-30 bg-black/20 dark:bg-black/40 md:hidden"
        />
      )}
      <nav className="sticky top-0 z-40 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex h-14 items-center justify-between gap-4">
          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Open menu"
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden"
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>

          {/* Desktop nav links */}
          <div className="hidden md:flex md:items-center md:gap-6">
            {navLinks.map(({ to, label, icon: Icon }) => {
              const active = location.pathname === to
              return (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center gap-2 text-sm font-medium ${active ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
                >
                  <Icon />
                  {label}
                </Link>
              )
            })}
          </div>

          <HeaderActions
            user={user}
            notifications={notifications}
            userMenuItems={userMenuItems}
            onNotificationClick={onNotificationClick}
          />
        </div>

        {/* Mobile menu panel */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-200 ease-out ${
            mobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="border-t border-gray-200 dark:border-gray-800 py-3 space-y-1">
            {navLinks.map(({ to, label, icon: Icon }) => {
              const active = location.pathname === to
              return (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon />
                  {label}
                </Link>
              )
            })}
          </div>
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

          <ProjectOverview projects={projects} onProjectClick={onProjectClick} />

          <ProgressCharts projects={projects} milestones={milestones} tasks={tasks} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TeamMembers members={members} maxDisplay={6} onMessage={onMemberMessage} />
            <ActivityFeed activities={activity} maxItems={5} />
          </div>
        </div>
      </div>
    </div>
  )
}
