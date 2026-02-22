import { useState } from 'react'
import { UserProfile } from '../components'
import type { UserProfileStats } from '../components'

interface SampleUser {
  id: string
  avatar: string
  name: string
  username?: string
  bio: string
  stats: UserProfileStats
  isOwnProfile?: boolean
  label: string
}

const AVATAR_BASE = 'https://api.dicebear.com/7.x/avataaars/svg?seed='

const SAMPLE_USERS: SampleUser[] = [
  {
    id: 'alex',
    avatar: `${AVATAR_BASE}Alex`,
    name: 'Alex Johnson',
    username: 'alexj',
    bio: 'Designer & developer. Building things on the internet. Coffee enthusiast ☕',
    stats: { posts: 1247, followers: 42800, following: 892 },
    label: 'Creator / Influencer',
  },
  {
    id: 'sam',
    avatar: `${AVATAR_BASE}Sam`,
    name: 'Sam Chen',
    username: 'samchen',
    bio: 'Photographer. Capturing moments one frame at a time. Based in NYC.',
    stats: { posts: 342, followers: 5200, following: 210 },
    label: 'Regular user',
  },
  {
    id: 'taylor',
    avatar: `${AVATAR_BASE}Taylor`,
    name: 'Taylor Williams',
    bio: 'Just joined! Excited to connect and share.',
    stats: { posts: 3, followers: 12, following: 45 },
    label: 'New user (no username)',
  },
  {
    id: 'jordan',
    avatar: `${AVATAR_BASE}Jordan`,
    name: 'Jordan Smith',
    username: 'jordansmith',
    bio: 'Welcome to my profile! I post about tech, travel, and food. DM me for collabs. Always open to new opportunities and meeting interesting people from around the world.',
    stats: { posts: 42, followers: 1200, following: 350 },
    isOwnProfile: true,
    label: 'Your profile',
  },
  {
    id: 'morgan',
    avatar: `${AVATAR_BASE}Morgan`,
    name: 'Morgan Reed',
    username: 'morganreed',
    bio: 'Minimalist. Less is more.',
    stats: { posts: 1250000, followers: 8920000, following: 12 },
    label: 'Celebrity (large numbers)',
  },
]

export function UserProfileDemo() {
  const [followingIds, setFollowingIds] = useState<Set<string>>(new Set())

  const handleFollow = (id: string) => {
    setFollowingIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleMessage = (name: string) => {
    alert(`Message ${name}`)
  }

  const handleEditProfile = () => {
    alert('Edit profile')
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Page header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            UserProfile Component Demo
          </h1>
          <p className="mt-2 text-gray-400 text-sm sm:text-base">
            Showcasing different profile variations and states
          </p>
        </div>
      </header>

      {/* Demo content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-12">
          {SAMPLE_USERS.map((user) => (
            <section key={user.id} className="space-y-3">
              <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                {user.label}
              </h2>
              <UserProfile
                avatar={user.avatar}
                name={user.name}
                username={user.username}
                bio={user.bio}
                stats={user.stats}
                isFollowing={followingIds.has(user.id)}
                isOwnProfile={user.isOwnProfile}
                onFollow={user.isOwnProfile ? undefined : () => handleFollow(user.id)}
                onMessage={
                  user.isOwnProfile ? undefined : () => handleMessage(user.name)
                }
                onEditProfile={user.isOwnProfile ? handleEditProfile : undefined}
              />
            </section>
          ))}
        </div>
      </main>
    </div>
  )
}
