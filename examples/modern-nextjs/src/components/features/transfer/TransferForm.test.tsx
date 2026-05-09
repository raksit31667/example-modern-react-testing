import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TransferForm } from './TransferForm'

function renderWithProviders(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })

  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  )
}

describe('TransferForm', () => {
  it('renders transfer form', () => {
    renderWithProviders(<TransferForm />)

    expect(screen.getByText('Transfer Funds')).toBeInTheDocument()
    expect(screen.getByLabelText('Amount')).toBeInTheDocument()
    expect(screen.getByLabelText('Recipient')).toBeInTheDocument()
    expect(screen.getByLabelText('Description (Optional)')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Transfer' })).toBeInTheDocument()
  })

  it('validates required fields', async () => {
    const user = userEvent.setup()

    renderWithProviders(<TransferForm />)

    const submitButton = screen.getByRole('button', { name: 'Transfer' })
    await user.click(submitButton)

    await waitFor(() => {
      // Zod validation shows "Expected number, received nan" for empty number input
      expect(screen.getByText('Expected number, received nan')).toBeInTheDocument()
      expect(screen.getByText('Recipient is required')).toBeInTheDocument()
    })
  })

  it('submits form with valid data', async () => {
    const user = userEvent.setup()

    renderWithProviders(<TransferForm />)

    await user.type(screen.getByLabelText('Amount'), '100')
    await user.type(screen.getByLabelText('Recipient'), 'John Doe')
    await user.type(screen.getByLabelText('Description (Optional)'), 'Test transfer')

    const submitButton = screen.getByRole('button', { name: 'Transfer' })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Transfer successful!')).toBeInTheDocument()
    })
  })

  it('shows processing state during submission', async () => {
    const user = userEvent.setup()

    renderWithProviders(<TransferForm />)

    await user.type(screen.getByLabelText('Amount'), '100')
    await user.type(screen.getByLabelText('Recipient'), 'John Doe')

    const submitButton = screen.getByRole('button', { name: 'Transfer' })
    await user.click(submitButton)

    expect(screen.getByRole('button', { name: 'Processing...' })).toBeInTheDocument()
  })

  it('resets form after successful submission', async () => {
    const user = userEvent.setup()

    renderWithProviders(<TransferForm />)

    const amountInput = screen.getByLabelText('Amount') as HTMLInputElement
    const recipientInput = screen.getByLabelText('Recipient') as HTMLInputElement

    await user.type(amountInput, '100')
    await user.type(recipientInput, 'John Doe')

    const submitButton = screen.getByRole('button', { name: 'Transfer' })
    await user.click(submitButton)

    await waitFor(() => {
      expect(amountInput.value).toBe('')
      expect(recipientInput.value).toBe('')
    })
  })
})
