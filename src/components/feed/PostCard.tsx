import { useState } from 'react'
import { UserAvatar } from './UserAvatar'
import { CommentSection } from './CommentSection'
import type { Post, FeedUser } from './types'

export interface PostCardProps {
  post: Post
  currentUser: FeedUser
  onLike: (postId: string) => void
  onComment: (postId: string, content: string) => void
  onShare?: (postId: string) => void
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg className="w-5 h-5" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  )
}

function CommentIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  )
}

function ShareIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
    </svg>
  )
}

export function PostCard({ post, currentUser, onLike, onComment, onShare }: PostCardProps) {
  const [showComments, setShowComments] = useState(false)

  const handleAddComment = (content: string) => {
    onComment(post.id, content)
    setShowComments(true)
  }

  return (
    <article className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
      <div className="p-4">
        <div className="flex items-center gap-3">
          <UserAvatar user={post.user} size="md" showName />
          <span className="text-sm text-gray-500 dark:text-gray-400 ml-auto">{post.timestamp}</span>
        </div>
        <p className="mt-3 text-gray-900 dark:text-white whitespace-pre-wrap">{post.content}</p>
        {post.image && (
          <div className="mt-3 rounded-lg overflow-hidden">
            <img
              src={post.image}
              alt=""
              className="w-full max-h-96 object-cover"
            />
          </div>
        )}
      </div>
      <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 flex items-center gap-6">
        <button
          type="button"
          onClick={() => onLike(post.id)}
          className={`flex items-center gap-2 ${post.likedByUser ? 'text-red-500' : 'text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400'}`}
          aria-pressed={post.likedByUser}
        >
          <HeartIcon filled={post.likedByUser} />
          <span className="text-sm font-medium">{post.likes}</span>
        </button>
        <button
          type="button"
          onClick={() => setShowComments((c) => !c)}
          className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
        >
          <CommentIcon />
          <span className="text-sm font-medium">{post.comments.length}</span>
        </button>
        <button
          type="button"
          onClick={() => onShare?.(post.id)}
          className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
          aria-label="Share post"
        >
          <ShareIcon />
          <span className="text-sm font-medium">{post.shareCount ?? 0}</span>
        </button>
      </div>
      {showComments && (
        <div className="px-4 pb-4">
          <CommentSection
            comments={post.comments}
            currentUser={currentUser}
            onAddComment={handleAddComment}
          />
        </div>
      )}
    </article>
  )
}
