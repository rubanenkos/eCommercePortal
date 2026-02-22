import { test, expect } from '../fixtures/auth.fixture'

test.describe('Navigation', () => {
  test.beforeEach(async ({ page, testUser }) => {
    await page.goto('/login')
    await page.getByTestId('login-email').fill(testUser.email)
    await page.getByTestId('login-password').fill(testUser.password)
    await page.getByTestId('login-submit').click()
    await expect(page).toHaveURL(/\/team\b/)
  })

  test.describe('Navigate between pages', () => {
    test('should navigate to team from login', async ({ page, testUser }) => {
      await page.goto('/login')
      await page.getByTestId('login-email').fill(testUser.email)
      await page.getByTestId('login-password').fill(testUser.password)
      await page.getByTestId('login-submit').click()
      await expect(page).toHaveURL(/\/team\b/)
    })

    test('should navigate to settings via nav', async ({ page }) => {
      await page.getByRole('link', { name: /settings/i }).first().click()
      await expect(page).toHaveURL(/settings/)
    })

    test('should navigate back to team from settings via back button', async ({ page }) => {
      await page.getByRole('link', { name: /settings/i }).first().click()
      await expect(page).toHaveURL(/settings/)
      await page.goBack()
      await expect(page).toHaveURL(/\/team\b/)
    })

    test('should navigate via user menu to settings', async ({ page }) => {
      await page.goto('/dashboard')
      await page.waitForURL(/\/dashboard\b/, { timeout: 10000 })
      await page.getByRole('button', { name: /user menu/i }).click()
      await page.getByRole('menuitem', { name: /settings/i }).click()
      await expect(page).toHaveURL(/settings/)
    })
  })

  test.describe('Back button functionality', () => {
    test('should work with browser back button', async ({ page }) => {
      await page.getByRole('link', { name: /settings/i }).first().click()
      await expect(page).toHaveURL(/settings/)
      await page.goBack()
      await expect(page).toHaveURL(/\/team\b/)
    })

    test('should preserve team dashboard state after back from settings', async ({ page }) => {
      await expect(page.getByRole('heading', { name: /team dashboard/i })).toBeVisible()
      await page.getByRole('link', { name: /settings/i }).first().click()
      await page.goBack()
      await expect(page).toHaveURL(/\/team\b/)
      await expect(page.getByRole('heading', { name: /team dashboard/i })).toBeVisible()
    })
  })
})
