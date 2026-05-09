'use client'

import { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { transactionListResponseSchema, type Transaction, type TransactionStatus } from '@/types/transaction'
import { TransactionCard } from './TransactionCard'

interface Props {
  initialTransactions?: Transaction[]
}

export function TransactionList({ initialTransactions = [] }: Props) {
  const [filter, setFilter] = useState<TransactionStatus | 'all'>('all')

  // Fetch all transactions once - no status filter in API call
  const { data, isLoading, error } = useQuery({
    queryKey: ['transactions'], // Removed filter from queryKey
    queryFn: async () => {
      const response = await fetch('/api/transactions')
      if (!response.ok) throw new Error('Failed to fetch transactions')
      const json = await response.json()
      return transactionListResponseSchema.parse(json)
    },
    initialData: initialTransactions.length > 0 
      ? { data: initialTransactions, pagination: { page: 1, limit: 10, total: initialTransactions.length, totalPages: 1 } }
      : undefined,
  })

   // Without useMemo: filtering would run on every component render (expensive!)
   // With useMemo: filtering only runs when data?.data or filter changes
  const filteredTransactions = useMemo(() => {
    if (!data?.data) return []
    
    // If 'all' is selected, return all transactions
    if (filter === 'all') {
      return data.data
    }
    
    // Filter transactions by selected status
    // This operation can be expensive with large datasets
    return data.data.filter(transaction => transaction.status === filter)
  }, [data?.data, filter])

  if (error) {
    return (
      <div className="rounded-lg bg-surface p-6 shadow-sm border border-border">
        <h2 className="mb-4 text-xl font-semibold text-text-primary">Recent Transactions</h2>
        <div className="rounded-md bg-red-50 p-4 text-center">
          <p className="text-sm text-red-600">Error: {(error as Error).message}</p>
        </div>
      </div>
    )
  }

  const filters: Array<{ value: TransactionStatus | 'all'; label: string }> = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
    { value: 'failed', label: 'Failed' },
  ]

  return (
    <div className="rounded-lg bg-surface p-6 shadow-sm border border-border">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-text-primary">Recent Transactions</h2>
        <div className="flex gap-2">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                filter === f.value
                  ? 'bg-blue-500 text-white'
                  : 'bg-background text-text-primary hover:bg-border'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-lg bg-gray-200"></div>
          ))}
        </div>
      ) : filteredTransactions.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed border-border p-12 text-center">
          <p className="text-text-secondary">No transactions found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTransactions.map((transaction) => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))}
        </div>
      )}
    </div>
  )
}
