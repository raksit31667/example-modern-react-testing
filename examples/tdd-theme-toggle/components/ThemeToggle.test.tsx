import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeToggle } from './ThemeToggle'
import { ThemeProvider } from '../contexts/ThemeContext'

describe('ThemeToggle', () => {
  it('should render theme toggle button', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    )
    
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('should display dark mode icon and text by default', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    )
    
    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('🌙')
    expect(button).toHaveTextContent('Dark Mode')
  })

  it('should toggle to dark mode when clicked', async () => {
    const user = userEvent.setup()
    
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    )
    
    const button = screen.getByRole('button')
    await user.click(button)
    
    expect(button).toHaveTextContent('☀️')
    expect(button).toHaveTextContent('Light Mode')
  })
})
