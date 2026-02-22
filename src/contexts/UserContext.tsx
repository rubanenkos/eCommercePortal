import { createContext, useContext, useState, useEffect, useCallback } from 'react'

export interface User {
  name: string
  avatar: string
  email?: string
}

interface UserContextValue {
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  login: (user: User) => void
  logout: () => void
}

const UserContext = createContext<UserContextValue | null>(null)

const USER_STORAGE_KEY = 'user'
const AUTH_STORAGE_KEY = 'auth'

function getStoredUser(): User | null {
  if (typeof window === 'undefined') return null
  try {
    const auth = sessionStorage.getItem(AUTH_STORAGE_KEY)
    if (auth !== 'true') return null
    const raw = sessionStorage.getItem(USER_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as { name?: string; avatar?: string; email?: string }
    if (!parsed?.name) return null
    return {
      name: parsed.name,
      avatar: parsed.avatar ?? `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(parsed.name)}`,
      email: parsed.email,
    }
  } catch {
    return null
  }
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<User | null>(getStoredUser)

  useEffect(() => {
    const handleStorage = () => {
      setUserState(getStoredUser())
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const setUser = useCallback((u: User | null) => {
    setUserState(u)
  }, [])

  const login = useCallback((u: User) => {
    sessionStorage.setItem(AUTH_STORAGE_KEY, 'true')
    sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify({ name: u.name, avatar: u.avatar, email: u.email }))
    setUserState(u)
  }, [])

  const logout = useCallback(() => {
    sessionStorage.removeItem(AUTH_STORAGE_KEY)
    sessionStorage.removeItem(USER_STORAGE_KEY)
    setUserState(null)
  }, [])

  const value: UserContextValue = {
    user,
    isAuthenticated: user !== null,
    setUser,
    login,
    logout,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function useUser(): UserContextValue {
  const ctx = useContext(UserContext)
  if (!ctx) {
    throw new Error('useUser must be used within UserProvider')
  }
  return ctx
}
