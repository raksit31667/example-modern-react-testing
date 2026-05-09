import { z } from 'zod'

export const accountSchema = z.object({
  id: z.string(),
  userId: z.string(),
  balance: z.number().nonnegative(),
  currency: z.string().length(3),
  accountNumber: z.string(),
  accountType: z.enum(['checking', 'savings', 'investment']),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

export const accountBalanceSchema = z.object({
  balance: z.number().nonnegative(),
  currency: z.string().length(3),
  availableBalance: z.number().nonnegative().optional(),
})

export type Account = z.infer<typeof accountSchema>
export type AccountBalance = z.infer<typeof accountBalanceSchema>
export type AccountType = Account['accountType']
