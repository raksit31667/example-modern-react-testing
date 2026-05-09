'use client'

import { type AccountBalance } from '@/types/account'
import { formatCurrency } from '@/lib/utils/format'
import { useAccountBalance } from './hooks/useAccountBalance'

interface Props {
  initialBalance?: AccountBalance
}

export function AccountBalance({ initialBalance }: Props) {
  const { data, isLoading, error } = useAccountBalance({ initialBalance })

  if (error) {
    return (
      <div className="rounded-lg bg-surface p-6 shadow-sm border border-border">
        <div className="rounded-md bg-red-50 p-4 text-center">
          <p className="text-sm text-red-600">Error: {(error as Error).message}</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="rounded-lg bg-surface p-6 shadow-sm border border-border">
        <div className="animate-pulse text-center">
          <div className="mx-auto h-4 w-32 rounded bg-gray-200"></div>
          <div className="mx-auto mt-4 h-8 w-48 rounded bg-gray-200"></div>
          <div className="mx-auto mt-2 h-3 w-24 rounded bg-gray-200"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-lg bg-surface p-6 text-center shadow-sm border border-border">
      <h2 className="text-lg font-semibold text-text-primary">Account Balance</h2>
      <p className="mt-4 text-4xl font-bold text-primary">
        {data ? formatCurrency(data.balance, data.currency) : '$0.00'}
      </p>
      <p className="mt-2 text-sm text-text-secondary">Available Balance</p>
    </div>
  )
}
