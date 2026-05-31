'use client'

import { useTheme } from '../contexts/ThemeContext'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button onClick={toggleTheme}>
      <span>{theme === 'light' ? '🌙' : '☀️'}</span>
      <span>{theme === 'light' ? 'Dark' : 'Light'} Mode</span>
    </button>
  )
}
