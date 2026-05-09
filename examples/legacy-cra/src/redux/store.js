import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import accountReducer from './reducers/accountReducer'
import transactionReducer from './reducers/transactionReducer'
import themeReducer from './reducers/themeReducer'

const rootReducer = combineReducers({
  account: accountReducer,
  transactions: transactionReducer,
  theme: themeReducer,
})

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)
