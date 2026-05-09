import React from 'react'
import { connect } from 'react-redux'
import { toggleTheme } from '../../redux/actions/themeActions'
import styles from './ThemeToggle.module.css'

function ThemeToggle({ theme, toggleTheme }) {
  const handleToggle = () => {
    toggleTheme()
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

const mapStateToProps = (state) => ({
  theme: state.theme.theme,
})

const mapDispatchToProps = {
  toggleTheme,
}

export default connect(mapStateToProps, mapDispatchToProps)(ThemeToggle)
