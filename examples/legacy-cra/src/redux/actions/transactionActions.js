import axios from 'axios'

export const FETCH_TRANSACTIONS_REQUEST = 'FETCH_TRANSACTIONS_REQUEST'
export const FETCH_TRANSACTIONS_SUCCESS = 'FETCH_TRANSACTIONS_SUCCESS'
export const FETCH_TRANSACTIONS_FAILURE = 'FETCH_TRANSACTIONS_FAILURE'

export const CREATE_TRANSACTION_REQUEST = 'CREATE_TRANSACTION_REQUEST'
export const CREATE_TRANSACTION_SUCCESS = 'CREATE_TRANSACTION_SUCCESS'
export const CREATE_TRANSACTION_FAILURE = 'CREATE_TRANSACTION_FAILURE'

export const fetchTransactions = () => async (dispatch) => {
  dispatch({ type: FETCH_TRANSACTIONS_REQUEST })
  
  try {
    // Simulate API call with mock data
    // In real app: const response = await axios.get('/api/transactions')
    await new Promise(resolve => setTimeout(resolve, 800))
    
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
      {
        id: 'txn_4',
        description: 'Online purchase',
        amount: 75.50,
        status: 'completed',
        date: '2024-01-12',
      },
      {
        id: 'txn_5',
        description: 'Wire transfer',
        amount: 1200.00,
        status: 'failed',
        date: '2024-01-11',
      },
    ]
    
    dispatch({
      type: FETCH_TRANSACTIONS_SUCCESS,
      payload: mockTransactions,
    })
  } catch (error) {
    dispatch({
      type: FETCH_TRANSACTIONS_FAILURE,
      payload: error.message,
    })
  }
}

export const createTransaction = (transactionData) => async (dispatch) => {
  dispatch({ type: CREATE_TRANSACTION_REQUEST })
  
  try {
    // Simulate API call
    // In real app: const response = await axios.post('/api/transactions', transactionData)
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const newTransaction = {
      id: `txn_${Date.now()}`,
      ...transactionData,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
    }
    
    dispatch({
      type: CREATE_TRANSACTION_SUCCESS,
      payload: newTransaction,
    })
    
    // Refetch transactions after creating new one
    dispatch(fetchTransactions())
  } catch (error) {
    dispatch({
      type: CREATE_TRANSACTION_FAILURE,
      payload: error.message,
    })
  }
}
