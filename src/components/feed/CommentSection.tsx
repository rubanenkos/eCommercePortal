import { useState } from 'react'
import { UserAvatar } from './UserAvatar'
import type { Comment, FeedUser } from './types'

export interface CommentSectionProps {
  comments: Comment[]
  currentUser: FeedUser
  onAddComment: (content: string) => void
  onLikeComment?: (commentId: string) => void
}

export function CommentSection({ comments, currentUser, onAddComment, onLikeComment }: CommentSectionProps) {
  const [newComment, setNewComment] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = newComment.trim()
    if (trimmed) {
      onAddComment(trimmed)
      setNewComment('')
    }
  }

  return (
    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 space-y-3">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <UserAvatar user={currentUser} size="sm" className="shrink-0" />
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 px-4 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          aria-label="Add comment"
        />
        <button
          type="submit"
          disabled={!newComment.trim()}
          className="px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
          aria-label="Submit comment"
        >
          Reply
        </button>
      </form>
      <div className="space-y-3">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="flex gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          >
            <UserAvatar user={comment.user} size="sm" className="shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium text-gray-900 dark:text-white">{comment.user.name}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{comment.timestamp}</span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-0.5">{comment.content}</p>
              {comment.likes != null && comment.likes > 0 && (
                <button
                  type="button"
                  className="mt-1 text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                  onClick={() => onLikeComment?.(comment.id)}
                  aria-label={`Like comment by ${comment.user.name}`}
                >
                  {comment.likes} like{comment.likes !== 1 ? 's' : ''}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
