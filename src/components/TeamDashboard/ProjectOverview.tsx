import { Card } from '../shared/Card'
import { ProjectCard } from './ProjectCard'
import type { Project } from '../types/project'

export interface ProjectOverviewProps {
  projects: Project[]
  onProjectClick?: (project: Project) => void
}

function getLatestUpdate(projects: Project[]): string | null {
  const withTimestamp = projects.filter((p) => p.lastUpdated != null)
  if (withTimestamp.length === 0) return null
  const latest = withTimestamp.sort((a, b) => (b.lastUpdatedAt ?? 0) - (a.lastUpdatedAt ?? 0))[0]
  return latest.lastUpdated ?? null
}

export function ProjectOverview({ projects, onProjectClick }: ProjectOverviewProps) {
  const lastUpdated = getLatestUpdate(projects)
  return (
    <Card padding="none">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Project Overview</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Track progress across your projects</p>
        </div>
        <div className="flex items-center gap-2" aria-label="Real-time metrics">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Live
          </span>
          {lastUpdated && (
            <span className="text-xs text-gray-500 dark:text-gray-400">Updated {lastUpdated}</span>
          )}
        </div>
      </div>
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => onProjectClick?.(project)}
          />
        ))}
      </div>
    </Card>
  )
}
