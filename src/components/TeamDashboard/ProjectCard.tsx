import { Card } from '../shared/Card'
import { Badge } from '../shared/Badge'
import type { Project } from '../types/project'

export interface ProjectCardProps {
  project: Project
  onClick?: () => void
}

const statusVariant = {
  active: 'success' as const,
  on_hold: 'warning' as const,
  completed: 'info' as const,
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <Card
      padding="md"
      className="cursor-pointer hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-gray-900 dark:text-white truncate">{project.name}</h3>
          {project.description && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{project.description}</p>
          )}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Badge variant={statusVariant[project.status]} size="sm">
              {project.status.replace('_', ' ')}
            </Badge>
            {project.dueDate && (
              <span className="text-xs text-gray-500 dark:text-gray-400">Due {project.dueDate}</span>
            )}
          </div>
        </div>
        <div className="shrink-0 text-right">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">{project.progress}%</span>
          <p className="text-xs text-gray-500 dark:text-gray-400">complete</p>
        </div>
      </div>
      <div className="mt-4">
        <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
          <div
            className="h-full rounded-full bg-blue-500 transition-all duration-500"
            style={{ width: `${project.progress}%` }}
          />
        </div>
        {project.taskCount != null && (
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {project.completedTasks ?? 0} / {project.taskCount} tasks
          </p>
        )}
      </div>
    </Card>
  )
}
