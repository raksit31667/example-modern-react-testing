import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import ThemeToggle from './ThemeToggle'
import themeReducer from '../../redux/reducers/themeReducer'

// Helper function to create a mock store
const createMockStore = (initialState = { theme: 'light' }) => {
  return createStore(() => ({ theme: initialState }))
}

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders with light theme by default', () => {
    const store = createMockStore({ theme: 'light' })
    
    render(
      <Provider store={store}>
        <ThemeToggle />
      </Provider>
    )

    const button = screen.getByRole('button', { name: /switch to dark mode/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Dark Mode')
    expect(button).toHaveTextContent('🌙')
  })

  it('renders with dark theme', () => {
    const store = createMockStore({ theme: 'dark' })
    
    render(
      <Provider store={store}>
        <ThemeToggle />
      </Provider>
    )

    const button = screen.getByRole('button', { name: /switch to light mode/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Light Mode')
    expect(button).toHaveTextContent('☀️')
  })

  it('dispatches toggleTheme action when clicked', () => {
    const store = createMockStore({ theme: 'light' })
    const dispatchSpy = jest.spyOn(store, 'dispatch')
    
    render(
      <Provider store={store}>
        <ThemeToggle />
      </Provider>
    )

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(dispatchSpy).toHaveBeenCalledWith({
      type: 'TOGGLE_THEME',
    })
  })

  it('has proper accessibility attributes', () => {
    const store = createMockStore({ theme: 'light' })
    
    render(
      <Provider store={store}>
        <ThemeToggle />
      </Provider>
    )

    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode')
    expect(button).toHaveAttribute('data-testid', 'theme-toggle')
  })

  it('updates aria-label based on current theme', () => {
    const store = createMockStore({ theme: 'dark' })
    
    render(
      <Provider store={store}>
        <ThemeToggle />
      </Provider>
    )

    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-label', 'Switch to light mode')
  })

  it('applies correct CSS module classes', () => {
    const store = createMockStore({ theme: 'light' })
    
    render(
      <Provider store={store}>
        <ThemeToggle />
      </Provider>
    )

    const button = screen.getByRole('button')
    expect(button.className).toContain('toggleButton')
  })
})
