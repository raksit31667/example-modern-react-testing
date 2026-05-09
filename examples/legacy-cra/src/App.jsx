import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AccountBalance from './components/AccountBalance/AccountBalance'
import TransactionList from './components/TransactionList/TransactionList'
import TransferForm from './components/TransferForm/TransferForm'
import ThemeToggle from './components/ThemeToggle/ThemeToggle'
import { initializeTheme } from './redux/actions/themeActions'
import './App.css'

function App() {
  const theme = useSelector((state) => state.theme.theme)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeTheme())
  }, [dispatch])

  return (
    <div className={`App ${theme === 'dark' ? 'dark-theme' : ''}`}>
      <header className="App-header">
        <div className="header-content">
          <div>
            <h1>Legacy Banking Dashboard</h1>
            <p className="subtitle">Built with Create React App (Deprecated)</p>
          </div>
          <ThemeToggle />
        </div>
      </header>
      
      <main className="App-main">
        <div className="dashboard-grid">
          <div className="dashboard-section">
            <AccountBalance />
          </div>
          
          <div className="dashboard-section">
            <TransferForm />
          </div>
          
          <div className="dashboard-section full-width">
            <TransactionList />
          </div>
        </div>
      </main>
      
      <footer className="App-footer">
        <p>⚠️ This is a legacy example for educational purposes only</p>
        <p>Do NOT use this pattern for new projects!</p>
      </footer>
    </div>
  )
}

export default App
