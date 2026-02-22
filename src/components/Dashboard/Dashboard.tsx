import { useState, useEffect } from 'react'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { TaskCard } from './TaskCard'
import { StatWidget } from './StatWidget'
import { DarkModeToggle } from './DarkModeToggle'
import type { Task, DashboardNavItem, StatWidgetData } from '../types/dashboard'
import type { NotificationItem } from './Header'

export interface DashboardProps {
  /** Navigation items for sidebar */
  navItems?: DashboardNavItem[]
  /** Tasks to display */
  tasks?: Task[]
  /** Statistics for widgets */
  stats?: StatWidgetData[]
  /** User info for header */
  user?: {
    name: string
    avatar: string
    email?: string
  }
  /** Notifications for header */
  notifications?: NotificationItem[]
  /** User menu items (e.g. Sign out) */
  userMenuItems?: { label?: string; href?: string; onClick?: () => void; divider?: boolean }[]
  /** Callback when task is deleted */
  onDeleteTask?: (taskId: string) => void
  /** Callback when task status changes */
  onTaskStatusChange?: (taskId: string, status: Task['status']) => void
  /** Slot before task list (add task form, filters) */
  beforeTaskList?: React.ReactNode
  /** Header title */
  title?: string
  /** Header subtitle */
  subtitle?: string
}

const DEFAULT_NAV_ITEMS: DashboardNavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Tasks', href: '#tasks' },
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Settings', href: '#settings' },
]

const DEFAULT_TASKS: Task[] = [
  {
    id: '1',
    title: 'Review project proposal',
    description: 'Check the Q4 budget allocation and timeline',
    status: 'in_progress',
    priority: 'high',
    dueDate: 'Feb 25',
  },
  {
    id: '2',
    title: 'Update documentation',
    description: 'Add API changes to the developer guide',
    status: 'todo',
    priority: 'medium',
    dueDate: 'Feb 28',
  },
  {
    id: '3',
    title: 'Team standup prep',
    description: 'Prepare agenda and blockers list',
    status: 'done',
    priority: 'low',
    dueDate: 'Feb 22',
  },
  {
    id: '4',
    title: 'Fix login bug',
    description: 'Users report session timeout on mobile',
    status: 'in_progress',
    priority: 'high',
    dueDate: 'Feb 24',
  },
]

const DEFAULT_STATS: StatWidgetData[] = [
  { label: 'Total Tasks', value: 24, change: '+3 from last week', changeType: 'positive' },
  { label: 'In Progress', value: 8, change: '2 completed today', changeType: 'neutral' },
  { label: 'Completed', value: 156, change: '+12% this month', changeType: 'positive' },
]

const DEFAULT_NOTIFICATIONS: NotificationItem[] = [
  { id: '1', title: 'Task completed', message: 'Review project proposal was marked as done', time: '2 min ago', read: false },
  { id: '2', title: 'New assignment', message: 'You were assigned to Fix login bug', time: '1 hour ago', read: false },
  { id: '3', title: 'Reminder', message: 'Team standup in 30 minutes', time: '3 hours ago', read: true },
]

function TasksIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  )
}

function ChartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

export function Dashboard({
  navItems = DEFAULT_NAV_ITEMS,
  tasks = DEFAULT_TASKS,
  stats = DEFAULT_STATS,
  user,
  notifications = DEFAULT_NOTIFICATIONS,
  userMenuItems,
  onDeleteTask,
  onTaskStatusChange,
  beforeTaskList,
  title = 'Dashboard',
  subtitle = 'Manage your tasks and track progress',
}: DashboardProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [taskList, setTaskList] = useState<Task[]>(tasks)

  useEffect(() => {
    setTaskList(tasks)
  }, [tasks])

  const handleTaskStatusChange = (taskId: string, status: Task['status']) => {
    setTaskList((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status } : t))
    )
    onTaskStatusChange?.(taskId, status)
  }

  const statIcons = [TasksIcon, ChartIcon, CheckIcon]

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <Sidebar
        navItems={navItems}
        activeLink="#tasks"
        logo={<span className="font-bold text-gray-900 dark:text-white">Tasks</span>}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex flex-1 flex-col min-w-0">
        <Header
          title={title}
          subtitle={subtitle}
          user={user}
          notifications={notifications}
          onMenuClick={() => setSidebarOpen(true)}
          userMenuItems={userMenuItems ?? [
            { label: 'Profile', href: '#' },
            { label: 'Settings', href: '#' },
            { divider: true },
            { label: 'Sign out', onClick: () => {} },
          ]}
          actions={<DarkModeToggle />}
        />

        <main className="flex-1 p-4 lg:p-6" id="main-content">
          {/* Stats */}
          <section
            className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            aria-label="Statistics"
          >
            {stats.map((stat, index) => {
              const IconComponent = statIcons[index]
              return (
                <StatWidget
                  key={stat.label}
                  {...stat}
                  icon={IconComponent ? <IconComponent className="w-5 h-5" /> : undefined}
                  live
                />
              )
            })}
          </section>

          {/* Tasks */}
          <section aria-labelledby="tasks-heading" data-testid="task-list">
            <h2
              id="tasks-heading"
              className="mb-4 text-lg font-semibold text-gray-900 dark:text-white"
            >
              Recent Tasks
            </h2>
            {beforeTaskList}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {taskList.map((task) => (
                <TaskCard
                  key={task.id}
                  {...task}
                  onStatusChange={handleTaskStatusChange}
                  onDelete={onDeleteTask}
                />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
