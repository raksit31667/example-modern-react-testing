import type { Transaction } from '@/types/transaction'

export const transactionFixtures: Transaction[] = [
  {
    id: 'txn_1',
    amount: 1500.0,
    currency: 'USD',
    status: 'completed',
    description: 'Payment to vendor',
    recipient: 'Acme Corp',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: 'txn_2',
    amount: 5000.0,
    currency: 'USD',
    status: 'completed',
    description: 'Salary deposit',
    recipient: 'Company Payroll',
    createdAt: '2024-01-14T09:00:00Z',
    updatedAt: '2024-01-14T09:00:00Z',
  },
  {
    id: 'txn_3',
    amount: 250.0,
    currency: 'USD',
    status: 'pending',
    description: 'Utility bill payment',
    recipient: 'Electric Company',
    createdAt: '2024-01-13T14:20:00Z',
    updatedAt: '2024-01-13T14:20:00Z',
  },
  {
    id: 'txn_4',
    amount: 75.5,
    currency: 'USD',
    status: 'completed',
    description: 'Online purchase',
    recipient: 'Amazon',
    createdAt: '2024-01-12T16:45:00Z',
    updatedAt: '2024-01-12T16:45:00Z',
  },
  {
    id: 'txn_5',
    amount: 1200.0,
    currency: 'USD',
    status: 'failed',
    description: 'Wire transfer',
    recipient: 'International Bank',
    createdAt: '2024-01-11T11:00:00Z',
    updatedAt: '2024-01-11T11:30:00Z',
  },
]

export const pendingTransactions = transactionFixtures.filter(
  (t) => t.status === 'pending'
)

export const completedTransactions = transactionFixtures.filter(
  (t) => t.status === 'completed'
)

export const failedTransactions = transactionFixtures.filter(
  (t) => t.status === 'failed'
)
