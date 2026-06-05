/**
 * TESTING GUIDE: 11-UseContextDemo.test.tsx
 * 
 * This test file demonstrates how to test useContext hook and Context API.
 * 
 * WHAT WE'RE TESTING:
 * - Context providers
 * - Components consuming context
 * - Context value updates
 * - Theme switching functionality
 * 
 * NEW CONCEPTS:
 * - Testing context providers
 * - Testing components that use useContext
 * - Testing context updates across multiple components
 * - Testing custom hooks that use context
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import UseContextDemo from './11-UseContextDemo'

describe('UseContextDemo', () => {
  it('renders the main heading', () => {
    render(<UseContextDemo />)
    
    const heading = screen.getByRole('heading', { name: '11. useContext Hook' })
    expect(heading).toBeInTheDocument()
  })

  it('displays all key points about useContext', () => {
    render(<UseContextDemo />)
    
    expect(screen.getByText(/Create context with createContext\(\)/)).toBeInTheDocument()
    expect(screen.getByText(/Wrap components with Provider to share values/)).toBeInTheDocument()
    expect(screen.getByText(/Use useContext\(\) hook to consume context values/)).toBeInTheDocument()
  })

  /**
   * TESTING INITIAL CONTEXT STATE
   * 
   * First, verify the initial state of the context.
   * The theme should be 'light' by default.
   */
  it('displays light theme initially', () => {
    render(<UseContextDemo />)
    
    // Button should show current theme is light
    expect(screen.getByRole('button', { name: /Toggle Theme.*light/i })).toBeInTheDocument()
  })

  it('displays themed components with initial theme', () => {
    render(<UseContextDemo />)
    
    // All themed components should mention the current theme
    // Check that light theme is displayed in multiple places
    const lightThemeTexts = screen.getAllByText(/light/)
    expect(lightThemeTexts.length).toBeGreaterThan(0)
  })

  /**
   * TESTING CONTEXT UPDATES
   * 
   * When context value changes, all consuming components should update.
   * This is the key benefit of Context API.
   */
  it('toggles theme when button is clicked', async () => {
    const user = userEvent.setup()
    render(<UseContextDemo />)
    
    // Initial theme is light
    expect(screen.getByText(/Current: light/)).toBeInTheDocument()
    
    // Find and click toggle button
    const toggleButton = screen.getByRole('button', { name: /Toggle Theme.*light/i })
    await user.click(toggleButton)
    
    // Theme should now be dark
    expect(screen.getByText(/Current: dark/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Toggle Theme.*dark/i })).toBeInTheDocument()
  })

  /**
   * TESTING MULTIPLE CONSUMERS
   * 
   * Context API allows multiple components to consume the same context.
   * We test that all consumers update when context changes.
   */
  it('updates all themed components when theme changes', async () => {
    const user = userEvent.setup()
    render(<UseContextDemo />)
    
    // All components should show light theme initially
    const lightThemeTexts = screen.getAllByText(/light/)
    expect(lightThemeTexts.length).toBeGreaterThan(1)
    
    // Toggle theme
    const toggleButton = screen.getByRole('button', { name: /Toggle Theme/i })
    await user.click(toggleButton)
    
    // All components should now show dark theme
    const darkThemeTexts = screen.getAllByText(/dark/)
    expect(darkThemeTexts.length).toBeGreaterThan(1)
  })

  it('toggles theme multiple times', async () => {
    const user = userEvent.setup()
    render(<UseContextDemo />)
    
    const toggleButton = screen.getByRole('button', { name: /Toggle Theme/i })
    
    // Start with light
    expect(screen.getByText(/Current: light/)).toBeInTheDocument()
    
    // Toggle to dark
    await user.click(toggleButton)
    expect(screen.getByText(/Current: dark/)).toBeInTheDocument()
    
    // Toggle back to light
    await user.click(toggleButton)
    expect(screen.getByText(/Current: light/)).toBeInTheDocument()
    
    // Toggle to dark again
    await user.click(toggleButton)
    expect(screen.getByText(/Current: dark/)).toBeInTheDocument()
  })

  /**
   * TESTING THEMED COMPONENTS
   * 
   * Individual themed components should display correctly.
   */
  it('displays themed card with correct content', () => {
    render(<UseContextDemo />)
    
    expect(screen.getByRole('heading', { name: 'Themed Card' })).toBeInTheDocument()
    expect(screen.getByText(/This card adapts to the current theme/)).toBeInTheDocument()
    expect(screen.getByText(/No prop drilling needed! 🎉/)).toBeInTheDocument()
  })

  it('displays themed text component', () => {
    render(<UseContextDemo />)
    
    expect(screen.getByText(/This text also uses the theme context/)).toBeInTheDocument()
  })

  /**
   * TESTING CONTEXT BENEFITS
   * 
   * The demo shows the benefits of Context API over prop drilling.
   */
  it('displays context benefits comparison', () => {
    render(<UseContextDemo />)
    
    // Check for benefits section
    expect(screen.getByText('❌ Prop Drilling')).toBeInTheDocument()
    expect(screen.getByText('✅ useContext')).toBeInTheDocument()
    
    // Check specific benefits
    expect(screen.getByText(/Pass props through every level/)).toBeInTheDocument()
    expect(screen.getByText(/Direct access to values/)).toBeInTheDocument()
  })

  it('displays context workflow table', () => {
    render(<UseContextDemo />)
    
    // Testing table headers
    expect(screen.getByRole('columnheader', { name: 'Step' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Code' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Purpose' })).toBeInTheDocument()
    
    // Testing workflow steps
    expect(screen.getByText('1. Create')).toBeInTheDocument()
    expect(screen.getByText('2. Provide')).toBeInTheDocument()
    expect(screen.getByText('3. Consume')).toBeInTheDocument()
  })

  it('shows the example section', () => {
    render(<UseContextDemo />)
    
    expect(screen.getByRole('heading', { name: 'Example: Theme Context (No Prop Drilling)' })).toBeInTheDocument()
  })
})

/**
 * KEY TESTING CONCEPTS LEARNED:
 * 
 * 1. TESTING CONTEXT PROVIDERS:
 *    - Test the component that includes the Provider
 *    - Don't test the Provider in isolation
 *    - Focus on the behavior of consuming components
 * 
 * 2. TESTING CONTEXT CONSUMERS:
 *    - Test that components receive correct context values
 *    - Test that components update when context changes
 *    - Test multiple consumers simultaneously
 * 
 * 3. TESTING CONTEXT UPDATES:
 *    - Trigger context updates (button clicks, etc.)
 *    - Verify all consuming components update
 *    - Test that updates propagate correctly
 * 
 * 4. TESTING WITHOUT PROP DRILLING:
 *    - Context allows testing without passing props through layers
 *    - Test the integration, not individual layers
 *    - Focus on end-to-end behavior
 * 
 * 5. TESTING CUSTOM HOOKS WITH CONTEXT:
 *    - Test components that use custom hooks (useTheme)
 *    - Don't test the hook in isolation (test through components)
 *    - Verify hook provides correct values
 * 
 * 6. TESTING MULTIPLE CONSUMERS:
 *    - Use getAllByText() to find multiple instances
 *    - Verify all consumers show the same context value
 *    - Test that all update together
 * 
 * 7. TESTING CONTEXT BENEFITS:
 *    - Compare with prop drilling approach
 *    - Verify no intermediate props needed
 *    - Test that deeply nested components work
 * 
 * BEST PRACTICES:
 * - Test context through consuming components
 * - Don't test Context API implementation
 * - Focus on user-visible behavior
 * - Test that all consumers update together
 * - Test context updates, not just initial values
 * 
 * COMMON PATTERNS:
 * - Render → Verify initial context → Update context → Verify all consumers
 * - Test multiple consumers simultaneously
 * - Test context toggles/updates
 * 
 * CONTEXT TESTING STRATEGY:
 * 1. Test initial context value
 * 2. Test context updates
 * 3. Test all consumers receive updates
 * 4. Test edge cases (missing provider, etc.)
 * 
 * WHEN TO USE CONTEXT:
 * - Global state (theme, auth, language)
 * - Deeply nested component trees
 * - Avoiding prop drilling
 * - Shared state across many components
 * 
 * NEXT STEPS:
 * - Try testing multiple contexts
 * - Practice testing nested providers
 * - Experiment with testing context with reducers
 * - Learn about testing context with TypeScript
 * 
 * CONGRATULATIONS! 🎉
 * You've completed all 11 React core concept tests!
 * 
 * You've learned:
 * - Component testing fundamentals
 * - Props, state, and effects
 * - User interactions and events
 * - Lists, forms, and conditional rendering
 * - Context API and global state
 * - Async operations and side effects
 * 
 * Keep practicing and happy testing! 🚀
 */
