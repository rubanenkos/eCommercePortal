import { createContext, useContext, useState, useCallback } from 'react'
import type { TeamMember } from '../components/types/team'
import { useActivity } from './ActivityContext'

const INITIAL_MEMBERS: TeamMember[] = [
  { id: '1', name: 'Alex Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', role: 'Lead', status: 'online', email: 'alex@example.com' },
  { id: '2', name: 'Sam Wilson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sam', role: 'Developer', status: 'online', email: 'sam@example.com' },
  { id: '3', name: 'Jordan Lee', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan', role: 'Designer', status: 'away', email: 'jordan@example.com' },
  { id: '4', name: 'Casey Brown', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Casey', role: 'QA', status: 'offline', email: 'casey@example.com' },
  { id: '5', name: 'Morgan Taylor', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Morgan', role: 'PM', status: 'online', email: 'morgan@example.com' },
]

interface TeamContextValue {
  members: TeamMember[]
  addMember: (member: Omit<TeamMember, 'id'>) => void
}

const TeamContext = createContext<TeamContextValue | null>(null)

function TeamProviderInner({ children }: { children: React.ReactNode }) {
  const { addActivity } = useActivity()
  const [members, setMembers] = useState<TeamMember[]>(INITIAL_MEMBERS)

  const addMember = useCallback((member: Omit<TeamMember, 'id'>) => {
    const newMember: TeamMember = { ...member, id: String(Date.now()) }
    setMembers((prev) => [...prev, newMember])
    addActivity({
      type: 'member_joined',
      user: member.name,
      message: 'joined the team',
    })
  }, [addActivity])

  return (
    <TeamContext.Provider value={{ members, addMember }}>
      {children}
    </TeamContext.Provider>
  )
}

export function TeamProvider({ children }: { children: React.ReactNode }) {
  return <TeamProviderInner>{children}</TeamProviderInner>
}

export function useTeam(): TeamContextValue {
  const ctx = useContext(TeamContext)
  if (!ctx) {
    throw new Error('useTeam must be used within TeamProvider')
  }
  return ctx
}

export function useTeamOptional(): TeamContextValue | null {
  return useContext(TeamContext)
}

