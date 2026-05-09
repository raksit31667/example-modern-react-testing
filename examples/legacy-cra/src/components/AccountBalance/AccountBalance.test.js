import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import AccountBalance from './AccountBalance'
import accountReducer from '../../redux/reducers/accountReducer'

const createMockStore = (initialState) => {
  return createStore(
    (state = initialState) => state,
    applyMiddleware(thunk)
  )
}

describe('AccountBalance', () => {
  it('renders loading state', () => {
    const store = createMockStore({
      account: {
        balance: 0,
        loading: true,
        error: null,
      },
    })

    render(
      <Provider store={store}>
        <AccountBalance />
      </Provider>
    )

    expect(screen.getByText('Loading balance...')).toBeInTheDocument()
  })

  it('renders error state', () => {
    const store = createMockStore({
      account: {
        balance: 0,
        loading: false,
        error: 'Failed to fetch balance',
      },
    })

    render(
      <Provider store={store}>
        <AccountBalance />
      </Provider>
    )

    expect(screen.getByText(/Error: Failed to fetch balance/i)).toBeInTheDocument()
  })

  it('renders account balance', () => {
    const store = createMockStore({
      account: {
        balance: 15000.50,
        loading: false,
        error: null,
      },
    })

    render(
      <Provider store={store}>
        <AccountBalance />
      </Provider>
    )

    expect(screen.getByText('Account Balance')).toBeInTheDocument()
    expect(screen.getByText('$15000.50')).toBeInTheDocument()
    expect(screen.getByText('Available Balance')).toBeInTheDocument()
  })

  it('fetches balance on mount', () => {
    const store = createMockStore({
      account: {
        balance: 0,
        loading: false,
        error: null,
      },
    })

    const dispatchSpy = jest.spyOn(store, 'dispatch')

    render(
      <Provider store={store}>
        <AccountBalance />
      </Provider>
    )

    expect(dispatchSpy).toHaveBeenCalled()
  })
})
