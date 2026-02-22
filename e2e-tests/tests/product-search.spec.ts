import { test, expect } from '@playwright/test'
import { VIEWPORTS, setViewport } from '../helpers/test-helpers'

test.describe('Product Search', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/products')
    await expect(page.getByTestId('product-search-page')).toBeVisible({ timeout: 10000 })
  })

  test.describe('Search', () => {
    test('search with valid query returns results', async ({ page }) => {
      await page.getByTestId('product-search-input').fill('headphones')
      await page.getByTestId('search-submit').click()
      await expect(page.getByTestId('product-card').filter({ hasText: /headphones/i })).toBeVisible()
      await expect(page.getByTestId('results-count')).toContainText(/result/i)
    })

    test('search with no results shows empty state', async ({ page }) => {
      await page.getByTestId('product-search-input').fill('xyznonexistentproduct123')
      await page.getByTestId('search-submit').click()
      await expect(page.getByTestId('empty-results')).toBeVisible()
      await expect(page.getByTestId('empty-results')).toContainText(/no products found/i)
      await expect(page.getByTestId('product-card')).toHaveCount(0)
    })

    test('search filters by description', async ({ page }) => {
      await page.getByTestId('product-search-input').fill('leather')
      await page.getByTestId('search-submit').click()
      await expect(page.getByTestId('product-card')).toHaveCount(2)
      await expect(page.getByTestId('product-card').first()).toContainText(/leather/i)
    })
  })

  test.describe('Filters', () => {
    test('apply single category filter', async ({ page }) => {
      await page.getByTestId('category-filter').selectOption('Electronics')
      await expect(page.getByTestId('results-count')).toContainText(/3 results?/i)
      await expect(page.getByTestId('product-card').first()).toContainText(/headphones|wireless|keyboard|speaker/i)
    })

    test('apply multiple filters', async ({ page }) => {
      await page.getByTestId('category-filter').selectOption('Accessories')
      await page.getByTestId('price-min').fill('50')
      await page.getByTestId('price-max').fill('150')
      const count = await page.getByTestId('product-card').count()
      expect(count).toBeGreaterThan(0)
      await expect(page.getByTestId('results-count')).toBeVisible()
    })

    test('clear all filters resets state', async ({ page }) => {
      await page.getByTestId('product-search-input').fill('watch')
      await page.getByTestId('category-filter').selectOption('Accessories')
      await page.getByTestId('price-min').fill('80')
      await page.getByTestId('search-submit').click()
      await expect(page.getByTestId('clear-filters')).toBeVisible()
      await page.getByTestId('clear-filters').click()
      await expect(page.getByTestId('product-search-input')).toHaveValue('')
      await expect(page.getByTestId('category-filter')).toHaveValue('All')
      await expect(page.getByTestId('price-min')).toHaveValue('')
      await expect(page.getByTestId('price-max')).toHaveValue('')
      await expect(page.getByTestId('product-card')).toHaveCount(6)
    })
  })

  test.describe('Sort', () => {
    test('sort by price low to high', async ({ page }) => {
      await page.getByTestId('sort-select').selectOption('price_asc')
      const cards = page.getByTestId('product-card')
      await expect(cards.first()).toContainText(/\$29\.99|\$34\.99/)
    })

    test('sort by price high to low', async ({ page }) => {
      await page.getByTestId('sort-select').selectOption('price_desc')
      const cards = page.getByTestId('product-card')
      await expect(cards.first()).toContainText(/\$179\.99|\$159\.99/)
    })

    test('sort by rating', async ({ page }) => {
      await page.getByTestId('sort-select').selectOption('rating')
      const cards = page.getByTestId('product-card')
      await expect(cards.first()).toContainText(/running sneakers|classic analog watch|mechanical keyboard/i)
    })
  })

  test.describe('Pagination', () => {
    test('pagination navigation', async ({ page }) => {
      await expect(page.getByTestId('pagination')).toBeVisible()
      await expect(page.getByTestId('pagination-info')).toContainText(/page 1 of 2/i)
      await expect(page.getByTestId('pagination-prev')).toBeDisabled()
      await page.getByTestId('pagination-next').click()
      await expect(page.getByTestId('pagination-info')).toContainText(/page 2 of 2/i)
      await expect(page.getByTestId('pagination-next')).toBeDisabled()
      await page.getByTestId('pagination-prev').click()
      await expect(page.getByTestId('pagination-info')).toContainText(/page 1 of 2/i)
    })

    test('pagination shows correct products per page', async ({ page }) => {
      await expect(page.getByTestId('product-card')).toHaveCount(6)
      await page.getByTestId('pagination-next').click()
      await expect(page.getByTestId('product-card')).toHaveCount(6)
    })
  })

  test.describe('Error handling', () => {
    test('search query too long shows error', async ({ page }) => {
      const longQuery = 'a'.repeat(101)
      await page.getByTestId('product-search-input').fill(longQuery)
      await page.getByTestId('search-submit').click()
      await expect(page.getByTestId('search-error')).toBeVisible()
      await expect(page.getByTestId('search-error')).toContainText(/too long/i)
    })

    test('empty results has clear filters button', async ({ page }) => {
      await page.getByTestId('product-search-input').fill('nonexistent123')
      await page.getByTestId('search-submit').click()
      await expect(page.getByTestId('empty-results')).toBeVisible()
      await page.getByTestId('empty-clear-filters').click()
      await expect(page.getByTestId('product-card')).toHaveCount(6)
    })
  })

  test.describe('Responsive viewports', () => {
    test('works on mobile viewport', async ({ page }) => {
      await setViewport(page, 'mobile')
      await page.goto('/products')
      await expect(page.getByTestId('product-search-page')).toBeVisible()
      await page.getByTestId('product-search-input').fill('watch')
      await page.getByTestId('search-submit').click()
      await expect(page.getByTestId('product-card').first()).toContainText(/watch/i)
    })

    test('works on tablet viewport', async ({ page }) => {
      await setViewport(page, 'tablet')
      await page.goto('/products')
      await expect(page.getByTestId('product-search-page')).toBeVisible()
      await page.getByTestId('category-filter').selectOption('Clothing')
      await expect(page.getByTestId('product-card')).toHaveCount(2)
    })

    test('works on desktop viewport', async ({ page }) => {
      await setViewport(page, 'desktop')
      await page.goto('/products')
      await expect(page.getByTestId('product-search-page')).toBeVisible()
      await expect(page.getByTestId('filters-sidebar')).toBeVisible()
      await expect(page.getByTestId('product-grid')).toBeVisible()
    })
  })
})
