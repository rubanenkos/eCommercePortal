export interface FeedUser {
  id: string
  name: string
  avatar: string
  username?: string
}

export interface Comment {
  id: string
  user: FeedUser
  content: string
  timestamp: string
  likes?: number
}

export interface Post {
  id: string
  user: FeedUser
  content: string
  image?: string
  timestamp: string
  likes: number
  likedByUser: boolean
  comments: Comment[]
  shareCount?: number
}
