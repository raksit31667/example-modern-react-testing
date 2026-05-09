import { test, expect } from '@playwright/test'

/**
 * Homepage E2E Tests
 * 
 * Tests the homepage (now the dashboard) functionality including:
 * - Page rendering and content
 * - Dashboard components
 * - Responsive design elements
 */
test.describe('Homepage @smoke', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('displays main heading and description', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Modern Banking Dashboard', level: 1 })
    ).toBeVisible()

    await expect(
      page.getByText('Built with Next.js + TypeScript + Tailwind CSS v4')
    ).toBeVisible()
  })

  test('shows modern approach banner', async ({ page }) => {
    await expect(
      page.getByText('✅ This is the MODERN approach for React applications')
    ).toBeVisible()

    await expect(
      page.getByText('Compare with the legacy CRA example to see the improvements!')
    ).toBeVisible()
  })

  test('displays dashboard components', async ({ page }) => {
    // Wait for components to load
    await page.waitForTimeout(1000)
    
    // Check for account balance section
    const balanceSection = page.locator('text=Account Balance').locator('..')
      .or(page.getByRole('region', { name: /account balance/i }))
      .first()
    
    await expect(balanceSection).toBeVisible()
  })

  test('page is responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })

    await expect(
      page.getByRole('heading', { name: 'Modern Banking Dashboard' })
    ).toBeVisible()
  })
})
