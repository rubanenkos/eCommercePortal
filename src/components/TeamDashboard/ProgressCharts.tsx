import { Card } from '../shared/Card'
import { ProgressChart } from './ProgressChart'
import type { Project } from '../types/project'
import type { ProjectMilestone } from '../types/milestone'
import type { Task } from '../types/dashboard'

export interface ProgressChartsProps {
  projects: Project[]
  milestones: ProjectMilestone[]
  /** When provided, stats and progress chart use tasks instead of projects */
  tasks?: Task[]
}

export function ProgressCharts({ projects, milestones, tasks }: ProgressChartsProps) {
  const fromTasks = tasks != null && tasks.length > 0
  const totalTasks = fromTasks
    ? tasks!.length
    : projects.reduce((s, p) => s + (p.taskCount ?? 0), 0)
  const completedTasks = fromTasks
    ? tasks!.filter((t) => t.status === 'done').length
    : projects.reduce((s, p) => s + (p.completedTasks ?? 0), 0)
  const inProgressTasks = fromTasks
    ? tasks!.filter((t) => t.status === 'in_progress').length
    : Math.min(Math.max(0, Math.floor((totalTasks - completedTasks) * 0.7)), Math.max(0, totalTasks - completedTasks))
  const overdueTasks = fromTasks ? 0 : projects.reduce((s, p) => s + (p.overdueTasks ?? 0), 0)
  const todoTasks = fromTasks
    ? tasks!.filter((t) => t.status === 'todo').length
    : Math.max(0, totalTasks - completedTasks - inProgressTasks - overdueTasks)

  const taskData = [
    { label: 'Todo', value: todoTasks },
    { label: 'In Progress', value: inProgressTasks },
    { label: 'Completed', value: completedTasks },
    { label: 'Overdue', value: overdueTasks },
  ].filter((d) => d.value > 0)

  const chartData = taskData.length > 0 ? taskData : [{ label: 'No tasks yet', value: 1 }]

  const sortedMilestones = [...milestones].sort((a, b) => a.dateSort.localeCompare(b.dateSort))

  return (
    <section className="space-y-6" aria-label="Progress charts">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Progress Charts</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProgressChart
          data={chartData}
          title="Overall Progress"
          completedLabel={String(completedTasks)}
          totalLabel={String(totalTasks)}
        />
        </div>
        <div>
          <ProjectMilestones milestones={milestones} />
        </div>
      </div>

      <TimelineView milestones={sortedMilestones} />
    </section>
  )
}

function ProjectMilestones({ milestones }: { milestones: ProjectMilestone[] }) {
  const statusConfig = {
    completed: { label: 'Completed', className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300' },
    upcoming: { label: 'Upcoming', className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300' },
    overdue: { label: 'Overdue', className: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300' },
  }
  return (
    <Card padding="md">
      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">Project Milestones</h3>
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {milestones.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">No milestones</p>
        ) : (
          milestones.map((m) => (
            <div key={m.id} className="flex items-start justify-between gap-2 py-1.5 border-b border-gray-100 dark:border-gray-800 last:border-0">
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{m.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{m.projectName} · {m.date}</p>
              </div>
              <span className={`shrink-0 px-2 py-0.5 text-xs font-medium rounded-full ${statusConfig[m.status].className}`}>
                {statusConfig[m.status].label}
              </span>
            </div>
          ))
        )}
      </div>
    </Card>
  )
}

function TimelineView({ milestones }: { milestones: ProjectMilestone[] }) {
  if (milestones.length === 0) return null

  const statusDot = {
    completed: 'bg-emerald-500',
    upcoming: 'bg-blue-500',
    overdue: 'bg-red-500',
  }

  return (
    <Card padding="md">
      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Timeline View</h3>
      <div className="relative">
        <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" aria-hidden />
        <div className="space-y-4">
          {milestones.map((m) => (
            <div key={m.id} className="relative flex items-start gap-4 pl-10">
              <span
                className={`absolute left-1.5 top-1.5 w-3 h-3 rounded-full ring-4 ring-white dark:ring-gray-800 ${statusDot[m.status]}`}
                aria-hidden
              />
              <div className="flex-1 min-w-0 pt-0.5">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{m.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{m.projectName}</p>
              </div>
              <span className="shrink-0 text-sm font-medium text-gray-600 dark:text-gray-400">{m.date}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
