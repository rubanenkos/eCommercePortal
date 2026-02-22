import { useState, useRef, useEffect } from 'react'

export interface HeaderUser {
  name: string
  avatar: string
  email?: string
}

export interface HeaderDropdownItem {
  label?: string
  href?: string
  onClick?: () => void
  divider?: boolean
}

export interface NotificationItem {
  id: string
  title: string
  message?: string
  time?: string
  read?: boolean
}

export interface HeaderProps {
  /** Page or section title */
  title: string
  /** Optional subtitle */
  subtitle?: string
  /** User info for menu */
  user?: HeaderUser
  /** Dropdown menu items */
  userMenuItems?: HeaderDropdownItem[]
  /** Notifications to display */
  notifications?: NotificationItem[]
  /** Callback when notification is clicked */
  onNotificationClick?: (id: string) => void
  /** Slot for actions (e.g. DarkModeToggle, add task button) */
  actions?: React.ReactNode
  /** Callback to open mobile sidebar */
  onMenuClick?: () => void
}

export function Header({
  title,
  subtitle,
  user,
  userMenuItems = [],
  notifications = [],
  onNotificationClick,
  actions,
  onMenuClick,
}: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const notificationsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        setIsDropdownOpen(false)
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(target)
      ) {
        setIsNotificationsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false)
        setIsNotificationsOpen(false)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  return (
    <header
      className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm px-4 lg:px-6"
      aria-label="Page header"
    >
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open menu"
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 sm:hidden"
        >
          <MenuIcon />
        </button>
        <div>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {actions}
        {notifications.length > 0 && (
          <div className="relative" ref={notificationsRef}>
            <button
              type="button"
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              aria-expanded={isNotificationsOpen}
              aria-haspopup="true"
              aria-label={`Notifications${notifications.filter((n) => !n.read).length > 0 ? `, ${notifications.filter((n) => !n.read).length} unread` : ''}`}
              className="relative rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              <BellIcon />
              {notifications.filter((n) => !n.read).length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {notifications.filter((n) => !n.read).length}
                </span>
              )}
            </button>
            {isNotificationsOpen && (
              <div
                className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg"
                role="menu"
              >
                <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Notifications
                  </h3>
                </div>
                <div className="py-1">
                  {notifications.map((n) => (
                    <button
                      key={n.id}
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        onNotificationClick?.(n.id)
                        setIsNotificationsOpen(false)
                      }}
                      className={`block w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${!n.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}
                    >
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {n.title}
                      </p>
                      {n.message && (
                        <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                          {n.message}
                        </p>
                      )}
                      {n.time && (
                        <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                          {n.time}
                        </p>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        {user && (
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
              aria-label="User menu"
              className="flex items-center gap-2 rounded-full p-1 hover:ring-2 hover:ring-gray-200 dark:hover:ring-gray-700 transition-all"
            >
              <img
                src={user.avatar}
                alt=""
                className="w-8 h-8 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700"
              />
            </button>
            {isDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-48 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg"
                role="menu"
              >
                <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {user.name}
                  </p>
                  {user.email && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {user.email}
                    </p>
                  )}
                </div>
                {userMenuItems.map((item, index) => (
                  <div key={index}>
                    {item.divider ? (
                      <div className="my-1 border-t border-gray-200 dark:border-gray-700" />
                    ) : item.href ? (
                      <a
                        href={item.href}
                        role="menuitem"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          item.onClick?.()
                          setIsDropdownOpen(false)
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        {item.label}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}

function MenuIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

function BellIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  )
}
