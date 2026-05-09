import transactionReducer from './transactionReducer'
import {
  FETCH_TRANSACTIONS_REQUEST,
  FETCH_TRANSACTIONS_SUCCESS,
  FETCH_TRANSACTIONS_FAILURE,
  CREATE_TRANSACTION_REQUEST,
  CREATE_TRANSACTION_SUCCESS,
  CREATE_TRANSACTION_FAILURE,
} from '../actions/transactionActions'

describe('transactionReducer', () => {
  const initialState = {
    list: [],
    loading: false,
    error: null,
    creating: false,
    createError: null,
  }

  it('returns initial state', () => {
    expect(transactionReducer(undefined, {})).toEqual(initialState)
  })

  describe('fetch transactions', () => {
    it('handles FETCH_TRANSACTIONS_REQUEST', () => {
      const action = { type: FETCH_TRANSACTIONS_REQUEST }
      const state = transactionReducer(initialState, action)

      expect(state).toEqual({
        ...initialState,
        loading: true,
        error: null,
      })
    })

    it('handles FETCH_TRANSACTIONS_SUCCESS', () => {
      const mockTransactions = [
        { id: 'txn_1', description: 'Test', amount: 100 },
      ]
      const action = {
        type: FETCH_TRANSACTIONS_SUCCESS,
        payload: mockTransactions,
      }
      const state = transactionReducer(initialState, action)

      expect(state).toEqual({
        ...initialState,
        list: mockTransactions,
        loading: false,
      })
    })

    it('handles FETCH_TRANSACTIONS_FAILURE', () => {
      const action = {
        type: FETCH_TRANSACTIONS_FAILURE,
        payload: 'Network error',
      }
      const state = transactionReducer(initialState, action)

      expect(state).toEqual({
        ...initialState,
        error: 'Network error',
        loading: false,
      })
    })
  })

  describe('create transaction', () => {
    it('handles CREATE_TRANSACTION_REQUEST', () => {
      const action = { type: CREATE_TRANSACTION_REQUEST }
      const state = transactionReducer(initialState, action)

      expect(state).toEqual({
        ...initialState,
        creating: true,
        createError: null,
      })
    })

    it('handles CREATE_TRANSACTION_SUCCESS', () => {
      const action = { type: CREATE_TRANSACTION_SUCCESS }
      const state = transactionReducer(
        { ...initialState, creating: true },
        action
      )

      expect(state).toEqual({
        ...initialState,
        creating: false,
      })
    })

    it('handles CREATE_TRANSACTION_FAILURE', () => {
      const action = {
        type: CREATE_TRANSACTION_FAILURE,
        payload: 'Validation error',
      }
      const state = transactionReducer(
        { ...initialState, creating: true },
        action
      )

      expect(state).toEqual({
        ...initialState,
        creating: false,
        createError: 'Validation error',
      })
    })

    it('clears createError on new request', () => {
      const stateWithError = {
        ...initialState,
        createError: 'Previous error',
      }
      const action = { type: CREATE_TRANSACTION_REQUEST }
      const state = transactionReducer(stateWithError, action)

      expect(state.createError).toBeNull()
      expect(state.creating).toBe(true)
    })
  })
})
