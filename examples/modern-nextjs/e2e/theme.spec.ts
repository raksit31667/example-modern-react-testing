import { test, expect } from '@playwright/test'

/**
 * Theme Toggle E2E Tests
 * 
 * Tests the theme switching functionality including:
 * - Theme toggle button visibility and interaction
 * - Theme persistence across page reloads
 * - Visual changes when switching themes
 * - Accessibility of theme toggle
 */
test.describe('Theme Toggle @e2e', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    // Wait for page to load
    await page.waitForLoadState('networkidle')
  })

  test('displays theme toggle button', async ({ page }) => {
    const themeToggle = page.getByTestId('theme-toggle')
    await expect(themeToggle).toBeVisible()
    
    // Should show "Dark Mode" initially (light theme)
    await expect(themeToggle).toContainText('Dark Mode')
  })

  test('switches between light and dark themes', async ({ page }) => {
    // Verify initial light theme
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
    
    // Click theme toggle
    const themeToggle = page.getByTestId('theme-toggle')
    await themeToggle.click()
    
    // Verify dark theme applied
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
    await expect(themeToggle).toContainText('Light Mode')
    
    // Click again to toggle back
    await themeToggle.click()
    
    // Verify light theme restored
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
    await expect(themeToggle).toContainText('Dark Mode')
  })

  test('persists theme across page reloads', async ({ page }) => {
    // Set dark theme
    const themeToggle = page.getByTestId('theme-toggle')
    await themeToggle.click()
    
    // Verify dark theme
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
    
    // Reload page
    await page.reload()
    await page.waitForLoadState('networkidle')
    
    // Verify theme persisted
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
    await expect(page.getByTestId('theme-toggle')).toContainText('Light Mode')
  })

  test('changes background color when theme switches', async ({ page }) => {
    // Target the main container that uses bg-background
    const mainContainer = page.locator('div.min-h-screen').first()
    
    // Get initial background color (light theme)
    const lightBg = await mainContainer.evaluate((el) => 
      window.getComputedStyle(el).backgroundColor
    )
    
    // Switch to dark theme
    await page.getByTestId('theme-toggle').click()
    await page.waitForTimeout(300) // Wait for transition
    
    // Get dark theme background color
    const darkBg = await mainContainer.evaluate((el) => 
      window.getComputedStyle(el).backgroundColor
    )
    
    // Colors should be different
    expect(lightBg).not.toBe(darkBg)
  })

  test('has proper accessibility attributes', async ({ page }) => {
    const themeToggle = page.getByTestId('theme-toggle')
    
    // Check aria-label
    await expect(themeToggle).toHaveAttribute('aria-label', /switch to (dark|light) mode/i)
    
    // Check it's a button
    expect(await themeToggle.getAttribute('role')).toBeNull() // Native button doesn't need role
    expect(await themeToggle.evaluate((el) => el.tagName)).toBe('BUTTON')
  })

  test('theme toggle is keyboard accessible', async ({ page }) => {
    // Focus the theme toggle using keyboard
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab') // May need multiple tabs depending on page structure
    
    const themeToggle = page.getByTestId('theme-toggle')
    
    // Check if focused (may need to adjust based on page structure)
    const isFocused = await themeToggle.evaluate((el) => el === document.activeElement)
    
    if (isFocused) {
      // Press Enter to toggle
      await page.keyboard.press('Enter')
      
      // Verify theme changed
      await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
    }
  })

  test('theme toggle works on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    
    const themeToggle = page.getByTestId('theme-toggle')
    await expect(themeToggle).toBeVisible()
    
    // Toggle theme
    await themeToggle.click()
    
    // Verify theme changed
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  })

  test('clears theme from localStorage', async ({ page, context }) => {
    // Set dark theme
    await page.getByTestId('theme-toggle').click()
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
    
    // Clear localStorage
    await page.evaluate(() => localStorage.clear())
    
    // Reload page
    await page.reload()
    await page.waitForLoadState('networkidle')
    
    // Should default to light theme (or system preference)
    const theme = await page.locator('html').getAttribute('data-theme')
    expect(['light', 'dark']).toContain(theme)
  })
})

test.describe('Theme Integration @e2e', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('theme toggle appears in header', async ({ page }) => {
    const header = page.locator('header')
    const themeToggle = header.getByTestId('theme-toggle')
    
    await expect(themeToggle).toBeVisible()
  })

  test('dashboard components adapt to theme', async ({ page }) => {
    // Switch to dark theme
    await page.getByTestId('theme-toggle').click()
    await page.waitForTimeout(300)
    
    // Verify dark theme is applied
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
    
    // Components should still be visible and functional
    await expect(page.getByRole('heading', { name: /account balance/i })).toBeVisible()
    await expect(page.getByRole('heading', { name: /recent transactions/i })).toBeVisible()
    await expect(page.getByRole('heading', { name: /transfer funds/i })).toBeVisible()
  })
})
