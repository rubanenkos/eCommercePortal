import { useState } from 'react'
import type { DashboardNavItem } from '../types/dashboard'

export interface SidebarProps {
  navItems: DashboardNavItem[]
  activeLink?: string
  /** Logo or brand element */
  logo?: React.ReactNode
  /** Controlled open state for mobile (< 640px) */
  isOpen?: boolean
  /** Callback when sidebar should close (mobile overlay/close button) */
  onClose?: () => void
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  )
}

function TaskIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  )
}

function ChartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  )
}

function SettingsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

function TeamIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  )
}

function BoardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
    </svg>
  )
}

function FeedIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4" />
    </svg>
  )
}

const defaultIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  home: HomeIcon,
  tasks: TaskIcon,
  team: TeamIcon,
  board: BoardIcon,
  feed: FeedIcon,
  dashboard: ChartIcon,
  settings: SettingsIcon,
}

export function Sidebar({
  navItems,
  activeLink,
  logo,
  isOpen: controlledIsOpen,
  onClose,
}: SidebarProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const isOpen = controlledIsOpen ?? internalOpen
  const handleClose = () => {
    setInternalOpen(false)
    onClose?.()
  }

  return (
    <>
      {/* Mobile overlay - only < 640px (sm) */}
      {isOpen && (
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close sidebar"
          className="fixed inset-0 z-40 bg-black/50 sm:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-full border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-all duration-300 ease-in-out
          sm:translate-x-0 sm:static sm:z-auto
          sm:w-20 sm:px-0
          lg:w-64 lg:px-4
          ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64'}`}
        aria-label="Sidebar navigation"
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between border-b border-gray-200 dark:border-gray-700 px-4 sm:px-2 sm:justify-center lg:px-4 lg:justify-between">
            <span className="font-bold text-gray-900 dark:text-white sm:hidden lg:inline">
              {logo ?? 'Tasks'}
            </span>
            <span className="hidden sm:inline lg:hidden text-lg font-bold text-gray-900 dark:text-white" title="Tasks">
              T
            </span>
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close sidebar"
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 sm:hidden"
            >
              <CloseIcon />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto p-4 sm:p-2 lg:p-4" aria-label="Main">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive = activeLink !== undefined && item.href === activeLink
                const IconComponent = item.icon
                  ? undefined
                  : defaultIcons[item.label.toLowerCase()]
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={isActive ? 'page' : undefined}
                      title={item.label}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors
                        sm:justify-center sm:px-2 sm:py-3
                        lg:justify-start lg:px-3 lg:py-2.5
                        ${
                        isActive
                          ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      {item.icon ?? (IconComponent && <IconComponent className="w-5 h-5 shrink-0" />)}
                      <span className="sm:hidden lg:inline">{item.label}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  )
}

function CloseIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}
