import type { Transaction } from '@/types/transaction'
import { formatCurrency, formatDate } from '@/lib/utils/format'

interface Props {
  transaction: Transaction
}

export function TransactionCard({ transaction }: Props) {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
    cancelled: 'bg-gray-100 text-gray-800',
  }

  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-surface p-4 hover:bg-surface/80">
      <div className="flex-1">
        <p className="font-medium text-text-primary">{transaction.description}</p>
        <p className="mt-1 text-sm text-text-secondary">{formatDate(transaction.createdAt)}</p>
      </div>
      <div className="flex flex-col items-end gap-2">
        <p className="text-lg font-semibold text-text-primary">
          {formatCurrency(transaction.amount, transaction.currency)}
        </p>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
            statusColors[transaction.status]
          }`}
        >
          {transaction.status}
        </span>
      </div>
    </div>
  )
}
