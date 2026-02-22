import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '../components'
import { useUser } from '../contexts/UserContext'

export function LoginPage() {
  const navigate = useNavigate()
  const { login } = useUser()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }
    if (email === 'test@example.com' && password === 'TestPassword123!') {
      login({
        name: 'Test User',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Test',
        email,
      })
      navigate('/team')
    } else {
      setError('Invalid email or password')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Sign in
        </h1>
        <form
          onSubmit={handleSubmit}
          aria-label="Login form"
          data-testid="login-form"
          className="space-y-4"
        >
          <div>
            <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email"
              data-testid="login-email"
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-label="Password"
              data-testid="login-password"
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white"
            />
          </div>
          {error && (
            <p role="alert" className="text-sm text-red-600 dark:text-red-400" data-testid="login-error">
              {error}
            </p>
          )}
          <Button type="submit" data-testid="login-submit">
            Log in
          </Button>
        </form>
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-blue-600 dark:text-blue-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}
