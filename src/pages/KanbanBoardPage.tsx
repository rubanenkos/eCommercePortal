import { Link } from 'react-router-dom'
import { KanbanBoard } from '../components/kanban'
import { DarkModeToggle } from '../components/Dashboard/DarkModeToggle'
import { NavIcons } from '../components/shared/NavIcons'

export function KanbanBoardPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <nav className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <Link to="/dashboard" className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <NavIcons.TaskIcon />
              Tasks
            </Link>
            <Link to="/team" className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <NavIcons.TeamIcon />
              Team
            </Link>
            <Link to="/board" className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400">
              <NavIcons.BoardIcon />
              Board
            </Link>
            <Link to="/feed" className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <NavIcons.FeedIcon />
              Feed
            </Link>
            <Link to="/settings" className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <NavIcons.SettingsIcon />
              Settings
            </Link>
          </div>
          <DarkModeToggle />
        </div>
      </nav>
      <KanbanBoard />
    </div>
  )
}
