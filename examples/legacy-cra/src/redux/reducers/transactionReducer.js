import {
  FETCH_TRANSACTIONS_REQUEST,
  FETCH_TRANSACTIONS_SUCCESS,
  FETCH_TRANSACTIONS_FAILURE,
  CREATE_TRANSACTION_REQUEST,
  CREATE_TRANSACTION_SUCCESS,
  CREATE_TRANSACTION_FAILURE,
} from '../actions/transactionActions'

const initialState = {
  list: [],
  loading: false,
  error: null,
  creating: false,
  createError: null,
}

export default function transactionReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TRANSACTIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case FETCH_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        loading: false,
      }
    case FETCH_TRANSACTIONS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case CREATE_TRANSACTION_REQUEST:
      return {
        ...state,
        creating: true,
        createError: null,
      }
    case CREATE_TRANSACTION_SUCCESS:
      return {
        ...state,
        creating: false,
      }
    case CREATE_TRANSACTION_FAILURE:
      return {
        ...state,
        createError: action.payload,
        creating: false,
      }
    default:
      return state
  }
}
