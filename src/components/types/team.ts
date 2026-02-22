export interface TeamMember {
  id: string
  name: string
  avatar: string
  role: string
  status?: 'online' | 'away' | 'offline'
  /** Optional email for quick contact (mailto) */
  email?: string
}
