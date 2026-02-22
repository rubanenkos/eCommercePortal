import { Card } from '../shared/Card'
import { ProjectCard } from './ProjectCard'
import type { Project } from '../types/project'

export interface ProjectOverviewProps {
  projects: Project[]
  onProjectClick?: (project: Project) => void
}

export function ProjectOverview({ projects, onProjectClick }: ProjectOverviewProps) {
  return (
    <Card padding="none">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Project Overview</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Track progress across your projects</p>
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
