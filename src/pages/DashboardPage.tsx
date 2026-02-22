import { Dashboard } from '../components/Dashboard/Dashboard'

export function DashboardPage() {
  return (
    <Dashboard
      title="Task Dashboard"
      subtitle="Manage your tasks and track progress"
      user={{
        name: 'Alex Johnson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
        email: 'alex@example.com',
      }}
    />
  )
}
