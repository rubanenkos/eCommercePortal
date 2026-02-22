import { useNavigate } from 'react-router-dom'
import { KanbanBoard } from '../components/kanban'
import { AppHeader } from '../components/layout/AppHeader'
import { useUser } from '../contexts/UserContext'

export function KanbanBoardPage() {
  const navigate = useNavigate()
  const { user, logout } = useUser()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <AppHeader
        user={user ?? { name: 'Test User', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Test', email: 'test@example.com' }}
        userMenuItems={[
          { label: 'Profile', href: '#' },
          { label: 'Settings', href: '/settings' },
          { divider: true },
          { label: 'Sign out', onClick: () => { logout(); navigate('/login') } },
        ]}
      />
      <KanbanBoard />
    </div>
  )
}
