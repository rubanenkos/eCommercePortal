import { Link } from 'react-router-dom'

export type QuickActionVariant = 'blue' | 'green' | 'purple' | 'orange'

export interface QuickAction {
  id: string
  label: string
  icon: string | React.ReactNode
  variant?: QuickActionVariant
  onClick?: () => void
  href?: string
}

export interface QuickActionsProps {
  actions: QuickAction[]
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  )
}

function FolderIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
  )
}

function PeopleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  )
}

function UploadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
  )
}

const defaultIcons: Record<string, React.ReactNode> = {
  add: <PlusIcon className="w-8 h-8" />,
  folder: <FolderIcon className="w-8 h-8" />,
  people: <PeopleIcon className="w-8 h-8" />,
  upload: <UploadIcon className="w-8 h-8" />,
}

const variantClasses: Record<QuickActionVariant, string> = {
  blue: 'bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700',
  green: 'bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700',
  purple: 'bg-violet-500 hover:bg-violet-600 active:bg-violet-700',
  orange: 'bg-orange-500 hover:bg-orange-600 active:bg-orange-700',
}

export function QuickActions({ actions }: QuickActionsProps) {
  return (
    <section aria-label="Quick actions">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {actions.map((action) => {
          const variant = action.variant ?? 'blue'
          const icon = typeof action.icon === 'string' ? defaultIcons[action.icon] : action.icon
          const content = (
            <>
              <span className="flex items-center justify-center text-white">{icon}</span>
              <span className="text-sm font-bold text-white text-center">{action.label}</span>
            </>
          )
          const baseClasses = "flex flex-col items-center justify-center gap-3 p-5 rounded-xl transition-colors cursor-pointer min-h-[100px]"
          const variantClassesStr = variantClasses[variant]
          const className = `${baseClasses} ${variantClassesStr}`

          if (action.href) {
            return (
              <Link key={action.id} to={action.href} className={className}>
                {content}
              </Link>
            )
          }
          return (
            <button
              key={action.id}
              type="button"
              onClick={action.onClick}
              className={className}
            >
              {content}
            </button>
          )
        })}
      </div>
    </section>
  )
}
