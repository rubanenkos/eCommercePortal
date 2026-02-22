import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Feed } from '../components/feed'
import { DarkModeToggle } from '../components/Dashboard/DarkModeToggle'
import { NavIcons } from '../components/shared/NavIcons'
import type { Post, FeedUser } from '../components/feed'
import { useUser } from '../contexts/UserContext'

const MOCK_CURRENT_USER: FeedUser = {
  id: 'me',
  name: 'Alex Johnson',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  username: 'alexj',
}

const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    user: { id: '1', name: 'Sam Wilson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sam', username: 'samw' },
    content: 'Just shipped a new feature! 🚀 The team worked really hard on this.\n\nWhat do you think?',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop',
    timestamp: '2 hours ago',
    likes: 12,
    likedByUser: false,
    comments: [
      { id: 'c1', user: MOCK_CURRENT_USER, content: 'Looks great! Congrats!', timestamp: '1 hour ago', likes: 2 },
      { id: 'c2', user: { id: '2', name: 'Jordan Lee', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan', username: 'jordanl' }, content: 'Amazing work! 🙌', timestamp: '45 min ago' },
    ],
    shareCount: 3,
  },
  {
    id: '2',
    user: { id: '2', name: 'Jordan Lee', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan', username: 'jordanl' },
    content: 'Design tips for 2025: Focus on accessibility, embrace dark mode, and keep it simple.',
    timestamp: '5 hours ago',
    likes: 24,
    likedByUser: true,
    comments: [],
    shareCount: 8,
  },
  {
    id: '3',
    user: { id: '3', name: 'Casey Brown', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Casey', username: 'caseyb' },
    content: 'Coffee and code. The best combination for a productive morning. ☕',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=400&fit=crop',
    timestamp: '1 day ago',
    likes: 8,
    likedByUser: false,
    comments: [
      { id: 'c3', user: MOCK_CURRENT_USER, content: 'Same here!', timestamp: '1 day ago' },
    ],
  },
]

export function FeedPage() {
  const { user } = useUser()
  const currentUser: FeedUser = user
    ? { id: user.name, name: user.name, avatar: user.avatar, username: user.email?.split('@')[0] }
    : MOCK_CURRENT_USER

  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS)

  const handleLike = useCallback((postId: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, likedByUser: !p.likedByUser, likes: p.likedByUser ? p.likes - 1 : p.likes + 1 }
          : p
      )
    )
  }, [])

  const handleComment = useCallback((postId: string, content: string) => {
    const newComment = {
      id: `c-${Date.now()}`,
      user: currentUser,
      content,
      timestamp: 'Just now',
    }
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, comments: [...p.comments, newComment] } : p
      )
    )
  }, [currentUser])

  const handleShare = useCallback((postId: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, shareCount: (p.shareCount ?? 0) + 1 } : p
      )
    )
  }, [])

  const handleCreatePost = useCallback((content: string, image?: string) => {
    const newPost: Post = {
      id: `p-${Date.now()}`,
      user: currentUser,
      content: content.trim() || '',
      image,
      timestamp: 'Just now',
      likes: 0,
      likedByUser: false,
      comments: [],
    }
    setPosts((prev) => [newPost, ...prev])
  }, [currentUser])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <nav className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <Link to="/dashboard" className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <NavIcons.TaskIcon />
              Tasks
            </Link>
            <Link to="/team" className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <NavIcons.TeamIcon />
              Team
            </Link>
            <Link to="/board" className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <NavIcons.BoardIcon />
              Board
            </Link>
            <Link to="/feed" className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400">
              <NavIcons.FeedIcon />
              Feed
            </Link>
            <Link to="/settings" className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <NavIcons.SettingsIcon />
              Settings
            </Link>
          </div>
          <DarkModeToggle />
        </div>
      </nav>
      <Feed
        posts={posts}
        currentUser={currentUser}
        onLike={handleLike}
        onComment={handleComment}
        onShare={handleShare}
        onCreatePost={handleCreatePost}
      />
    </div>
  )
}
