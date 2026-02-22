import { useState, useCallback } from 'react'
import { CreatePost } from './CreatePost'
import { PostCard } from './PostCard'
import type { Post, FeedUser } from './types'

export interface FeedProps {
  posts: Post[]
  currentUser: FeedUser
  onLike: (postId: string) => void
  onComment: (postId: string, content: string) => void
  onShare?: (postId: string) => void
  onCreatePost: (content: string, image?: string) => void
}

export function Feed({
  posts,
  currentUser,
  onLike,
  onComment,
  onShare,
  onCreatePost,
}: FeedProps) {
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const handleLoadMore = useCallback(() => {
    setIsLoadingMore(true)
    setTimeout(() => setIsLoadingMore(false), 1500)
  }, [])

  return (
    <div className="max-w-2xl mx-auto space-y-4 py-6">
      <CreatePost currentUser={currentUser} onSubmit={onCreatePost} />
      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            currentUser={currentUser}
            onLike={onLike}
            onComment={onComment}
            onShare={onShare}
          />
        ))}
      </div>
      <div className="flex justify-center py-8">
        <button
          type="button"
          onClick={handleLoadMore}
          disabled={isLoadingMore}
          className="px-6 py-3 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoadingMore ? 'Loading...' : 'Load more'}
        </button>
      </div>
    </div>
  )
}
