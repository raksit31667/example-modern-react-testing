import axios from 'axios'

export const FETCH_BALANCE_REQUEST = 'FETCH_BALANCE_REQUEST'
export const FETCH_BALANCE_SUCCESS = 'FETCH_BALANCE_SUCCESS'
export const FETCH_BALANCE_FAILURE = 'FETCH_BALANCE_FAILURE'

export const fetchAccountBalance = () => async (dispatch) => {
  dispatch({ type: FETCH_BALANCE_REQUEST })
  
  try {
    // Simulate API call with mock data
    // In real app: const response = await axios.get('/api/account/balance')
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const mockBalance = 15000.50
    
    dispatch({
      type: FETCH_BALANCE_SUCCESS,
      payload: mockBalance,
    })
  } catch (error) {
    dispatch({
      type: FETCH_BALANCE_FAILURE,
      payload: error.message,
    })
  }
}
