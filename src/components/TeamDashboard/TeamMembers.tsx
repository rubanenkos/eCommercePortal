import { Card } from '../shared/Card'
import { Avatar } from '../shared/Avatar'
import type { TeamMember } from '../types/team'

export interface TeamMembersProps {
  members: TeamMember[]
  maxDisplay?: number
}

export function TeamMembers({ members, maxDisplay = 6 }: TeamMembersProps) {
  const displayMembers = members.slice(0, maxDisplay)
  const overflow = members.length - maxDisplay

  return (
    <Card padding="md">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Team Members</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{members.length} members</p>
      <div className="flex flex-wrap gap-3">
        {displayMembers.map((member) => (
          <div
            key={member.id}
            className="flex items-center gap-2 group"
            title={`${member.name} - ${member.role}`}
          >
            <Avatar
              src={member.avatar}
              alt={member.name}
              size="md"
              status={member.status}
            />
            <div className="hidden sm:block min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{member.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{member.role}</p>
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
