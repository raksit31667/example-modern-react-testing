import accountReducer from './accountReducer'
import {
  FETCH_BALANCE_REQUEST,
  FETCH_BALANCE_SUCCESS,
  FETCH_BALANCE_FAILURE,
} from '../actions/accountActions'

describe('accountReducer', () => {
  const initialState = {
    balance: 0,
    loading: false,
    error: null,
  }

  it('returns initial state', () => {
    expect(accountReducer(undefined, {})).toEqual(initialState)
  })

  it('handles FETCH_BALANCE_REQUEST', () => {
    const action = { type: FETCH_BALANCE_REQUEST }
    const state = accountReducer(initialState, action)

    expect(state).toEqual({
      balance: 0,
      loading: true,
      error: null,
    })
  })

  it('handles FETCH_BALANCE_SUCCESS', () => {
    const action = {
      type: FETCH_BALANCE_SUCCESS,
      payload: 15000.50,
    }
    const state = accountReducer(initialState, action)

    expect(state).toEqual({
      balance: 15000.50,
      loading: false,
      error: null,
    })
  })

  it('handles FETCH_BALANCE_FAILURE', () => {
    const action = {
      type: FETCH_BALANCE_FAILURE,
      payload: 'Network error',
    }
    const state = accountReducer(initialState, action)

    expect(state).toEqual({
      balance: 0,
      loading: false,
      error: 'Network error',
    })
  })

  it('clears error on new request', () => {
    const stateWithError = {
      balance: 0,
      loading: false,
      error: 'Previous error',
    }
    const action = { type: FETCH_BALANCE_REQUEST }
    const state = accountReducer(stateWithError, action)

    expect(state.error).toBeNull()
    expect(state.loading).toBe(true)
  })
})
