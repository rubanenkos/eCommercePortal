import { test, expect } from '@playwright/test'

export const VALID_USER = {
  name: 'Test User',
  email: `user-${Date.now()}@example.com`,
  password: 'SecurePass123!',
}

test.describe('Multi-step form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/register/multi-step')
    await expect(page.getByTestId('multi-step-form')).toBeVisible({ timeout: 10000 })
  })

  test.describe('Field validation', () => {
    test('required fields show error on step 1', async ({ page }) => {
      await page.getByTestId('btn-next').click()
      await expect(page.getByTestId('ms-name-error')).toContainText(/required/i)
      await expect(page.getByTestId('ms-email-error')).toContainText(/required/i)
    })

    test('name format validation - min length', async ({ page }) => {
      await page.getByTestId('ms-name').fill('A')
      await page.getByTestId('ms-email').fill('valid@example.com')
      await page.getByTestId('btn-next').click()
      await expect(page.getByTestId('ms-name-error')).toContainText(/at least 2 characters/i)
    })

    test('name format validation - max length', async ({ page }) => {
      await page.getByTestId('ms-name').fill('A'.repeat(51))
      await page.getByTestId('ms-email').fill('valid@example.com')
      await page.getByTestId('btn-next').click()
      await expect(page.getByTestId('ms-name-error')).toContainText(/at most 50 characters/i)
    })

    test('email format validation', async ({ page }) => {
      await page.getByTestId('ms-name').fill('Valid Name')
      await page.getByTestId('ms-email').fill('invalid-email')
      await page.getByTestId('btn-next').click()
      await expect(page.getByTestId('ms-email-error')).toContainText(/valid email/i)
    })

    test('password format validation - min length', async ({ page }) => {
      await page.getByTestId('ms-name').fill('Valid Name')
      await page.getByTestId('ms-email').fill('valid@example.com')
      await page.getByTestId('btn-next').click()
      await page.getByTestId('ms-password').fill('short')
      await page.getByTestId('ms-confirm-password').fill('short')
      await page.getByTestId('btn-next').click()
      await expect(page.getByTestId('ms-password-error')).toContainText(/at least 8 characters/i)
    })

    test('password format validation - max length', async ({ page }) => {
      await page.getByTestId('ms-name').fill('Valid Name')
      await page.getByTestId('ms-email').fill('valid@example.com')
      await page.getByTestId('btn-next').click()
      await page.getByTestId('ms-password').fill('a'.repeat(51))
      await page.getByTestId('ms-confirm-password').fill('a'.repeat(51))
      await page.getByTestId('btn-next').click()
      await expect(page.getByTestId('ms-password-error')).toContainText(/at most 50 characters/i)
    })

    test('password match validation', async ({ page }) => {
      await page.getByTestId('ms-name').fill('Valid Name')
      await page.getByTestId('ms-email').fill('valid@example.com')
      await page.getByTestId('btn-next').click()
      await page.getByTestId('ms-password').fill('SecurePass123!')
      await page.getByTestId('ms-confirm-password').fill('DifferentPass123!')
      await page.getByTestId('btn-next').click()
      await expect(page.getByTestId('ms-confirm-password-error')).toContainText(/do not match/i)
    })

    test('terms acceptance required on step 3', async ({ page }) => {
      await page.getByTestId('ms-name').fill('Valid Name')
      await page.getByTestId('ms-email').fill('valid@example.com')
      await page.getByTestId('btn-next').click()
      await page.getByTestId('ms-password').fill('SecurePass123!')
      await page.getByTestId('ms-confirm-password').fill('SecurePass123!')
      await page.getByTestId('btn-next').click()
      await page.getByTestId('btn-submit').click()
      await expect(page.getByTestId('ms-accept-terms-error')).toContainText(/accept the terms/i)
    })
  })

  test.describe('Step navigation', () => {
    test('next navigates to step 2', async ({ page }) => {
      await page.getByTestId('ms-name').fill('Test User')
      await page.getByTestId('ms-email').fill('test@example.com')
      await page.getByTestId('btn-next').click()
      await expect(page.getByTestId('step-1')).toBeVisible()
      await expect(page.getByTestId('ms-password')).toBeVisible()
    })

    test('next navigates to step 3', async ({ page }) => {
      await page.getByTestId('ms-name').fill('Test User')
      await page.getByTestId('ms-email').fill('test@example.com')
      await page.getByTestId('btn-next').click()
      await page.getByTestId('ms-password').fill('SecurePass123!')
      await page.getByTestId('ms-confirm-password').fill('SecurePass123!')
      await page.getByTestId('btn-next').click()
      await expect(page.getByTestId('step-2')).toBeVisible()
      await expect(page.getByTestId('review-summary')).toBeVisible()
      await expect(page.getByTestId('btn-submit')).toBeVisible()
    })

    test('previous navigates back to step 1', async ({ page }) => {
      await page.getByTestId('ms-name').fill('Test User')
      await page.getByTestId('ms-email').fill('test@example.com')
      await page.getByTestId('btn-next').click()
      await expect(page.getByTestId('step-1')).toBeVisible()
      await page.getByTestId('btn-previous').click()
      await expect(page.getByTestId('step-0')).toBeVisible()
      await expect(page.getByTestId('ms-name')).toHaveValue('Test User')
    })

    test('previous navigates back to step 2 from step 3', async ({ page }) => {
      await page.getByTestId('ms-name').fill('Test User')
      await page.getByTestId('ms-email').fill('test@example.com')
      await page.getByTestId('btn-next').click()
      await page.getByTestId('ms-password').fill('SecurePass123!')
      await page.getByTestId('ms-confirm-password').fill('SecurePass123!')
      await page.getByTestId('btn-next').click()
      await page.getByTestId('btn-previous').click()
      await expect(page.getByTestId('step-1')).toBeVisible()
    })

    test('step indicator shows current step', async ({ page }) => {
      await expect(page.getByTestId('step-indicator-0')).toHaveAttribute('aria-current', 'step')
      await page.getByTestId('ms-name').fill('Test User')
      await page.getByTestId('ms-email').fill('test@example.com')
      await page.getByTestId('btn-next').click()
      await expect(page.getByTestId('step-indicator-1')).toHaveAttribute('aria-current', 'step')
    })
  })

  test.describe('Form submission', () => {
    test('successful submission shows success state', async ({ page }) => {
      await page.getByTestId('ms-name').fill(VALID_USER.name)
      await page.getByTestId('ms-email').fill(VALID_USER.email)
      await page.getByTestId('btn-next').click()
      await page.getByTestId('ms-password').fill(VALID_USER.password)
      await page.getByTestId('ms-confirm-password').fill(VALID_USER.password)
      await page.getByTestId('btn-next').click()
      await page.getByTestId('ms-accept-terms').check()
      await page.getByTestId('btn-submit').click()
      await expect(page.getByTestId('registration-success')).toBeVisible({ timeout: 5000 })
      await expect(page.getByTestId('registration-success')).toContainText(/successful/i)
    })

    test('successful submission redirects to dashboard', async ({ page }) => {
      await page.getByTestId('ms-name').fill(VALID_USER.name)
      await page.getByTestId('ms-email').fill(VALID_USER.email)
      await page.getByTestId('btn-next').click()
      await page.getByTestId('ms-password').fill(VALID_USER.password)
      await page.getByTestId('ms-confirm-password').fill(VALID_USER.password)
      await page.getByTestId('btn-next').click()
      await page.getByTestId('ms-accept-terms').check()
      await page.getByTestId('btn-submit').click()
      await expect(page.getByTestId('registration-success')).toBeVisible({ timeout: 5000 })
      await page.waitForURL(/dashboard/, { timeout: 5000 })
    })

    test('submission error shows error message', async ({ page }) => {
      await page.getByTestId('ms-name').fill('Test User')
      await page.getByTestId('ms-email').fill('error@example.com')
      await page.getByTestId('btn-next').click()
      await page.getByTestId('ms-password').fill('SecurePass123!')
      await page.getByTestId('ms-confirm-password').fill('SecurePass123!')
      await page.getByTestId('btn-next').click()
      await page.getByTestId('ms-accept-terms').check()
      await page.getByTestId('btn-submit').click()
      await expect(page.getByTestId('submit-error')).toBeVisible({ timeout: 5000 })
      await expect(page.getByTestId('submit-error')).toContainText(/failed/i)
    })
  })

  test.describe('Error messages', () => {
    test('error messages have role="alert"', async ({ page }) => {
      await page.getByTestId('btn-next').click()
      await expect(page.getByRole('alert').first()).toContainText(/required/i)
    })

    test('errors clear when user corrects input', async ({ page }) => {
      await page.getByTestId('btn-next').click()
      await expect(page.getByTestId('ms-name-error')).toBeVisible()
      await page.getByTestId('ms-name').fill('Valid Name')
      await page.getByTestId('ms-email').fill('valid@example.com')
      await page.getByTestId('btn-next').click()
      await expect(page.getByTestId('step-1')).toBeVisible()
    })
  })

  test.describe('Accessibility', () => {
    test('form has proper labels', async ({ page }) => {
      await expect(page.getByLabel(/name/i)).toBeVisible()
      await expect(page.getByLabel(/email/i)).toBeVisible()
      await page.getByTestId('ms-name').fill('Test User')
      await page.getByTestId('ms-email').fill('test@example.com')
      await page.getByTestId('btn-next').click()
      await expect(page.getByLabel(/^password$/i).first()).toBeVisible()
      await expect(page.getByLabel(/confirm password/i)).toBeVisible()
    })

    test('inputs have associated labels', async ({ page }) => {
      await expect(page.getByTestId('ms-name')).toHaveAttribute('id', 'ms-name')
      await expect(page.locator('label[for="ms-name"]')).toContainText(/name/i)
      await expect(page.getByTestId('ms-email')).toHaveAttribute('id', 'ms-email')
      await expect(page.locator('label[for="ms-email"]')).toContainText(/email/i)
      await page.getByTestId('ms-name').fill('Test User')
      await page.getByTestId('ms-email').fill('test@example.com')
      await page.getByTestId('btn-next').click()
      await expect(page.getByTestId('ms-password')).toHaveAttribute('id', 'ms-password')
      await expect(page.locator('label[for="ms-password"]')).toContainText(/password/i)
    })

    test('invalid inputs have aria-invalid', async ({ page }) => {
      await page.getByTestId('btn-next').click()
      await expect(page.getByTestId('ms-name')).toHaveAttribute('aria-invalid', 'true')
    })

    test('error messages are aria-describedby', async ({ page }) => {
      await page.getByTestId('btn-next').click()
      await expect(page.getByTestId('ms-name')).toHaveAttribute('aria-describedby', 'ms-name-error')
    })

    test('navigation buttons have aria-labels', async ({ page }) => {
      await page.getByTestId('ms-name').fill('Test User')
      await page.getByTestId('ms-email').fill('test@example.com')
      await page.getByTestId('btn-next').click()
      await expect(page.getByRole('button', { name: /previous step/i })).toBeVisible()
      await expect(page.getByRole('button', { name: /next step/i })).toBeVisible()
    })
  })
})
