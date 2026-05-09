import {
  FETCH_BALANCE_REQUEST,
  FETCH_BALANCE_SUCCESS,
  FETCH_BALANCE_FAILURE,
} from '../actions/accountActions'

const initialState = {
  balance: 0,
  loading: false,
  error: null,
}

export default function accountReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_BALANCE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case FETCH_BALANCE_SUCCESS:
      return {
        ...state,
        balance: action.payload,
        loading: false,
      }
    case FETCH_BALANCE_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    default:
      return state
  }
}
