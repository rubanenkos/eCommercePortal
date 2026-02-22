import { SettingsPanel } from '../components'

export function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-2xl mx-auto">
        <SettingsPanel
          onSave={(data) => console.log('Saved:', data)}
          onCancel={() => console.log('Cancelled')}
        />
      </div>
    </div>
  )
}
