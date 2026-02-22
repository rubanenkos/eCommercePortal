import { test as base } from '@playwright/test'

export interface AuthUser {
  email: string
  password: string
  name?: string
}

export const testUser: AuthUser = {
  email: 'test@example.com',
  password: 'TestPassword123!',
  name: 'Test User',
}

export const test = base.extend<{ authenticatedPage: void; testUser: AuthUser }>({
  testUser: async ({}, use) => {
    await use(testUser)
  },
  authenticatedPage: async ({ page, testUser }, use) => {
    await page.goto('/login')
    await page.getByLabel(/email/i).fill(testUser.email)
    await page.getByLabel(/password/i).fill(testUser.password)
    await page.getByRole('button', { name: /log in|sign in/i }).click()
    await page.waitForURL(/\/team\b/, { timeout: 10000 })
    await use()
  },
})

export { expect } from '@playwright/test'
