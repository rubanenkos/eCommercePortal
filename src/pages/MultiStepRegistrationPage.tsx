import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '../components'
import { useUser } from '../contexts/UserContext'

const STEPS = ['Personal Info', 'Account Security', 'Review & Submit'] as const
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function MultiStepRegistrationPage() {
  const navigate = useNavigate()
  const { login } = useUser()
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const updateField = (field: keyof typeof formData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
    setSubmitError(null)
  }

  const validateStep = (s: number): boolean => {
    const newErrors: Record<string, string> = {}

    if (s === 0) {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required'
      } else if (formData.name.trim().length < 2) {
        newErrors.name = 'Name must be at least 2 characters'
      } else if (formData.name.trim().length > 50) {
        newErrors.name = 'Name must be at most 50 characters'
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required'
      } else if (!EMAIL_REGEX.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address'
      }
    }

    if (s === 1) {
      if (!formData.password) {
        newErrors.password = 'Password is required'
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters'
      } else if (formData.password.length > 50) {
        newErrors.password = 'Password must be at most 50 characters'
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password'
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match'
      }
    }

    if (s === 2) {
      if (!formData.acceptTerms) {
        newErrors.acceptTerms = 'You must accept the terms and conditions'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((s) => Math.min(s + 1, STEPS.length - 1))
    }
  }

  const handlePrevious = () => {
    setStep((s) => Math.max(s - 1, 0))
    setErrors({})
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep(2)) return

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (formData.email === 'error@example.com') {
            reject(new Error('Registration failed. Please try again.'))
          } else {
            resolve(null)
          }
        }, 500)
      })

      login({
        name: formData.name,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(formData.name)}`,
        email: formData.email,
      })
      setIsSuccess(true)
      setTimeout(() => navigate('/dashboard'), 1500)
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Registration failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4" data-testid="registration-success">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">Registration successful!</h1>
          <p className="text-gray-600 dark:text-gray-400">Redirecting to dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 py-8">
      <div className="w-full max-w-md" data-testid="multi-step-form">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Create account</h1>
        <nav aria-label="Registration progress" className="mb-8">
          <ol className="flex gap-2" role="list">
            {STEPS.map((label, i) => (
              <li
                key={label}
                className={`flex-1 text-center text-sm font-medium ${
                  i === step ? 'text-blue-600 dark:text-blue-400' : i < step ? 'text-gray-500' : 'text-gray-400'
                }`}
                aria-current={i === step ? 'step' : undefined}
                data-testid={`step-indicator-${i}`}
              >
                {i + 1}. {label}
              </li>
            ))}
          </ol>
        </nav>

        <form onSubmit={handleSubmit} aria-label="Multi-step registration form" data-testid="multi-step-form-element">
          {step === 0 && (
            <div data-testid="step-0" role="group" aria-labelledby="step-0-heading">
              <h2 id="step-0-heading" className="sr-only">Personal information</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="ms-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Name
                  </label>
                  <input
                    id="ms-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    aria-label="Name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'ms-name-error' : undefined}
                    data-testid="ms-name"
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white"
                  />
                  {errors.name && (
                    <p id="ms-name-error" role="alert" data-testid="ms-name-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="ms-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    id="ms-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    aria-label="Email"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'ms-email-error' : undefined}
                    data-testid="ms-email"
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white"
                  />
                  {errors.email && (
                    <p id="ms-email-error" role="alert" data-testid="ms-email-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div data-testid="step-1" role="group" aria-labelledby="step-1-heading">
              <h2 id="step-1-heading" className="sr-only">Account security</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="ms-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Password
                  </label>
                  <input
                    id="ms-password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => updateField('password', e.target.value)}
                    aria-label="Password"
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? 'ms-password-error' : undefined}
                    data-testid="ms-password"
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white"
                  />
                  {errors.password && (
                    <p id="ms-password-error" role="alert" data-testid="ms-password-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.password}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="ms-confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Confirm password
                  </label>
                  <input
                    id="ms-confirm-password"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => updateField('confirmPassword', e.target.value)}
                    aria-label="Confirm password"
                    aria-invalid={!!errors.confirmPassword}
                    aria-describedby={errors.confirmPassword ? 'ms-confirm-password-error' : undefined}
                    data-testid="ms-confirm-password"
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white"
                  />
                  {errors.confirmPassword && (
                    <p id="ms-confirm-password-error" role="alert" data-testid="ms-confirm-password-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div data-testid="step-2" role="group" aria-labelledby="step-2-heading">
              <h2 id="step-2-heading" className="sr-only">Review and submit</h2>
              <div className="space-y-4">
                <div className="rounded-lg bg-gray-100 dark:bg-gray-800 p-4 space-y-2" data-testid="review-summary">
                  <p><strong>Name:</strong> {formData.name}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                </div>
                <div>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.acceptTerms}
                      onChange={(e) => updateField('acceptTerms', e.target.checked)}
                      aria-label="Accept terms and conditions"
                      aria-invalid={!!errors.acceptTerms}
                      data-testid="ms-accept-terms"
                      className="mt-1 rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      I accept the terms and conditions
                    </span>
                  </label>
                  {errors.acceptTerms && (
                    <p role="alert" data-testid="ms-accept-terms-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.acceptTerms}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {submitError && (
            <p role="alert" data-testid="submit-error" className="mt-4 text-sm text-red-600 dark:text-red-400">
              {submitError}
            </p>
          )}

          <div className="mt-6 flex gap-3">
            {step > 0 ? (
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                data-testid="btn-previous"
                aria-label="Previous step"
              >
                Previous
              </Button>
            ) : (
              <span />
            )}
            <div className="flex-1" />
            {step < STEPS.length - 1 ? (
              <Button type="button" onClick={handleNext} data-testid="btn-next" aria-label="Next step">
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting}
                data-testid="btn-submit"
                aria-label="Submit registration"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            )}
          </div>
        </form>

        <p className="mt-6 text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
