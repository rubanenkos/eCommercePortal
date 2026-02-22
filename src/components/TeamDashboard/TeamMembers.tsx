import { Card } from '../shared/Card'
import { Avatar } from '../shared/Avatar'
import { Badge } from '../shared/Badge'
import type { TeamMember } from '../types/team'

export interface TeamMembersProps {
  members: TeamMember[]
  maxDisplay?: number
  onMessage?: (member: TeamMember) => void
}

const roleVariant: Record<string, 'default' | 'success' | 'warning' | 'info'> = {
  Lead: 'success',
  Developer: 'info',
  Designer: 'warning',
  QA: 'default',
  PM: 'success',
}

function MessageIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  )
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )
}

export function TeamMembers({ members, maxDisplay = 6, onMessage }: TeamMembersProps) {
  const displayMembers = members.slice(0, maxDisplay)
  const overflow = members.length - maxDisplay

  return (
    <Card padding="md">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Team Members</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{members.length} members</p>
      <div className="space-y-3">
        {displayMembers.map((member) => (
          <div
            key={member.id}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
            title={`${member.name} - ${member.role}`}
          >
            <Avatar
              src={member.avatar}
              alt={member.name}
              size="md"
              status={member.status}
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{member.name}</p>
              <Badge variant={roleVariant[member.role] ?? 'default'} size="sm" className="mt-1">
                {member.role}
              </Badge>
            </div>
            <div className="flex items-center gap-1 shrink-0" aria-label="Quick contact">
              <button
                type="button"
                onClick={() => onMessage?.(member)}
                className="p-1.5 rounded-md text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:text-blue-400 dark:hover:bg-blue-900/30"
                aria-label={`Message ${member.name}`}
              >
                <MessageIcon className="w-4 h-4" />
              </button>
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="p-1.5 rounded-md text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:text-blue-400 dark:hover:bg-blue-900/30"
                  aria-label={`Email ${member.name}`}
                >
                  <MailIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        ))}
        {overflow > 0 && (
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300">
            +{overflow}
          </div>
        )}
      </div>
    </Card>
  )
}
