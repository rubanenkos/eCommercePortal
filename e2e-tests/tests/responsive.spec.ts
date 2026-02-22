import { test, expect } from '../fixtures/auth.fixture'
import { VIEWPORTS, setViewport } from '../helpers/test-helpers'

test.describe('Responsive Design', () => {
  test.describe('Mobile viewport (375x667)', () => {
    test.beforeEach(async ({ page }) => {
      await setViewport(page, 'mobile')
    })

    test('login page should be usable on mobile', async ({ page }) => {
      await page.goto('/login')
      await expect(page.getByTestId('login-form')).toBeVisible()
      await expect(page.getByTestId('login-email')).toBeVisible()
      await page.getByTestId('login-email').fill('test@example.com')
      await page.getByTestId('login-password').fill('TestPassword123!')
      await page.getByTestId('login-submit').click()
      await expect(page).toHaveURL(/dashboard/)
    })

    test('dashboard should show mobile menu button', async ({ page, testUser }) => {
      await page.goto('/login')
      await page.getByTestId('login-email').fill(testUser.email)
      await page.getByTestId('login-password').fill(testUser.password)
      await page.getByTestId('login-submit').click()
      await expect(page).toHaveURL(/dashboard/)

      await expect(page.getByRole('button', { name: /open menu/i })).toBeVisible()
    })

    test('task list should be visible and scrollable', async ({ page, testUser }) => {
      await page.goto('/login')
      await page.getByTestId('login-email').fill(testUser.email)
      await page.getByTestId('login-password').fill(testUser.password)
      await page.getByTestId('login-submit').click()
      await expect(page).toHaveURL(/dashboard/)

      await expect(page.getByTestId('task-list')).toBeVisible()
      await expect(page.getByTestId('task-card').first()).toBeVisible()
    })

    test('add task form should work on mobile', async ({ page, testUser }) => {
      await page.goto('/login')
      await page.getByTestId('login-email').fill(testUser.email)
      await page.getByTestId('login-password').fill(testUser.password)
      await page.getByTestId('login-submit').click()
      await expect(page).toHaveURL(/dashboard/)

      const taskTitle = `Mobile task ${Date.now()}`
      await page.getByTestId('new-task-input').fill(taskTitle)
      await page.getByTestId('add-task-button').click()
      await expect(page.getByText(taskTitle)).toBeVisible()
    })
  })

  test.describe('Tablet viewport (768x1024)', () => {
    test.beforeEach(async ({ page }) => {
      await setViewport(page, 'tablet')
    })

    test('login page should render correctly', async ({ page }) => {
      await page.goto('/login')
      await expect(page.getByTestId('login-form')).toBeVisible()
      await expect(page.getByRole('heading', { name: /sign in/i })).toBeVisible()
    })

    test('dashboard should display task grid', async ({ page, testUser }) => {
      await page.goto('/login')
      await page.getByTestId('login-email').fill(testUser.email)
      await page.getByTestId('login-password').fill(testUser.password)
      await page.getByTestId('login-submit').click()
      await expect(page).toHaveURL(/dashboard/)

      await expect(page.getByTestId('task-list')).toBeVisible()
      const cards = page.getByTestId('task-card')
      await expect(cards.first()).toBeVisible()
    })
  })

  test.describe('Desktop viewport (1280x720)', () => {
    test.beforeEach(async ({ page }) => {
      await setViewport(page, 'desktop')
    })

    test('full layout should be visible', async ({ page, testUser }) => {
      await page.goto('/login')
      await page.getByTestId('login-email').fill(testUser.email)
      await page.getByTestId('login-password').fill(testUser.password)
      await page.getByTestId('login-submit').click()
      await expect(page).toHaveURL(/dashboard/)

      await expect(page.getByRole('navigation')).toBeVisible()
      await expect(page.getByRole('main')).toBeVisible()
      await expect(page.getByTestId('task-list')).toBeVisible()
    })

    test('sidebar navigation should be visible', async ({ page, testUser }) => {
      await page.goto('/login')
      await page.getByTestId('login-email').fill(testUser.email)
      await page.getByTestId('login-password').fill(testUser.password)
      await page.getByTestId('login-submit').click()
      await expect(page).toHaveURL(/dashboard/)

      await expect(page.getByRole('link', { name: /settings/i })).toBeVisible()
    })
  })

  test.describe('Orientation changes', () => {
    test('should work in portrait orientation', async ({ page, testUser }) => {
      await page.setViewportSize({ width: 667, height: 375 })
      await page.goto('/login')
      await page.getByTestId('login-email').fill(testUser.email)
      await page.getByTestId('login-password').fill(testUser.password)
      await page.getByTestId('login-submit').click()
      await expect(page).toHaveURL(/dashboard/)
      await expect(page.getByTestId('task-list')).toBeVisible()
    })

    test('should work in landscape orientation', async ({ page, testUser }) => {
      await page.setViewportSize({ width: 1024, height: 768 })
      await page.goto('/login')
      await page.getByTestId('login-email').fill(testUser.email)
      await page.getByTestId('login-password').fill(testUser.password)
      await page.getByTestId('login-submit').click()
      await expect(page).toHaveURL(/dashboard/)
      await expect(page.getByTestId('task-list')).toBeVisible()
    })
  })
})
