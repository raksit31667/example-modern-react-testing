import type { Account, AccountBalance } from '@/types/account'

export const accountFixture: Account = {
  id: 'acc_1',
  userId: 'user_1',
  balance: 15000.5,
  currency: 'USD',
  accountNumber: '****1234',
  accountType: 'checking',
  createdAt: '2023-01-01T00:00:00Z',
  updatedAt: '2024-01-15T10:30:00Z',
}

export const accountBalanceFixture: AccountBalance = {
  balance: 15000.5,
  currency: 'USD',
  availableBalance: 14500.5,
}
