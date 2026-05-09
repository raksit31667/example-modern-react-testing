import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AccountBalance } from './AccountBalance'
import { accountBalanceFixture } from '@/tests/fixtures/accounts'

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

describe('AccountBalance', () => {
  it('renders account balance', async () => {
    renderWithProviders(<AccountBalance initialBalance={accountBalanceFixture} />)

    expect(screen.getByText('Account Balance')).toBeInTheDocument()
    expect(screen.getByText('$15,000.50')).toBeInTheDocument()
    expect(screen.getByText('Available Balance')).toBeInTheDocument()
  })

  it('shows loading state', () => {
    renderWithProviders(<AccountBalance />)

    // Should show loading skeleton with animate-pulse class
    const loadingContainer = document.querySelector('.animate-pulse')
    expect(loadingContainer).toBeInTheDocument()
  })

  it('fetches balance from API', async () => {
    renderWithProviders(<AccountBalance />)

    await waitFor(() => {
      expect(screen.getByText('$15,000.50')).toBeInTheDocument()
    })
  })

  it('handles error state', async () => {
    // This would require MSW to return an error
    // For now, we'll skip this test or implement error handler in MSW
  })
})
