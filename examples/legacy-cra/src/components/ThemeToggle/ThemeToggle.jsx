import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '../../redux/actions/themeActions'
import styles from './ThemeToggle.module.css'

export default function ThemeToggle() {
  const theme = useSelector((state) => state.theme.theme)
  const dispatch = useDispatch()

  const handleToggle = () => {
    dispatch(toggleTheme())
  }

  return (
    <button
      onClick={handleToggle}
      className={styles.toggleButton}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      data-testid="theme-toggle"
    >
      <span className={styles.icon} aria-hidden="true">
        {theme === 'light' ? '🌙' : '☀️'}
      </span>
      <span className={styles.label}>
        {theme === 'light' ? 'Dark' : 'Light'} Mode
      </span>
    </button>
  )
}
