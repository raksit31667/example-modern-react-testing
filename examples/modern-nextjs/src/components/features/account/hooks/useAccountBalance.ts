import { useQuery } from '@tanstack/react-query'
import { accountBalanceSchema, type AccountBalance } from '@/types/account'

interface UseAccountBalanceOptions {
  initialBalance?: AccountBalance
}

export function useAccountBalance(options?: UseAccountBalanceOptions) {
  return useQuery({
    queryKey: ['account', 'balance'],
    queryFn: async () => {
      const response = await fetch('/api/account/balance')
      if (!response.ok) throw new Error('Failed to fetch balance')
      const json = await response.json()
      return accountBalanceSchema.parse(json)
    },
    initialData: options?.initialBalance,
  })
}
