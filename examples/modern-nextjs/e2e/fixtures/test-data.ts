/**
 * Test Data Fixtures for E2E Tests
 * 
 * Centralized test data to ensure consistency across tests
 * and make it easy to update test scenarios.
 */

export const testTransactions = [
  {
    id: 'txn_test_1',
    amount: 1500.00,
    currency: 'USD',
    status: 'completed' as const,
    description: 'Payment to vendor',
    createdAt: new Date('2024-01-15T10:30:00Z').toISOString(),
    updatedAt: new Date('2024-01-15T10:30:00Z').toISOString(),
  },
  {
    id: 'txn_test_2',
    amount: 250.00,
    currency: 'USD',
    status: 'pending' as const,
    description: 'Transfer to savings',
    createdAt: new Date('2024-01-14T14:20:00Z').toISOString(),
    updatedAt: new Date('2024-01-14T14:20:00Z').toISOString(),
  },
  {
    id: 'txn_test_3',
    amount: 75.50,
    currency: 'USD',
    status: 'completed' as const,
    description: 'Online purchase',
    createdAt: new Date('2024-01-13T09:15:00Z').toISOString(),
    updatedAt: new Date('2024-01-13T09:15:00Z').toISOString(),
  },
  {
    id: 'txn_test_4',
    amount: 500.00,
    currency: 'USD',
    status: 'failed' as const,
    description: 'Failed payment',
    createdAt: new Date('2024-01-12T16:45:00Z').toISOString(),
    updatedAt: new Date('2024-01-12T16:45:00Z').toISOString(),
  },
]

export const testAccountBalance = {
  balance: 15000.50,
  currency: 'USD',
}

export const testTransferData = {
  valid: {
    amount: 100.00,
    recipient: 'John Doe',
    description: 'Test transfer',
  },
  invalidAmount: {
    amount: -50,
    recipient: 'John Doe',
    description: 'Invalid amount',
  },
  missingRecipient: {
    amount: 100.00,
    recipient: '',
    description: 'Missing recipient',
  },
  longDescription: {
    amount: 100.00,
    recipient: 'John Doe',
    description: 'a'.repeat(300),
  },
}

export const mockApiResponses = {
  transactionList: (transactions = testTransactions, status?: string) => {
    const filtered = status && status !== 'all'
      ? transactions.filter((t) => t.status === status)
      : transactions

    return {
      data: filtered,
      pagination: {
        page: 1,
        limit: 10,
        total: filtered.length,
        totalPages: 1,
      },
    }
  },

  transactionCreated: (data: any) => ({
    id: 'txn_new_' + Date.now(),
    ...data,
    status: 'pending',
    currency: 'USD',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }),

  accountBalance: (balance = testAccountBalance) => balance,

  error: (message: string, status = 400) => ({
    error: message,
    status,
  }),
}
