import { Link } from 'react-router-dom'
import { KanbanBoard } from '../components/kanban'
import { DarkModeToggle } from '../components/Dashboard/DarkModeToggle'

export function KanbanBoardPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <nav className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <Link to="/dashboard" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Tasks
            </Link>
            <Link to="/team" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Team
            </Link>
            <Link to="/board" className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Board
            </Link>
            <Link to="/settings" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
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
