import { Link } from 'react-router-dom'
import { SettingsPanel } from '../components'

export function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <nav className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center gap-6">
          <Link to="/dashboard" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
            Tasks
          </Link>
          <Link to="/team" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
            Team
          </Link>
          <Link to="/settings" className="text-sm font-medium text-blue-600 dark:text-blue-400">
            Settings
          </Link>
        </div>
      </nav>
      <div className="w-full max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <SettingsPanel
          onSave={(data) => console.log('Saved:', data)}
          onCancel={() => console.log('Cancelled')}
        />
      </div>
    </div>
  )
}
