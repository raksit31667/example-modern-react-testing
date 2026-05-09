# Legacy Banking Dashboard (Create React App)

This is an example of a **legacy** React application built with Create React App, representing the "old way" of building React applications. This serves as a comparison point for the modern Next.js approach.

## What This Demonstrates

This legacy example shows common patterns from older React applications:
- ❌ Create React App (deprecated)
- ❌ Class Components
- ❌ Redux for state management
- ❌ Manual data fetching with useEffect
- ❌ CSS Modules for styling
- ❌ Jest with enzyme for testing
- ❌ No TypeScript
- ❌ Client-side only rendering

## Tech Stack (Legacy)

- **React 17** - Class Components and older patterns
- **Create React App** - Build tooling (deprecated)
- **Redux + Redux Thunk** - State management
- **CSS Modules** - Styling
- **Axios** - HTTP client
- **Jest + Enzyme** - Testing
- **JavaScript (ES6)** - No TypeScript

## Project Structure

```
legacy-cra/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── AccountBalance/
│   │   │   ├── AccountBalance.jsx
│   │   │   ├── AccountBalance.module.css
│   │   │   └── AccountBalance.test.js
│   │   ├── TransactionList/
│   │   │   ├── TransactionList.jsx
│   │   │   ├── TransactionList.module.css
│   │   │   └── TransactionList.test.js
│   │   └── TransferForm/
│   │       ├── TransferForm.jsx
│   │       ├── TransferForm.module.css
│   │       └── TransferForm.test.js
│   ├── redux/
│   │   ├── actions/
│   │   │   ├── accountActions.js
│   │   │   └── transactionActions.js
│   │   ├── reducers/
│   │   │   ├── accountReducer.js
│   │   │   ├── transactionReducer.js
│   │   │   └── index.js
│   │   └── store.js
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── App.css
│   └── index.js
├── package.json
└── README.md
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd examples/legacy-cra
npm install
```

### 2. Start Development Server

```bash
npm start
```

Runs on http://localhost:3000

### 3. Run Tests

```bash
npm test
```

### 4. Build for Production

```bash
npm run build
```

## Key Files to Review

### 1. Class Component Example

**src/components/AccountBalance/AccountBalance.jsx**
```jsx
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchAccountBalance } from '../../redux/actions/accountActions'
import styles from './AccountBalance.module.css'

class AccountBalance extends Component {
  componentDidMount() {
    this.props.fetchAccountBalance()
  }

  render() {
    const { balance, loading, error } = this.props

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Account Balance</h2>
        <p className={styles.amount}>${balance.toFixed(2)}</p>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  balance: state.account.balance,
  loading: state.account.loading,
  error: state.account.error,
})

const mapDispatchToProps = {
  fetchAccountBalance,
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountBalance)
```

### 2. Redux Action Example

**src/redux/actions/accountActions.js**
```javascript
import axios from 'axios'

export const FETCH_BALANCE_REQUEST = 'FETCH_BALANCE_REQUEST'
export const FETCH_BALANCE_SUCCESS = 'FETCH_BALANCE_SUCCESS'
export const FETCH_BALANCE_FAILURE = 'FETCH_BALANCE_FAILURE'

export const fetchAccountBalance = () => async (dispatch) => {
  dispatch({ type: FETCH_BALANCE_REQUEST })
  
  try {
    const response = await axios.get('/api/account/balance')
    dispatch({
      type: FETCH_BALANCE_SUCCESS,
      payload: response.data.balance,
    })
  } catch (error) {
    dispatch({
      type: FETCH_BALANCE_FAILURE,
      payload: error.message,
    })
  }
}
```

### 3. Redux Reducer Example

**src/redux/reducers/accountReducer.js**
```javascript
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
```

### 4. Manual Data Fetching with useEffect

**src/components/TransactionList/TransactionList.jsx**
```jsx
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './TransactionList.module.css'

function TransactionList() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true)
        const response = await axios.get('/api/transactions')
        setTransactions(response.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchTransactions()
  }, [])

  if (loading) return <div>Loading transactions...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className={styles.container}>
      <h2>Recent Transactions</h2>
      <ul className={styles.list}>
        {transactions.map((transaction) => (
          <li key={transaction.id} className={styles.item}>
            <span>{transaction.description}</span>
            <span>${transaction.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TransactionList
```

## Problems with This Approach

### 1. Build Tooling
- ❌ Create React App is deprecated
- ❌ Slow build times
- ❌ Large bundle sizes
- ❌ No built-in optimization

### 2. State Management
- ❌ Redux boilerplate is verbose
- ❌ Actions, reducers, constants everywhere
- ❌ Hard to maintain
- ❌ Overkill for simple state

### 3. Data Fetching
- ❌ Manual loading/error states
- ❌ No caching
- ❌ Race conditions possible
- ❌ Waterfall requests

### 4. Styling
- ❌ CSS Modules require imports
- ❌ No utility-first approach
- ❌ Hard to maintain consistency
- ❌ No design system

### 5. Testing
- ❌ Enzyme is deprecated
- ❌ Tests implementation details
- ❌ Hard to test Redux
- ❌ No MSW for API mocking

### 6. Type Safety
- ❌ No TypeScript
- ❌ Runtime errors
- ❌ Poor IDE support
- ❌ Hard to refactor

### 7. Performance
- ❌ Client-side only rendering
- ❌ Poor SEO
- ❌ Slow initial load
- ❌ All JavaScript to client

## Migration Path

See the `modern-nextjs` example for how to modernize this application with:
- ✅ Next.js App Router
- ✅ TypeScript
- ✅ TanStack Query
- ✅ Tailwind CSS
- ✅ Vitest + React Testing Library
- ✅ MSW for API mocking
- ✅ Server Components
- ✅ Zod for validation

## Learning Objectives

By studying this legacy example, you'll understand:
1. Why Create React App was deprecated
2. The problems with Redux boilerplate
3. Manual data fetching pitfalls
4. CSS Modules limitations
5. Why we moved to modern tooling

## Comparison Exercise

Compare this file with the equivalent in `modern-nextjs`:

| Feature | Legacy CRA | Modern Next.js |
|---------|-----------|----------------|
| Build Tool | CRA | Next.js + Vite |
| Components | Class + Hooks | Functional + Hooks |
| State | Redux | TanStack Query + Context |
| Styling | CSS Modules | Tailwind CSS v4 |
| Types | JavaScript | TypeScript |
| Testing | Jest + Enzyme | Vitest + RTL |
| API Mocking | Manual mocks | MSW |
| Rendering | Client-side | Server + Client |
| Data Fetching | useEffect + axios | Server Components + TanStack Query |
| Validation | Manual | Zod |

## Next Steps

1. Review the code in this legacy example
2. Identify pain points and anti-patterns
3. Compare with the modern Next.js example
4. Understand the benefits of modern tooling
5. Practice migrating components to modern patterns

---

**Note:** This is intentionally a "bad" example to demonstrate legacy patterns. Do NOT use this as a template for new projects!
