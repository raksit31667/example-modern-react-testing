import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
  fetchAccountBalance,
  FETCH_BALANCE_REQUEST,
  FETCH_BALANCE_SUCCESS,
  FETCH_BALANCE_FAILURE,
} from './accountActions'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('accountActions', () => {
  describe('fetchAccountBalance', () => {
    it('dispatches FETCH_BALANCE_REQUEST and FETCH_BALANCE_SUCCESS on success', async () => {
      const store = mockStore({})
      
      await store.dispatch(fetchAccountBalance())
      
      const actions = store.getActions()
      
      expect(actions[0].type).toBe(FETCH_BALANCE_REQUEST)
      expect(actions[1].type).toBe(FETCH_BALANCE_SUCCESS)
      expect(actions[1].payload).toBe(15000.50)
    })

    it('includes balance in success action', async () => {
      const store = mockStore({})
      
      await store.dispatch(fetchAccountBalance())
      
      const actions = store.getActions()
      const successAction = actions.find(action => action.type === FETCH_BALANCE_SUCCESS)
      
      expect(successAction).toBeDefined()
      expect(typeof successAction.payload).toBe('number')
      expect(successAction.payload).toBeGreaterThan(0)
    })
  })
})
