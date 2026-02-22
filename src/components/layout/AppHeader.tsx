import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HeaderActions } from '../Dashboard/HeaderActions'
import { NavIcons } from '../shared/NavIcons'
import type { HeaderActionsUser, HeaderActionsDropdownItem, HeaderActionsNotification } from '../Dashboard/HeaderActions'

const DEFAULT_NOTIFICATIONS: HeaderActionsNotification[] = [
  { id: '1', title: 'Task completed', message: 'Review project proposal was marked as done', time: '2 min ago', read: false },
  { id: '2', title: 'New assignment', message: 'You were assigned to Fix login bug', time: '1 hour ago', read: false },
  { id: '3', title: 'Reminder', message: 'Team standup in 30 minutes', time: '3 hours ago', read: true },
]

function MenuIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

const NAV_LINKS = [
  { to: '/team', label: 'Team', icon: NavIcons.TeamIcon },
  { to: '/board', label: 'Board', icon: NavIcons.BoardIcon },
  { to: '/dashboard', label: 'Tasks', icon: NavIcons.TaskIcon },
  { to: '/feed', label: 'Feed', icon: NavIcons.FeedIcon },
]

export interface AppHeaderProps {
  user?: HeaderActionsUser
  notifications?: HeaderActionsNotification[]
  userMenuItems?: HeaderActionsDropdownItem[]
  onNotificationClick?: (id: string) => void
}

export function AppHeader({
  user,
  notifications = DEFAULT_NOTIFICATIONS,
  userMenuItems = [],
  onNotificationClick,
}: AppHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setMobileMenuOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  return (
    <>
      <a
        href="#main-content"
        className="fixed top-0 left-4 -translate-y-full focus:translate-y-0 focus:top-4 focus:z-[100] px-4 py-2 bg-blue-600 text-white rounded-lg no-underline transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
      >
        Skip to main content
      </a>
      {/* Mobile menu backdrop */}
      {mobileMenuOpen && (
        <button
          type="button"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close menu"
          className="fixed inset-0 z-30 bg-black/20 dark:bg-black/40 md:hidden"
        />
      )}
      <nav
        className="sticky top-0 z-40 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <div className="flex h-14 items-center justify-between gap-4">
          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Open menu"
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden"
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>

          {/* Desktop nav links */}
          <div className="hidden md:flex md:items-center md:gap-6">
            {NAV_LINKS.map(({ to, label, icon: Icon }) => {
              const active = location.pathname === to
              return (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center gap-2 text-sm font-medium ${
                    active
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Icon />
                  {label}
                </Link>
              )
            })}
          </div>

          <HeaderActions
            user={user}
            notifications={notifications}
            userMenuItems={userMenuItems}
            onNotificationClick={onNotificationClick}
          />
        </div>

        {/* Mobile menu panel */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-200 ease-out ${
            mobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="border-t border-gray-200 dark:border-gray-800 py-3 space-y-1">
            {NAV_LINKS.map(({ to, label, icon: Icon }) => {
              const active = location.pathname === to
              return (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon />
                  {label}
                </Link>
              )
            })}
          </div>
        </div>
      </nav>
    </>
  )
}
