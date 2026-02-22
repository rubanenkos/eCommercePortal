import { test, expect } from '../fixtures/auth.fixture'

test.describe('Authentication', () => {
  test.describe('User registration flow', () => {
    test('should display registration form', async ({ page }) => {
      await page.goto('/register')
      await expect(page.getByRole('heading', { name: /create account/i })).toBeVisible()
      await expect(page.getByTestId('register-form')).toBeVisible()
      await expect(page.getByTestId('register-name')).toBeVisible()
      await expect(page.getByTestId('register-email')).toBeVisible()
      await expect(page.getByTestId('register-password')).toBeVisible()
      await expect(page.getByTestId('register-submit')).toBeVisible()
    })

    test('should register successfully and redirect to team dashboard', async ({ page }) => {
      const uniqueEmail = `user-${Date.now()}@example.com`
      await page.goto('/register')
      await page.getByTestId('register-name').fill('New User')
      await page.getByTestId('register-email').fill(uniqueEmail)
      await page.getByTestId('register-password').fill('SecurePass123!')
      await page.getByTestId('register-submit').click()
      await page.waitForURL(/\/team\b/, { timeout: 10000 })
      await expect(page.getByRole('heading', { name: /team dashboard/i })).toBeVisible()
    })

    test('should show error when fields are empty', async ({ page }) => {
      await page.goto('/register')
      await page.getByTestId('register-submit').click()
      await expect(page.getByTestId('register-error')).toContainText(/fill in all fields/i)
    })

    test('should show error when password is too short', async ({ page }) => {
      await page.goto('/register')
      await page.getByTestId('register-name').fill('Test User')
      await page.getByTestId('register-email').fill('test@example.com')
      await page.getByTestId('register-password').fill('short')
      await page.getByTestId('register-submit').click()
      await expect(page.getByTestId('register-error')).toContainText(/at least 8 characters/i)
    })

    test('should have link to login page', async ({ page }) => {
      await page.goto('/register')
      await expect(page.getByRole('link', { name: /sign in/i })).toBeVisible()
      await page.getByRole('link', { name: /sign in/i }).click()
      await expect(page).toHaveURL(/login/)
    })
  })

  test.describe('Login', () => {
    test('should display login form', async ({ page }) => {
      await page.goto('/login')
      await expect(page.getByRole('heading', { name: /sign in/i })).toBeVisible()
      await expect(page.getByTestId('login-form')).toBeVisible()
      await expect(page.getByTestId('login-email')).toBeVisible()
      await expect(page.getByTestId('login-password')).toBeVisible()
      await expect(page.getByTestId('login-submit')).toBeVisible()
    })

    test('should login with valid credentials', async ({ page, testUser }) => {
      await page.goto('/login')
      await page.getByTestId('login-email').fill(testUser.email)
      await page.getByTestId('login-password').fill(testUser.password)
      await page.getByTestId('login-submit').click()
      await page.waitForURL(/\/team\b/, { timeout: 10000 })
      await expect(page.getByRole('heading', { name: /team dashboard/i })).toBeVisible()
    })

    test('should show error with invalid credentials', async ({ page }) => {
      await page.goto('/login')
      await page.getByTestId('login-email').fill('wrong@example.com')
      await page.getByTestId('login-password').fill('WrongPassword123!')
      await page.getByTestId('login-submit').click()
      await expect(page.getByTestId('login-error')).toContainText(/invalid email or password/i)
      await expect(page).toHaveURL(/login/)
    })

    test('should show error when fields are empty', async ({ page }) => {
      await page.goto('/login')
      await page.getByTestId('login-submit').click()
      await expect(page.getByTestId('login-error')).toContainText(/fill in all fields/i)
    })

    test('should have link to register page', async ({ page }) => {
      await page.goto('/login')
      await expect(page.getByRole('link', { name: /register/i })).toBeVisible()
      await page.getByRole('link', { name: /register/i }).click()
      await expect(page).toHaveURL(/register/)
    })
  })

  test.describe('Logout', () => {
    test('should logout successfully', async ({ page, testUser }) => {
      await page.goto('/login')
      await page.getByTestId('login-email').fill(testUser.email)
      await page.getByTestId('login-password').fill(testUser.password)
      await page.getByTestId('login-submit').click()
      await page.waitForURL(/\/team\b/, { timeout: 10000 })

      await page.getByRole('button', { name: /user menu/i }).click()
      await page.getByRole('menuitem', { name: /sign out/i }).click()
      await expect(page).toHaveURL(/login/)
      await expect(page.getByRole('heading', { name: /sign in/i })).toBeVisible()
    })
  })

  test.describe('Session persistence', () => {
    test('should persist session on page reload', async ({ page, testUser }) => {
      await page.goto('/login')
      await page.getByTestId('login-email').fill(testUser.email)
      await page.getByTestId('login-password').fill(testUser.password)
      await page.getByTestId('login-submit').click()
      await page.waitForURL(/\/team\b/, { timeout: 10000 })

      await page.reload()
      await page.waitForURL(/\/team\b/, { timeout: 10000 })
      await expect(page.getByRole('heading', { name: /team dashboard/i })).toBeVisible()
    })

    test('should redirect unauthenticated user to login', async ({ page }) => {
      await page.goto('/dashboard')
      await expect(page).toHaveURL(/login/)
    })

    test('should redirect root to team when authenticated', async ({ page, testUser }) => {
      await page.goto('/login')
      await page.getByTestId('login-email').fill(testUser.email)
      await page.getByTestId('login-password').fill(testUser.password)
      await page.getByTestId('login-submit').click()
      await page.waitForURL(/\/team\b/, { timeout: 10000 })
      await page.goto('/')
      await page.waitForURL(/\/team\b/, { timeout: 10000 })
    })
  })
})
