import { http, HttpResponse } from 'msw'
import { transactionFixtures } from '../fixtures/transactions'
import { accountBalanceFixture } from '../fixtures/accounts'

export const handlers = [
  // Get transactions - returns all transactions (filtering done client-side with useMemo)
  http.get('/api/transactions', () => {
    return HttpResponse.json({
      data: transactionFixtures,
      pagination: {
        page: 1,
        limit: 10,
        total: transactionFixtures.length,
        totalPages: 1,
      },
    })
  }),
  
  // Create transaction
  http.post('/api/transactions', async ({ request }) => {
    const body = await request.json() as Record<string, unknown>
    
    return HttpResponse.json(
      {
        id: `txn_${Date.now()}`,
        ...body,
        currency: 'USD',
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      { status: 201 }
    )
  }),
  
  // Get account balance
  http.get('/api/account/balance', () => {
    return HttpResponse.json(accountBalanceFixture)
  }),
  
  // Get single transaction
  http.get('/api/transactions/:id', ({ params }) => {
    const { id } = params
    const transaction = transactionFixtures.find((t) => t.id === id)
    
    if (!transaction) {
      return HttpResponse.json(
        { error: 'Transaction not found' },
        { status: 404 }
      )
    }
    
    return HttpResponse.json(transaction)
  }),
]
