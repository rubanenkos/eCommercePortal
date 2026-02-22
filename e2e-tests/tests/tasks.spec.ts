import { test, expect } from '../fixtures/auth.fixture'

test.describe('Task Management', () => {
  test.beforeEach(async ({ page, testUser }) => {
    await page.goto('/login')
    await page.getByTestId('login-email').fill(testUser.email)
    await page.getByTestId('login-password').fill(testUser.password)
    await page.getByTestId('login-submit').click()
    await page.waitForURL(/\/team\b/, { timeout: 10000 })
    await page.goto('/dashboard')
    await page.waitForURL(/\/dashboard\b/, { timeout: 10000 })
  })

  test.describe('Create task', () => {
    test('should create a new task', async ({ page }) => {
      const taskTitle = `E2E Task ${Date.now()}`
      await page.getByTestId('new-task-input').fill(taskTitle)
      await page.getByTestId('add-task-button').click()
      await expect(page.getByText(taskTitle)).toBeVisible()
    })

    test('should not create task with empty title', async ({ page }) => {
      await expect(page.getByTestId('task-card')).toHaveCount(4)
      await page.getByTestId('add-task-button').click()
      await expect(page.getByTestId('task-card')).toHaveCount(4)
    })
  })

  test.describe('Edit task', () => {
    test('should change task status to done', async ({ page }) => {
      const firstCard = page.getByTestId('task-card').first()
      const statusSelect = firstCard.getByRole('combobox', { name: /change status/i })
      await statusSelect.selectOption('done')
      await expect(statusSelect).toHaveValue('done')
    })

    test('should change task status to in progress', async ({ page }) => {
      const todoCard = page.getByTestId('task-card').filter({ hasText: /review project|update documentation|team standup|fix login/i }).first()
      const statusSelect = todoCard.getByRole('combobox', { name: /change status/i })
      await statusSelect.selectOption('in_progress')
      await expect(statusSelect).toHaveValue('in_progress')
    })
  })

  test.describe('Mark task as complete', () => {
    test('should mark task as complete via status dropdown', async ({ page }) => {
      const firstCard = page.getByTestId('task-card').first()
      const statusSelect = firstCard.getByRole('combobox', { name: /change status/i })
      await statusSelect.selectOption('done')
      await expect(statusSelect).toHaveValue('done')
      await expect(firstCard).toContainText(/done/i)
    })
  })

  test.describe('Delete task', () => {
    test('should delete a task', async ({ page }) => {
      const taskTitle = 'Review project proposal'
      const card = page.getByTestId('task-card').filter({ hasText: taskTitle })
      await expect(card).toBeVisible()
      await card.getByTestId('task-delete').click()
      await expect(page.getByText(taskTitle)).not.toBeVisible()
    })
  })

  test.describe('Filter and search', () => {
    test('should filter tasks by status', async ({ page }) => {
      await page.getByTestId('task-filter').selectOption('done')
      const cards = page.getByTestId('task-card')
      await expect(cards).toHaveCount(1, { timeout: 5000 })
      await expect(cards.first()).toContainText(/team standup prep|done/i)
    })

    test('should search tasks by title', async ({ page }) => {
      await page.getByTestId('task-search').fill('login')
      await expect(page.getByText(/fix login bug/i)).toBeVisible()
      await expect(page.getByText(/review project proposal/i)).not.toBeVisible()
    })

    test('should show no results when search has no matches', async ({ page }) => {
      await page.getByTestId('task-search').fill('xyznonexistent123')
      const cards = page.getByTestId('task-card')
      await expect(cards).toHaveCount(0)
    })
  })
})
