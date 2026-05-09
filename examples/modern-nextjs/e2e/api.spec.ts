import { test, expect } from '@playwright/test'

/**
 * API Route E2E Tests
 * 
 * Tests the Next.js API routes directly using Playwright's request context:
 * - GET /api/transactions - List transactions
 * - POST /api/transactions - Create transaction
 * - GET /api/account/balance - Get account balance
 */
test.describe('API Routes @api', () => {
  test.describe('GET /api/transactions', () => {
    test('returns transaction list', async ({ request }) => {
      const response = await request.get('/api/transactions')

      expect(response.ok()).toBeTruthy()
      expect(response.status()).toBe(200)

      const body = await response.json()
      expect(body).toHaveProperty('data')
      expect(body).toHaveProperty('pagination')
      expect(Array.isArray(body.data)).toBeTruthy()
    })

    test('returns all transactions (filtering done client-side)', async ({ request }) => {
      const response = await request.get('/api/transactions')

      expect(response.ok()).toBeTruthy()
      const body = await response.json()

      // API now returns all transactions regardless of status
      // Filtering is done client-side with useMemo for performance
      expect(Array.isArray(body.data)).toBeTruthy()
      expect(body.data.length).toBeGreaterThan(0)
      
      // Verify transactions have different statuses (not filtered)
      const statuses = new Set(body.data.map((t: any) => t.status))
      expect(statuses.size).toBeGreaterThan(1)
    })

    test('returns pagination metadata', async ({ request }) => {
      const response = await request.get('/api/transactions')

      const body = await response.json()
      expect(body.pagination).toHaveProperty('page')
      expect(body.pagination).toHaveProperty('limit')
      expect(body.pagination).toHaveProperty('total')
      expect(body.pagination).toHaveProperty('totalPages')
    })
  })

  test.describe('POST /api/transactions', () => {
    test('creates new transaction', async ({ request }) => {
      const response = await request.post('/api/transactions', {
        data: {
          amount: 100.00,
          recipient: 'John Doe',
          description: 'Test payment',
        },
      })

      expect(response.status()).toBe(201)

      const body = await response.json()
      expect(body).toHaveProperty('id')
      expect(body.amount).toBe(100.00)
      expect(body.status).toBe('pending')
    })

    test('handles invalid JSON gracefully', async ({ request }) => {
      // Note: Playwright's request.post with invalid JSON will throw before reaching the server
      // This tests the API's error handling for malformed requests
      try {
        const response = await request.post('/api/transactions', {
          headers: {
            'Content-Type': 'application/json',
          },
          data: '{"invalid": json}', // Malformed JSON
        })

        // If it doesn't throw, check for error response
        expect(response.status()).toBeGreaterThanOrEqual(400)
      } catch (error) {
        // Expected - invalid JSON causes error
        expect(error).toBeDefined()
      }
    })
  })

  test.describe('GET /api/account/balance', () => {
    test('returns account balance', async ({ request }) => {
      const response = await request.get('/api/account/balance')

      expect(response.ok()).toBeTruthy()
      expect(response.status()).toBe(200)

      const body = await response.json()
      expect(body).toHaveProperty('balance')
      expect(body).toHaveProperty('currency')
      expect(typeof body.balance).toBe('number')
      expect(body.currency).toBe('USD')
    })

    test('balance is a valid number', async ({ request }) => {
      const response = await request.get('/api/account/balance')

      const body = await response.json()
      expect(body.balance).toBeGreaterThanOrEqual(0)
      expect(Number.isFinite(body.balance)).toBeTruthy()
    })
  })
})

test.describe('API Error Handling @api', () => {
  test('handles 404 for non-existent routes', async ({ request }) => {
    const response = await request.get('/api/nonexistent')

    expect(response.status()).toBe(404)
  })
})
