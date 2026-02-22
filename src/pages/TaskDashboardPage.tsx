import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Dashboard, Button } from '../components'
import type { Task } from '../components/types/dashboard'

const INITIAL_TASKS: Task[] = [
  { id: '1', title: 'Review project proposal', description: 'Check the Q4 budget', status: 'in_progress', priority: 'high', dueDate: 'Feb 25' },
  { id: '2', title: 'Update documentation', description: 'Add API changes', status: 'todo', priority: 'medium', dueDate: 'Feb 28' },
  { id: '3', title: 'Team standup prep', description: 'Prepare agenda', status: 'done', priority: 'low', dueDate: 'Feb 22' },
  { id: '4', title: 'Fix login bug', description: 'Session timeout on mobile', status: 'in_progress', priority: 'high', dueDate: 'Feb 24' },
]

export function TaskDashboardPage() {
  const navigate = useNavigate()
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [newTaskTitle, setNewTaskTitle] = useState('')

  const handleStatusChange = (taskId: string, status: Task['status']) => {
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, status } : t)))
  }

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId))
  }

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTaskTitle.trim()) return
    setTasks((prev) => [
      ...prev,
      { id: String(Date.now()), title: newTaskTitle.trim(), status: 'todo' },
    ])
    setNewTaskTitle('')
  }

  const handleLogout = () => {
    sessionStorage.removeItem('auth')
    sessionStorage.removeItem('user')
    navigate('/login')
  }

  const filteredTasks = tasks.filter((t) => {
    const matchesSearch = !searchQuery || t.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <Dashboard
      title="Task Dashboard"
      subtitle="Manage your tasks"
      user={{
        name: 'Test User',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Test',
        email: 'test@example.com',
      }}
      tasks={filteredTasks}
      onDeleteTask={handleDeleteTask}
      onTaskStatusChange={handleStatusChange}
      beforeTaskList={
        <>
          <form onSubmit={handleAddTask} className="mb-4 flex gap-2" data-testid="add-task-form">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="New task title"
              aria-label="New task title"
              data-testid="new-task-input"
              className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white"
            />
            <Button type="submit" data-testid="add-task-button">Add task</Button>
          </form>
          <div className="mb-4 flex flex-wrap gap-2">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks"
              aria-label="Search tasks"
              data-testid="task-search"
              className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="Filter by status"
              data-testid="task-filter"
              className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white"
            >
              <option value="all">All</option>
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
        </>
      }
      navItems={[
        { label: 'Home', href: '/dashboard' },
        { label: 'Tasks', href: '/dashboard' },
        { label: 'Settings', href: '/settings' },
      ]}
      userMenuItems={[
        { label: 'Profile', href: '#' },
        { label: 'Settings', href: '/settings' },
        { divider: true },
        { label: 'Sign out', onClick: handleLogout },
      ]}
    />
  )
}
