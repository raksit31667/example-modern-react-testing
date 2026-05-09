'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AccountBalance } from '@/components/features/account/AccountBalance'
import { TransactionList } from '@/components/features/transactions/TransactionList'
import { TransferForm } from '@/components/features/transfer/TransferForm'
import { ThemeProvider } from '@/contexts'
import { ThemeToggle } from '@/components/features/theme/ThemeToggle'
import { useState } from 'react'

function DashboardContent() {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-blue-900 px-8 py-6 text-white shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Modern Banking Dashboard</h1>
            <p className="mt-2 text-sm opacity-90">
              Built with Next.js + TypeScript + Tailwind CSS v4
            </p>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-7xl p-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Account Balance */}
          <div className="md:col-span-1">
            <AccountBalance />
          </div>

          {/* Transfer Form */}
          <div className="md:col-span-1">
            <TransferForm />
          </div>

          {/* Transaction List - Full width */}
          <div className="md:col-span-2 lg:col-span-3">
            <TransactionList />
          </div>
        </div>
      </main>

      <footer className="border-t-2 border-green-500 bg-green-50 px-8 py-4 text-center text-sm text-green-900">
        <p className="font-semibold">✅ This is the MODERN approach for React applications</p>
        <p className="mt-1">Compare with the legacy CRA example to see the improvements!</p>
      </footer>
    </div>
  )
}

export default function HomePage() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
          },
        },
      })
  )

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <DashboardContent />
      </QueryClientProvider>
    </ThemeProvider>
  )
}
