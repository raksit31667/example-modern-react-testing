'use client'

import { useTheme } from '@/contexts'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 rounded-lg bg-surface px-4 py-2 text-sm font-medium text-text-primary shadow-sm transition-colors hover:bg-primary/10 border border-border"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      data-testid="theme-toggle"
    >
      <span className="text-lg" aria-hidden="true">
        {theme === 'light' ? '🌙' : '☀️'}
      </span>
      <span>{theme === 'light' ? 'Dark' : 'Light'} Mode</span>
    </button>
  )
}
