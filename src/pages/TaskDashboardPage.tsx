import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Dashboard, Button } from '../components'
import { useUser } from '../contexts/UserContext'
import { useTasks } from '../contexts/TasksContext'
import type { Task } from '../components/types/dashboard'

export function TaskDashboardPage() {
  const navigate = useNavigate()
  const { user, logout } = useUser()
  const { tasks, updateTaskStatus, addTask, deleteTask } = useTasks()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [newTaskTitle, setNewTaskTitle] = useState('')

  const handleStatusChange = (taskId: string, status: Task['status']) => {
    updateTaskStatus(taskId, status)
  }

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId)
  }

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTaskTitle.trim()) return
    addTask({ title: newTaskTitle.trim(), status: 'todo' })
    setNewTaskTitle('')
  }

  const handleLogout = () => {
    logout()
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
      user={user ?? {
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
        { label: 'Team', href: '/team' },
        { label: 'Board', href: '/board' },
        { label: 'Feed', href: '/feed' },
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
