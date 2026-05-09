import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { ThemeToggle } from './ThemeToggle'

describe('ThemeToggle', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
    // Reset document attribute
    if (document.documentElement.hasAttribute('data-theme')) {
      document.documentElement.removeAttribute('data-theme')
    }
  })

  it('renders with light theme by default', async () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    )

    // Wait for ThemeProvider to mount
    await screen.findByRole('button', { name: /switch to dark mode/i })
    
    const button = screen.getByRole('button', { name: /switch to dark mode/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Dark Mode')
    expect(button).toHaveTextContent('🌙')
  })

  it('toggles theme when clicked', async () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    )

    const button = await screen.findByRole('button')
    
    // Initially light theme
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
    expect(button).toHaveTextContent('Dark Mode')

    // Click to toggle to dark
    fireEvent.click(button)
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    expect(button).toHaveTextContent('Light Mode')
    expect(button).toHaveTextContent('☀️')

    // Click to toggle back to light
    fireEvent.click(button)
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
    expect(button).toHaveTextContent('Dark Mode')
    expect(button).toHaveTextContent('🌙')
  })

  it('persists theme to localStorage', async () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    )

    const button = await screen.findByRole('button')
    
    // Toggle to dark
    fireEvent.click(button)
    expect(localStorage.getItem('theme')).toBe('dark')

    // Toggle back to light
    fireEvent.click(button)
    expect(localStorage.getItem('theme')).toBe('light')
  })

  it('has proper accessibility attributes', async () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    )

    const button = await screen.findByRole('button')
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode')
    expect(button).toHaveAttribute('data-testid', 'theme-toggle')
  })

  it('initializes from localStorage if available', async () => {
    // Set dark theme in localStorage
    localStorage.setItem('theme', 'dark')

    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    )

    const button = await screen.findByRole('button')
    expect(button).toHaveTextContent('Light Mode')
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })

  it('respects system preference when no localStorage value', async () => {
    // Mock matchMedia to prefer dark mode
    const mockMatchMedia = vi.fn().mockImplementation((query) => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: mockMatchMedia,
    })

    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    )

    const button = await screen.findByRole('button')
    expect(button).toHaveTextContent('Light Mode')
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })

  it('throws error when used outside ThemeProvider', () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => {
      render(<ThemeToggle />)
    }).toThrow('useTheme must be used within ThemeProvider')

    consoleSpy.mockRestore()
  })
})
