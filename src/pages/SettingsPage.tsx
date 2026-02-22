import { useNavigate } from 'react-router-dom'
import { SettingsPanel } from '../components'
import { AppHeader } from '../components/layout/AppHeader'
import { useUser } from '../contexts/UserContext'

export function SettingsPage() {
  const navigate = useNavigate()
  const { user, logout } = useUser()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <AppHeader
        user={user ?? { name: 'Test User', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Test', email: 'test@example.com' }}
        userMenuItems={[
          { label: 'Profile', href: '#' },
          { label: 'Settings', href: '/settings' },
          { divider: true },
          { label: 'Sign out', onClick: () => { logout(); navigate('/login') } },
        ]}
      />
      <main id="main-content" className="w-full max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <SettingsPanel
          onSave={(data) => console.log('Saved:', data)}
          onCancel={() => console.log('Cancelled')}
        />
      </main>
    </div>
  )
}
