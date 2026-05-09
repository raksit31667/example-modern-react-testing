import { z } from 'zod'

export const transactionSchema = z.object({
  id: z.string(),
  amount: z.number().positive(),
  currency: z.string().length(3),
  status: z.enum(['pending', 'completed', 'failed', 'cancelled']),
  description: z.string().min(1).max(255),
  recipient: z.string().min(1),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

export const transactionListResponseSchema = z.object({
  data: z.array(transactionSchema),
  pagination: z.object({
    page: z.number().int().positive(),
    limit: z.number().int().positive(),
    total: z.number().int().nonnegative(),
    totalPages: z.number().int().nonnegative(),
  }),
})

export const createTransactionSchema = z.object({
  amount: z.number().positive('Amount must be positive'),
  recipient: z.string().min(1, 'Recipient is required'),
  description: z.string().max(255, 'Description too long').optional(),
})

export type Transaction = z.infer<typeof transactionSchema>
export type TransactionListResponse = z.infer<typeof transactionListResponseSchema>
export type CreateTransactionInput = z.infer<typeof createTransactionSchema>
export type TransactionStatus = Transaction['status']
