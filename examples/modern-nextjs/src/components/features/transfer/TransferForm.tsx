'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTransactionSchema, type CreateTransactionInput } from '@/types/transaction'

export function TransferForm() {
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateTransactionInput>({
    resolver: zodResolver(createTransactionSchema),
  })

  const mutation = useMutation({
    mutationFn: async (data: CreateTransactionInput) => {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error('Transfer failed')

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      queryClient.invalidateQueries({ queryKey: ['account', 'balance'] })
      reset()
    },
  })

  const onSubmit = (data: CreateTransactionInput) => {
    mutation.mutate(data)
  }

  return (
    <div className="rounded-lg bg-surface p-6 shadow-sm border border-border">
      <h2 className="mb-6 text-xl font-semibold text-text-primary">Transfer Funds</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-text-primary">
            Amount
          </label>
          <input
            id="amount"
            type="number"
            step="0.01"
            {...register('amount', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border border-border bg-surface px-3 py-2 text-text-primary shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-background disabled:cursor-not-allowed"
            disabled={isSubmitting || mutation.isPending}
          />
          {errors.amount && (
            <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="recipient" className="block text-sm font-medium text-text-primary">
            Recipient
          </label>
          <input
            id="recipient"
            type="text"
            {...register('recipient')}
            className="mt-1 block w-full rounded-md border border-border bg-surface px-3 py-2 text-text-primary shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-background disabled:cursor-not-allowed"
            disabled={isSubmitting || mutation.isPending}
          />
          {errors.recipient && (
            <p className="mt-1 text-sm text-red-600">{errors.recipient.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-text-primary">
            Description (Optional)
          </label>
          <input
            id="description"
            type="text"
            {...register('description')}
            className="mt-1 block w-full rounded-md border border-border bg-surface px-3 py-2 text-text-primary shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-background disabled:cursor-not-allowed"
            disabled={isSubmitting || mutation.isPending}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || mutation.isPending}
          className="w-full rounded-md bg-blue-500 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {mutation.isPending ? 'Processing...' : 'Transfer'}
        </button>

        {mutation.isError && (
          <div className="rounded-md bg-red-50 p-4">
            <p className="text-sm text-red-600">
              Transfer failed: {(mutation.error as Error).message}
            </p>
          </div>
        )}

        {mutation.isSuccess && (
          <div className="rounded-md bg-green-50 p-4">
            <p className="text-sm text-green-600">
              Transfer successful!
            </p>
          </div>
        )}
      </form>
    </div>
  )
}
