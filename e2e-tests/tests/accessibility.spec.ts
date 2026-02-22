import { test, expect } from '../fixtures/auth.fixture'

test.describe('Accessibility', () => {
  test.describe('Keyboard navigation', () => {
  

    test('should submit login form with Enter', async ({ page, testUser }) => {
      await page.goto('/login')
      await page.getByTestId('login-email').fill(testUser.email)
      await page.getByTestId('login-password').fill(testUser.password)
      await page.getByTestId('login-password').press('Enter')
      await page.waitForURL(/\/team\b/, { timeout: 10000 })
    })

    test('should open and close user menu with keyboard', async ({ page, testUser }) => {
      await page.goto('/login')
      await page.getByTestId('login-email').fill(testUser.email)
      await page.getByTestId('login-password').fill(testUser.password)
      await page.getByTestId('login-submit').click()
      await page.waitForURL(/\/team\b/, { timeout: 10000 })
      await page.goto('/dashboard')
      await page.waitForURL(/\/dashboard\b/, { timeout: 10000 })

      await page.getByRole('button', { name: /user menu/i }).focus()
      await page.keyboard.press('Enter')
      await expect(page.getByRole('menuitem', { name: /sign out/i })).toBeVisible()
      await page.keyboard.press('Escape')
      await expect(page.getByRole('menuitem', { name: /sign out/i })).not.toBeVisible()
    })
  })

  test.describe('ARIA labels and roles', () => {
    test('login form should have proper ARIA', async ({ page }) => {
      await page.goto('/login')
      await expect(page.getByRole('form', { name: /login/i })).toBeVisible()
      await expect(page.getByLabel(/email/i)).toBeVisible()
      await expect(page.getByLabel(/password/i)).toBeVisible()
      await expect(page.getByRole('button', { name: /log in/i })).toBeVisible()
    })

    test('register form should have proper ARIA', async ({ page }) => {
      await page.goto('/register')
      await expect(page.getByRole('form', { name: /register/i })).toBeVisible()
      await expect(page.getByLabel(/name/i)).toBeVisible()
      await expect(page.getByLabel(/email/i)).toBeVisible()
      await expect(page.getByLabel(/password/i)).toBeVisible()
    })

    test('dashboard should have main landmark and task list', async ({ page, testUser }) => {
      await page.goto('/login')
      await page.getByTestId('login-email').fill(testUser.email)
      await page.getByTestId('login-password').fill(testUser.password)
      await page.getByTestId('login-submit').click()
      await page.waitForURL(/\/team\b/, { timeout: 10000 })
      await page.goto('/dashboard')
      await page.waitForURL(/\/dashboard\b/, { timeout: 10000 })

      await expect(page.getByRole('main')).toBeVisible()
      await expect(page.getByTestId('task-list')).toBeVisible()
      const taskCards = page.getByTestId('task-card')
      await expect(taskCards.first()).toHaveAttribute('aria-labelledby', /task-title/)
    })

    test('task cards should have accessible status controls', async ({ page, testUser }) => {
      await page.goto('/login')
      await page.getByTestId('login-email').fill(testUser.email)
      await page.getByTestId('login-password').fill(testUser.password)
      await page.getByTestId('login-submit').click()
      await page.waitForURL(/\/team\b/, { timeout: 10000 })
      await page.goto('/dashboard')
      await page.waitForURL(/\/dashboard\b/, { timeout: 10000 })

      const firstCard = page.getByTestId('task-card').first()
      await expect(firstCard.getByRole('combobox', { name: /change status/i })).toBeVisible()
    })
  })

  test.describe('Screen reader compatibility', () => {
    test('error messages should have role="alert"', async ({ page }) => {
      await page.goto('/login')
      await page.getByTestId('login-submit').click()
      await expect(page.getByRole('alert')).toContainText(/fill in all fields/i)
    })

    test('form inputs should have associated labels', async ({ page }) => {
      await page.goto('/login')
      const emailInput = page.getByTestId('login-email')
      const passwordInput = page.getByTestId('login-password')
      await expect(emailInput).toHaveAttribute('id', 'login-email')
      await expect(page.locator('label[for="login-email"]')).toContainText(/email/i)
      await expect(passwordInput).toHaveAttribute('id', 'login-password')
      await expect(page.locator('label[for="login-password"]')).toContainText(/password/i)
    })
  })
})
