import { Button } from '../ui/Button'

export interface UserProfileStats {
  followers: number
  following: number
  posts: number
}

export interface UserProfileProps {
  /** URL for the user's avatar image */
  avatar: string
  /** User's display name */
  name: string
  /** User's handle/username (e.g. @username) */
  username?: string
  /** User's bio or short description */
  bio: string
  /** Profile statistics */
  stats: UserProfileStats
  /** Whether the current user is following this profile */
  isFollowing?: boolean
  /** Whether this is the current user's own profile */
  isOwnProfile?: boolean
  /** Callback when follow/unfollow is clicked */
  onFollow?: () => void
  /** Callback when message button is clicked */
  onMessage?: () => void
  /** Callback when edit profile is clicked */
  onEditProfile?: () => void
}

function formatCount(count: number): string {
  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1)}M`
  }
  if (count >= 1_000) {
    return `${(count / 1_000).toFixed(1)}K`
  }
  return count.toLocaleString()
}

export function UserProfile({
  avatar,
  name,
  username,
  bio,
  stats,
  isFollowing = false,
  isOwnProfile = false,
  onFollow,
  onMessage,
  onEditProfile,
}: UserProfileProps) {
  return (
    <article
      className="w-full max-w-2xl mx-auto bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden shadow-xl"
      aria-label={`Profile for ${name}`}
    >
      {/* Cover/banner area - optional visual anchor */}
      <div
        className="h-24 sm:h-32 bg-gradient-to-r from-blue-900/50 to-purple-900/50"
        aria-hidden="true"
      />

      <div className="px-4 sm:px-8 pb-8 -mt-12 sm:-mt-16">
        {/* Avatar */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:gap-6">
          <div className="relative">
            <img
              src={avatar}
              alt={`${name}'s profile picture`}
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-gray-900 object-cover ring-2 ring-gray-700"
              width={128}
              height={128}
              loading="eager"
            />
          </div>

          {/* Name, username & actions - responsive layout */}
          <div className="flex-1 mt-4 sm:mt-0 sm:mb-2">
            <h1 className="text-xl sm:text-2xl font-bold text-white truncate">
              {name}
            </h1>
            {username && (
              <p className="text-gray-400 text-sm sm:text-base mt-0.5">
                @{username}
              </p>
            )}

            {/* Action buttons - stacked on mobile, inline on desktop */}
            <div
              className="flex flex-wrap gap-2 sm:gap-3 mt-4"
              role="group"
              aria-label="Profile actions"
            >
              {isOwnProfile ? (
                <Button
                  variant="outline"
                  onClick={onEditProfile}
                  aria-label="Edit your profile"
                  className="flex-1 sm:flex-none min-w-0"
                >
                  Edit profile
                </Button>
              ) : (
                <>
                  <Button
                    variant={isFollowing ? 'outline' : 'primary'}
                    onClick={onFollow}
                    aria-label={isFollowing ? `Unfollow ${name}` : `Follow ${name}`}
                    aria-pressed={isFollowing}
                    className="flex-1 sm:flex-none min-w-0"
                  >
                    {isFollowing ? 'Following' : 'Follow'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={onMessage}
                    aria-label={`Send a message to ${name}`}
                    className="flex-1 sm:flex-none min-w-0"
                  >
                    Message
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Bio */}
        {bio && (
          <p className="mt-4 sm:mt-6 text-gray-300 text-sm sm:text-base leading-relaxed">
            {bio}
          </p>
        )}

        {/* Stats */}
        <nav
          className="mt-6 flex gap-6 sm:gap-8"
          aria-label="Profile statistics"
        >
          <div className="flex items-baseline gap-1.5">
            <span className="font-semibold text-white tabular-nums">
              {formatCount(stats.posts)}
            </span>
            <span className="text-gray-400 text-sm">posts</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-semibold text-white tabular-nums">
              {formatCount(stats.followers)}
            </span>
            <span className="text-gray-400 text-sm">followers</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-semibold text-white tabular-nums">
              {formatCount(stats.following)}
            </span>
            <span className="text-gray-400 text-sm">following</span>
          </div>
        </nav>
      </div>
    </article>
  )
}
