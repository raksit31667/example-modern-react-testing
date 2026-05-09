import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TransactionList } from './TransactionList'
import { transactionFixtures } from '@/tests/fixtures/transactions'

function renderWithProviders(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  })

  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  )
}

describe('TransactionList', () => {
  it('renders initial transactions', () => {
    renderWithProviders(
      <TransactionList initialTransactions={transactionFixtures} />
    )

    expect(screen.getByText('Recent Transactions')).toBeInTheDocument()
    expect(screen.getByText('Payment to vendor')).toBeInTheDocument()
    expect(screen.getByText('$1,500.00')).toBeInTheDocument()
  })

  it('shows loading state', () => {
    renderWithProviders(<TransactionList />)

    // Should show loading skeletons
    const skeletons = screen.getAllByRole('generic')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('filters transactions by status using useMemo', async () => {
    const user = userEvent.setup()

    renderWithProviders(
      <TransactionList initialTransactions={transactionFixtures} />
    )

    // Initially shows all transactions
    expect(screen.getByText('Payment to vendor')).toBeInTheDocument()
    expect(screen.getByText('Utility bill payment')).toBeInTheDocument()
    expect(screen.getByText('Wire transfer')).toBeInTheDocument()

    // Click pending filter - should filter client-side with useMemo
    await user.click(screen.getByRole('button', { name: /pending/i }))

    // Should show only pending transactions (filtered by useMemo)
    await waitFor(() => {
      expect(screen.getByText('Utility bill payment')).toBeInTheDocument()
      expect(screen.queryByText('Payment to vendor')).not.toBeInTheDocument()
      expect(screen.queryByText('Wire transfer')).not.toBeInTheDocument()
    })

    // Click completed filter
    await user.click(screen.getByRole('button', { name: /completed/i }))

    // Should show only completed transactions
    await waitFor(() => {
      expect(screen.getByText('Payment to vendor')).toBeInTheDocument()
      expect(screen.getByText('Salary deposit')).toBeInTheDocument()
      expect(screen.queryByText('Utility bill payment')).not.toBeInTheDocument()
    })

    // Click failed filter
    await user.click(screen.getByRole('button', { name: /failed/i }))

    // Should show only failed transactions
    await waitFor(() => {
      expect(screen.getByText('Wire transfer')).toBeInTheDocument()
      expect(screen.queryByText('Payment to vendor')).not.toBeInTheDocument()
    })

    // Click all filter - should show all transactions again
    await user.click(screen.getByRole('button', { name: /all/i }))

    await waitFor(() => {
      expect(screen.getByText('Payment to vendor')).toBeInTheDocument()
      expect(screen.getByText('Utility bill payment')).toBeInTheDocument()
      expect(screen.getByText('Wire transfer')).toBeInTheDocument()
    })
  })

  it('shows empty state when no transactions', async () => {
    // Override the MSW handler to return empty transactions
    const { server } = await import('@/tests/mocks/server')
    const { http, HttpResponse } = await import('msw')
    
    server.use(
      http.get('/api/transactions', () => {
        return HttpResponse.json({
          data: [],
          pagination: {
            page: 1,
            limit: 10,
            total: 0,
            totalPages: 0,
          },
        })
      })
    )

    renderWithProviders(<TransactionList />)

    // Wait for the API call to complete and show empty state
    await waitFor(() => {
      expect(screen.getByText('No transactions found')).toBeInTheDocument()
    })
  })

  it('displays all filter buttons', () => {
    renderWithProviders(<TransactionList />)

    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Pending' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Completed' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Failed' })).toBeInTheDocument()
  })

  it('highlights active filter', async () => {
    const user = userEvent.setup()

    renderWithProviders(<TransactionList />)

    const completedButton = screen.getByRole('button', { name: 'Completed' })
    await user.click(completedButton)

    await waitFor(() => {
      expect(completedButton).toHaveClass('bg-blue-500')
    })
  })
})
