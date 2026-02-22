import { test, expect } from '../fixtures/auth.fixture'

test.describe('Error Handling', () => {
  test.describe('Authentication errors', () => {
    test('login with wrong password shows error', async ({ page }) => {
      await page.goto('/login')
      await page.getByTestId('login-email').fill('test@example.com')
      await page.getByTestId('login-password').fill('WrongPassword')
      await page.getByTestId('login-submit').click()
      await expect(page.getByTestId('login-error')).toBeVisible()
      await expect(page.getByTestId('login-error')).toContainText(/invalid/i)
      await expect(page).toHaveURL(/login/)
    })

    test('login with non-existent email shows error', async ({ page }) => {
      await page.goto('/login')
      await page.getByTestId('login-email').fill('nonexistent@example.com')
      await page.getByTestId('login-password').fill('SomePassword123!')
      await page.getByTestId('login-submit').click()
      await expect(page.getByTestId('login-error')).toContainText(/invalid/i)
    })

    test('login with empty fields shows validation error', async ({ page }) => {
      await page.goto('/login')
      await page.getByTestId('login-submit').click()
      await expect(page.getByTestId('login-error')).toContainText(/fill in all fields/i)
    })

    test('register with short password shows error', async ({ page }) => {
      await page.goto('/register')
      await page.getByTestId('register-name').fill('Test User')
      await page.getByTestId('register-email').fill('test@example.com')
      await page.getByTestId('register-password').fill('123')
      await page.getByTestId('register-submit').click()
      await expect(page.getByTestId('register-error')).toContainText(/at least 8 characters/i)
    })

    test('register with empty fields shows validation error', async ({ page }) => {
      await page.goto('/register')
      await page.getByTestId('register-submit').click()
      await expect(page.getByTestId('register-error')).toContainText(/fill in all fields/i)
    })
  })

  test.describe('Protected route redirect', () => {
    test('unauthenticated access to dashboard redirects to login', async ({ page }) => {
      await page.goto('/dashboard')
      await expect(page).toHaveURL(/login/)
    })

    test('unauthenticated access to settings redirects to login', async ({ page }) => {
      await page.goto('/settings')
      await expect(page).toHaveURL(/login/)
    })
  })

  test.describe('Task form validation', () => {
    test.beforeEach(async ({ page, testUser }) => {
      await page.goto('/login')
      await page.getByTestId('login-email').fill(testUser.email)
      await page.getByTestId('login-password').fill(testUser.password)
      await page.getByTestId('login-submit').click()
      await page.waitForURL(/\/team\b/, { timeout: 10000 })
      await page.goto('/dashboard')
      await page.waitForURL(/\/dashboard\b/, { timeout: 10000 })
    })

    test('empty task title does not add task', async ({ page }) => {
      await expect(page.getByTestId('task-card')).toHaveCount(4)
      await page.getByTestId('add-task-button').click()
      await expect(page.getByTestId('task-card')).toHaveCount(4)
    })

    test('whitespace-only task title does not add task', async ({ page }) => {
      await expect(page.getByTestId('task-card')).toHaveCount(4)
      await page.getByTestId('new-task-input').fill('   ')
      await page.getByTestId('new-task-input').blur()
      await page.getByTestId('add-task-button').click()
      await expect(page.getByTestId('task-card')).toHaveCount(4)
    })
  })

  test.describe('Error message visibility', () => {
    test('login error clears when user corrects input', async ({ page }) => {
      await page.goto('/login')
      await page.getByTestId('login-submit').click()
      await expect(page.getByTestId('login-error')).toBeVisible()
      await page.getByTestId('login-email').fill('test@example.com')
      await page.getByTestId('login-password').fill('TestPassword123!')
      await page.getByTestId('login-submit').click()
      await expect(page).toHaveURL(/\/team\b/)
    })
  })
})
