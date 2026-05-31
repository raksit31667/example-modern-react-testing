import { test, expect } from '@playwright/test'

test.describe('Theme Toggle E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display theme toggle button on page load', async ({ page }) => {
    const themeToggle = page.getByTestId('theme-toggle')
    await expect(themeToggle).toBeVisible()
  })

  test('should show light mode by default', async ({ page }) => {
    const themeToggle = page.getByTestId('theme-toggle')
    await expect(themeToggle).toContainText('Dark Mode')
    await expect(themeToggle).toContainText('🌙')
  })

  test('should toggle to dark mode when clicked', async ({ page }) => {
    const themeToggle = page.getByTestId('theme-toggle')
    
    await themeToggle.click()
    
    await expect(themeToggle).toContainText('Light Mode')
    await expect(themeToggle).toContainText('☀️')
  })

  test('should have proper accessibility attributes', async ({ page }) => {
    const themeToggle = page.getByTestId('theme-toggle')
    
    await expect(themeToggle).toHaveAttribute('aria-label', 'Switch to dark mode')
    
    await themeToggle.click()
    await expect(themeToggle).toHaveAttribute('aria-label', 'Switch to light mode')
  })
})
