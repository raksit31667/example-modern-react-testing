import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import TransactionList from './TransactionList'

const createMockStore = (initialState) => {
  return createStore(
    (state = initialState) => state,
    applyMiddleware(thunk)
  )
}

const mockTransactions = [
  {
    id: 'txn_1',
    description: 'Payment to vendor',
    amount: 1500.00,
    status: 'completed',
    date: '2024-01-15',
  },
  {
    id: 'txn_2',
    description: 'Salary deposit',
    amount: 5000.00,
    status: 'completed',
    date: '2024-01-14',
  },
  {
    id: 'txn_3',
    description: 'Utility bill payment',
    amount: 250.00,
    status: 'pending',
    date: '2024-01-13',
  },
]

describe('TransactionList', () => {
  it('renders loading state', () => {
    const store = createMockStore({
      transactions: {
        list: [],
        loading: true,
        error: null,
      },
    })

    render(
      <Provider store={store}>
        <TransactionList />
      </Provider>
    )

    expect(screen.getByText('Recent Transactions')).toBeInTheDocument()
    expect(screen.getByText('Loading transactions...')).toBeInTheDocument()
  })

  it('renders error state', () => {
    const store = createMockStore({
      transactions: {
        list: [],
        loading: false,
        error: 'Failed to fetch transactions',
      },
    })

    render(
      <Provider store={store}>
        <TransactionList />
      </Provider>
    )

    expect(screen.getByText(/Error: Failed to fetch transactions/i)).toBeInTheDocument()
  })

  it('renders empty state', () => {
    const store = createMockStore({
      transactions: {
        list: [],
        loading: false,
        error: null,
      },
    })

    render(
      <Provider store={store}>
        <TransactionList />
      </Provider>
    )

    expect(screen.getByText('No transactions found')).toBeInTheDocument()
  })

  it('renders transaction list', () => {
    const store = createMockStore({
      transactions: {
        list: mockTransactions,
        loading: false,
        error: null,
      },
    })

    render(
      <Provider store={store}>
        <TransactionList />
      </Provider>
    )

    expect(screen.getByText('Recent Transactions')).toBeInTheDocument()
    expect(screen.getByText('Payment to vendor')).toBeInTheDocument()
    expect(screen.getByText('$1500.00')).toBeInTheDocument()
    expect(screen.getByText('Salary deposit')).toBeInTheDocument()
    expect(screen.getByText('$5000.00')).toBeInTheDocument()
  })

  it('displays transaction status badges', () => {
    const store = createMockStore({
      transactions: {
        list: mockTransactions,
        loading: false,
        error: null,
      },
    })

    render(
      <Provider store={store}>
        <TransactionList />
      </Provider>
    )

    expect(screen.getAllByText('completed')).toHaveLength(2)
    expect(screen.getByText('pending')).toBeInTheDocument()
  })

  it('fetches transactions on mount', () => {
    const store = createMockStore({
      transactions: {
        list: [],
        loading: false,
        error: null,
      },
    })

    const dispatchSpy = jest.spyOn(store, 'dispatch')

    render(
      <Provider store={store}>
        <TransactionList />
      </Provider>
    )

    expect(dispatchSpy).toHaveBeenCalled()
  })

  it('displays filter buttons', () => {
    const store = createMockStore({
      transactions: {
        list: mockTransactions,
        loading: false,
        error: null,
      },
    })

    render(
      <Provider store={store}>
        <TransactionList />
      </Provider>
    )

    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Pending' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Completed' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Failed' })).toBeInTheDocument()
  })

  it('filters transactions by status', () => {
    const store = createMockStore({
      transactions: {
        list: mockTransactions,
        loading: false,
        error: null,
      },
    })

    const { rerender } = render(
      <Provider store={store}>
        <TransactionList />
      </Provider>
    )

    // Initially shows all transactions
    expect(screen.getByText('Payment to vendor')).toBeInTheDocument()
    expect(screen.getByText('Utility bill payment')).toBeInTheDocument()

    // Click pending filter
    const pendingButton = screen.getByRole('button', { name: 'Pending' })
    pendingButton.click()

    // Should show only pending transaction
    expect(screen.getByText('Utility bill payment')).toBeInTheDocument()
    expect(screen.queryByText('Payment to vendor')).not.toBeInTheDocument()
  })

  it('highlights active filter button', () => {
    const store = createMockStore({
      transactions: {
        list: mockTransactions,
        loading: false,
        error: null,
      },
    })

    render(
      <Provider store={store}>
        <TransactionList />
      </Provider>
    )

    const allButton = screen.getByRole('button', { name: 'All' })
    const pendingButton = screen.getByRole('button', { name: 'Pending' })

    // All button should be active initially
    expect(allButton.className).toContain('filterButtonActive')

    // Click pending button
    pendingButton.click()

    // Pending button should now be active
    expect(pendingButton.className).toContain('filterButtonActive')
  })
})
