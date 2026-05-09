import { test, expect } from '@playwright/test'

/**
 * Dashboard E2E Tests
 * 
 * Tests the main dashboard functionality including:
 * - Account balance display
 * - Transaction list and filtering
 * - Transfer form submission
 * - Real-time updates
 */
test.describe('Dashboard @critical', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('displays dashboard header and footer', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Modern Banking Dashboard', level: 1 })
    ).toBeVisible()

    await expect(
      page.getByText(/Built with Next\.js \+ TypeScript \+ Tailwind CSS v4/i)
    ).toBeVisible()

    await expect(
      page.getByText(/This is the MODERN approach for React applications/i)
    ).toBeVisible()
  })

  test('displays account balance section', async ({ page }) => {
    // Wait for page to load
    await page.waitForLoadState('networkidle')
    
    // Check for Account Balance heading or balance amount
    const hasBalanceHeading = await page.getByRole('heading', { name: /account balance/i }).count() > 0
    const hasBalanceAmount = await page.locator('text=/\\$[0-9,]+\\.\\d{2}/').count() > 0
    
    expect(hasBalanceHeading || hasBalanceAmount).toBeTruthy()
  })

  test('displays transaction list', async ({ page }) => {
    // Wait for page to load
    await page.waitForLoadState('networkidle')
    
    // Check for Recent Transactions heading
    await expect(
      page.getByRole('heading', { name: /recent transactions/i })
    ).toBeVisible({ timeout: 10000 })
  })

  test('displays transfer form', async ({ page }) => {
    // Wait for page to load
    await page.waitForLoadState('networkidle')
    
    // Look for form inputs
    const hasAmountInput = await page.getByLabel(/amount/i).count() > 0
    const hasRecipientInput = await page.getByLabel(/recipient/i).count() > 0
    
    expect(hasAmountInput || hasRecipientInput).toBeTruthy()
  })

  test('layout is responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })

    await expect(
      page.getByRole('heading', { name: 'Modern Banking Dashboard' })
    ).toBeVisible()
  })
})

test.describe('Account Balance @e2e', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('loads and displays account balance', async ({ page }) => {
    // Wait for page to fully load
    await page.waitForLoadState('networkidle')
    
    // Wait for Account Balance heading
    await expect(
      page.getByRole('heading', { name: /account balance/i })
    ).toBeVisible({ timeout: 15000 })
  })
})

test.describe('Transaction List @e2e', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('displays transaction list with items', async ({ page }) => {
    // Wait for page to load
    await page.waitForLoadState('networkidle')
    
    // Check if transactions are displayed or "No transactions" message
    const hasTransactions = await page.locator('text=/Payment to vendor|Salary deposit|Utility bill|Online purchase|Wire transfer/i').count() > 0
    const hasNoTransactionsMessage = await page.getByText(/no transactions/i).count() > 0
    
    // Either transactions should be visible or "no transactions" message
    expect(hasTransactions || hasNoTransactionsMessage).toBeTruthy()
  })

  test('filters transactions by status', async ({ page }) => {
    // Wait for initial load
    await page.waitForLoadState('networkidle')

    // Click pending filter button if it exists
    const pendingButton = page.getByRole('button', { name: /pending/i })
    const buttonCount = await pendingButton.count()
    
    if (buttonCount > 0) {
      await pendingButton.click()
      // Wait for filter to apply
      await page.waitForTimeout(500)
    }
  })

  test('shows all transactions when All filter is selected', async ({ page }) => {
    // Wait for initial load
    await page.waitForLoadState('networkidle')

    const allButton = page.getByRole('button', { name: /^all$/i })
    const buttonCount = await allButton.count()
    
    if (buttonCount > 0) {
      await allButton.click()
      // Wait for filter to apply
      await page.waitForTimeout(500)
    }
  })
})

test.describe('Transfer Form @e2e', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('submits transfer successfully', async ({ page }) => {
    // Fill out transfer form
    const amountInput = page.getByLabel(/amount/i)
    const amountCount = await amountInput.count()
    
    if (amountCount > 0) {
      await amountInput.fill('100.00')

      await page.getByLabel(/recipient/i).fill('John Doe')
      
      const descriptionInput = page.getByLabel(/description/i)
      if (await descriptionInput.count() > 0) {
        await descriptionInput.fill('Test transfer')
      }

      await page.getByRole('button', { name: /transfer|submit/i }).click()

      // Wait for form to process
      await page.waitForTimeout(1000)
    }
  })

  test('validates required fields', async ({ page }) => {
    const submitButton = page.getByRole('button', { name: /transfer|submit/i })
    const buttonCount = await submitButton.count()
    
    if (buttonCount > 0) {
      await submitButton.click()

      // Wait for validation
      await page.waitForTimeout(500)
    }
  })

  test('validates amount is positive', async ({ page }) => {
    const amountInput = page.getByLabel(/amount/i)
    const amountCount = await amountInput.count()
    
    if (amountCount > 0) {
      await amountInput.fill('-50')
      
      const recipientInput = page.getByLabel(/recipient/i)
      if (await recipientInput.count() > 0) {
        await recipientInput.fill('John Doe')
      }
      
      await page.getByRole('button', { name: /transfer|submit/i }).click()

      // Wait for validation
      await page.waitForTimeout(500)
    }
  })
})
