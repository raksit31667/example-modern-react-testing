import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import TransferForm from './TransferForm'

const createMockStore = (initialState) => {
  return createStore(
    (state = initialState) => state,
    applyMiddleware(thunk)
  )
}

describe('TransferForm', () => {
  it('renders transfer form', () => {
    const store = createMockStore({
      transactions: {
        creating: false,
        createError: null,
      },
    })

    render(
      <Provider store={store}>
        <TransferForm />
      </Provider>
    )

    expect(screen.getByText('Transfer Funds')).toBeInTheDocument()
    expect(screen.getByLabelText('Amount')).toBeInTheDocument()
    expect(screen.getByLabelText('Recipient')).toBeInTheDocument()
    expect(screen.getByLabelText('Description (Optional)')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Transfer' })).toBeInTheDocument()
  })

  it('validates amount field', async () => {
    const store = createMockStore({
      transactions: {
        creating: false,
        createError: null,
      },
    })

    render(
      <Provider store={store}>
        <TransferForm />
      </Provider>
    )

    const submitButton = screen.getByRole('button', { name: 'Transfer' })
    userEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Amount must be positive')).toBeInTheDocument()
    })
  })

  it('validates recipient field', async () => {
    const store = createMockStore({
      transactions: {
        creating: false,
        createError: null,
      },
    })

    render(
      <Provider store={store}>
        <TransferForm />
      </Provider>
    )

    userEvent.type(screen.getByLabelText('Amount'), '100')
    
    const submitButton = screen.getByRole('button', { name: 'Transfer' })
    userEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Recipient is required')).toBeInTheDocument()
    })
  })

  it('submits form with valid data', async () => {
    const store = createMockStore({
      transactions: {
        creating: false,
        createError: null,
      },
    })

    const dispatchSpy = jest.spyOn(store, 'dispatch')

    render(
      <Provider store={store}>
        <TransferForm />
      </Provider>
    )

    userEvent.type(screen.getByLabelText('Amount'), '100')
    userEvent.type(screen.getByLabelText('Recipient'), 'John Doe')
    userEvent.type(screen.getByLabelText('Description (Optional)'), 'Test transfer')

    const submitButton = screen.getByRole('button', { name: 'Transfer' })
    userEvent.click(submitButton)

    expect(dispatchSpy).toHaveBeenCalled()
  })

  it('shows processing state', () => {
    const store = createMockStore({
      transactions: {
        creating: true,
        createError: null,
      },
    })

    render(
      <Provider store={store}>
        <TransferForm />
      </Provider>
    )

    expect(screen.getByRole('button', { name: 'Processing...' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Processing...' })).toBeDisabled()
  })

  it('displays error message', () => {
    const store = createMockStore({
      transactions: {
        creating: false,
        createError: 'Transfer failed',
      },
    })

    render(
      <Provider store={store}>
        <TransferForm />
      </Provider>
    )

    expect(screen.getByText(/Transfer failed: Transfer failed/i)).toBeInTheDocument()
  })

  it('disables inputs during submission', () => {
    const store = createMockStore({
      transactions: {
        creating: true,
        createError: null,
      },
    })

    render(
      <Provider store={store}>
        <TransferForm />
      </Provider>
    )

    expect(screen.getByLabelText('Amount')).toBeDisabled()
    expect(screen.getByLabelText('Recipient')).toBeDisabled()
    expect(screen.getByLabelText('Description (Optional)')).toBeDisabled()
  })
})
