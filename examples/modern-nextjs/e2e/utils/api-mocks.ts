import { Page, Route } from '@playwright/test'
import { testTransactions, testAccountBalance, mockApiResponses } from '../fixtures/test-data'

/**
 * API Mocking Utilities for E2E Tests
 * 
 * Reusable functions to mock API endpoints consistently across tests.
 * Follows Playwright best practices for network interception.
 */

/**
 * Mock the transactions API endpoint
 */
export async function mockTransactionsApi(page: Page, options?: {
  transactions?: typeof testTransactions
  filterByStatus?: boolean
}) {
  const { transactions = testTransactions, filterByStatus = true } = options || {}

  await page.route('**/api/transactions*', (route: Route) => {
    const url = new URL(route.request().url())
    const status = url.searchParams.get('status')

    const response = filterByStatus
      ? mockApiResponses.transactionList(transactions, status || undefined)
      : mockApiResponses.transactionList(transactions)

    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(response),
    })
  })
}

/**
 * Mock the account balance API endpoint
 */
export async function mockAccountBalanceApi(page: Page, balance = testAccountBalance) {
  await page.route('**/api/account/balance', (route: Route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(balance),
    })
  })
}

/**
 * Mock transaction creation (POST)
 */
export async function mockTransactionCreation(page: Page, options?: {
  shouldSucceed?: boolean
  errorMessage?: string
}) {
  const { shouldSucceed = true, errorMessage = 'Transfer failed' } = options || {}

  await page.route('**/api/transactions', (route: Route) => {
    if (route.request().method() === 'POST') {
      if (shouldSucceed) {
        const requestBody = route.request().postDataJSON()
        route.fulfill({
          status: 201,
          contentType: 'application/json',
          body: JSON.stringify(mockApiResponses.transactionCreated(requestBody)),
        })
      } else {
        route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ error: errorMessage }),
        })
      }
    } else {
      route.continue()
    }
  })
}

/**
 * Mock API error response
 */
export async function mockApiError(page: Page, endpoint: string, statusCode = 500) {
  await page.route(endpoint, (route: Route) => {
    route.fulfill({
      status: statusCode,
      contentType: 'application/json',
      body: JSON.stringify({
        error: 'Internal server error',
        message: 'Something went wrong',
      }),
    })
  })
}

/**
 * Mock slow API response (for loading state testing)
 */
export async function mockSlowApi(page: Page, endpoint: string, delayMs = 2000) {
  await page.route(endpoint, async (route: Route) => {
    await new Promise((resolve) => setTimeout(resolve, delayMs))
    route.continue()
  })
}

/**
 * Setup all common API mocks for dashboard tests
 */
export async function setupDashboardMocks(page: Page) {
  await mockAccountBalanceApi(page)
  await mockTransactionsApi(page)
}
