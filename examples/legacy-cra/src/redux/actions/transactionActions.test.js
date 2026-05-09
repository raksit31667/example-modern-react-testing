import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
  fetchTransactions,
  createTransaction,
  FETCH_TRANSACTIONS_REQUEST,
  FETCH_TRANSACTIONS_SUCCESS,
  FETCH_TRANSACTIONS_FAILURE,
  CREATE_TRANSACTION_REQUEST,
  CREATE_TRANSACTION_SUCCESS,
  CREATE_TRANSACTION_FAILURE,
} from './transactionActions'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('transactionActions', () => {
  describe('fetchTransactions', () => {
    it('dispatches FETCH_TRANSACTIONS_REQUEST and FETCH_TRANSACTIONS_SUCCESS on success', async () => {
      const store = mockStore({})
      
      await store.dispatch(fetchTransactions())
      
      const actions = store.getActions()
      
      expect(actions[0].type).toBe(FETCH_TRANSACTIONS_REQUEST)
      expect(actions[1].type).toBe(FETCH_TRANSACTIONS_SUCCESS)
      expect(Array.isArray(actions[1].payload)).toBe(true)
    })

    it('returns array of transactions', async () => {
      const store = mockStore({})
      
      await store.dispatch(fetchTransactions())
      
      const actions = store.getActions()
      const successAction = actions.find(action => action.type === FETCH_TRANSACTIONS_SUCCESS)
      
      expect(successAction).toBeDefined()
      expect(successAction.payload.length).toBeGreaterThan(0)
      expect(successAction.payload[0]).toHaveProperty('id')
      expect(successAction.payload[0]).toHaveProperty('description')
      expect(successAction.payload[0]).toHaveProperty('amount')
      expect(successAction.payload[0]).toHaveProperty('status')
    })
  })

  describe('createTransaction', () => {
    it('dispatches CREATE_TRANSACTION_REQUEST and CREATE_TRANSACTION_SUCCESS on success', async () => {
      const store = mockStore({})
      const transactionData = {
        amount: 100,
        recipient: 'John Doe',
        description: 'Test transfer',
      }
      
      await store.dispatch(createTransaction(transactionData))
      
      const actions = store.getActions()
      
      expect(actions[0].type).toBe(CREATE_TRANSACTION_REQUEST)
      expect(actions[1].type).toBe(CREATE_TRANSACTION_SUCCESS)
      expect(actions[2].type).toBe(FETCH_TRANSACTIONS_REQUEST)
    })

    it('creates transaction with correct data', async () => {
      const store = mockStore({})
      const transactionData = {
        amount: 100,
        recipient: 'John Doe',
        description: 'Test transfer',
      }
      
      await store.dispatch(createTransaction(transactionData))
      
      const actions = store.getActions()
      const successAction = actions.find(action => action.type === CREATE_TRANSACTION_SUCCESS)
      
      expect(successAction).toBeDefined()
      expect(successAction.payload).toMatchObject({
        amount: 100,
        recipient: 'John Doe',
        description: 'Test transfer',
        status: 'pending',
      })
      expect(successAction.payload).toHaveProperty('id')
      expect(successAction.payload).toHaveProperty('date')
    })

    it('refetches transactions after successful creation', async () => {
      const store = mockStore({})
      const transactionData = {
        amount: 100,
        recipient: 'John Doe',
      }
      
      await store.dispatch(createTransaction(transactionData))
      
      const actions = store.getActions()
      const fetchAction = actions.find(action => action.type === FETCH_TRANSACTIONS_REQUEST)
      
      expect(fetchAction).toBeDefined()
    })
  })
})
