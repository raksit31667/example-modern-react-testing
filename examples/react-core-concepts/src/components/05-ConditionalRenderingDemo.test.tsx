/**
 * TESTING GUIDE: 05-ConditionalRenderingDemo.test.tsx
 * 
 * This test file demonstrates how to test conditional rendering.
 * 
 * WHAT WE'RE TESTING:
 * - Components that show/hide based on conditions
 * - Different conditional rendering patterns (if, ternary, &&, switch)
 * - State changes that affect what's rendered
 * - Dynamic CSS classes based on state
 * 
 * NEW CONCEPTS:
 * - Testing state changes with user interactions
 * - Using queryBy* for elements that might not exist
 * - Testing conditional content visibility
 * - Testing dynamic class names
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ConditionalRenderingDemo from './05-ConditionalRenderingDemo'

describe('ConditionalRenderingDemo', () => {
  it('renders the main heading', () => {
    render(<ConditionalRenderingDemo />)
    
    const heading = screen.getByRole('heading', { name: '5. Conditional Rendering' })
    expect(heading).toBeInTheDocument()
  })

  /**
   * TESTING CONDITIONAL RENDERING WITH STATE
   * 
   * When testing components with state:
   * 1. Check initial state
   * 2. Trigger state change (click button)
   * 3. Check updated state
   */
  it('toggles login status when button is clicked', async () => {
    const user = userEvent.setup()
    render(<ConditionalRenderingDemo />)
    
    // Initial state: not logged in - there are multiple "Please sign in." texts
    const initialSignIn = screen.getAllByText('Please sign in.')
    expect(initialSignIn.length).toBeGreaterThan(0)
    
    // Find and click the toggle button
    const toggleButton = screen.getByRole('button', { name: 'Toggle Login Status' })
    await user.click(toggleButton)
    
    // After click: logged in - there are multiple "Welcome back!" texts
    const welcomeBack = screen.getAllByText('Welcome back!')
    expect(welcomeBack.length).toBeGreaterThan(0)
    
    // Click again to toggle back
    await user.click(toggleButton)
    
    // Back to not logged in
    const finalSignIn = screen.getAllByText('Please sign in.')
    expect(finalSignIn.length).toBeGreaterThan(0)
  })

  /**
   * TESTING TERNARY OPERATOR RENDERING
   * 
   * Ternary operators render different content based on condition.
   * We test both branches of the condition.
   */
  it('renders ternary operator example with correct initial state', () => {
    render(<ConditionalRenderingDemo />)
    
    // Should show "Please sign in." initially (isLoggedIn = false)
    // We use getAllByText because there are multiple instances
    const signInMessages = screen.getAllByText('Please sign in.')
    expect(signInMessages.length).toBeGreaterThan(0)
  })

  /**
   * TESTING LOGICAL AND (&&) OPERATOR
   * 
   * The && operator only renders content when condition is true.
   * We test that content appears when it should.
   */
  it('displays unread messages count using logical AND', () => {
    render(<ConditionalRenderingDemo />)
    
    // Messages array has 3 items, so this should be displayed
    expect(screen.getByText(/You have 3 unread messages/)).toBeInTheDocument()
  })

  /**
   * TESTING CONDITIONAL CLASSES
   * 
   * Components often change classes based on state.
   * We test that the correct class is applied.
   */
  it('toggles button active state and updates class', async () => {
    const user = userEvent.setup()
    render(<ConditionalRenderingDemo />)
    
    // Find the conditional button (not the toggle button)
    const buttons = screen.getAllByRole('button')
    const conditionalButton = buttons.find(btn => 
      btn.textContent === 'Inactive' || btn.textContent === 'Active'
    )
    
    expect(conditionalButton).toBeDefined()
    expect(conditionalButton).toHaveTextContent('Inactive')
    
    // Find the toggle button for this example
    const toggleStateButton = screen.getByRole('button', { name: 'Toggle Button State' })
    await user.click(toggleStateButton)
    
    // After toggle, button should show "Active"
    expect(conditionalButton).toHaveTextContent('Active')
  })

  /**
   * TESTING SWITCH STATEMENTS
   * 
   * Switch statements render different content based on multiple conditions.
   * We test each case by triggering state changes.
   */
  it('displays different status messages based on switch statement', async () => {
    const user = userEvent.setup()
    render(<ConditionalRenderingDemo />)
    
    // Initial state: idle
    expect(screen.getByText('Ready')).toBeInTheDocument()
    
    // Click "Loading" button
    const loadingButton = screen.getByRole('button', { name: 'Loading' })
    await user.click(loadingButton)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    
    // Click "Success" button
    const successButton = screen.getByRole('button', { name: 'Success' })
    await user.click(successButton)
    expect(screen.getByText('Success!')).toBeInTheDocument()
    
    // Click "Error" button
    const errorButton = screen.getByRole('button', { name: 'Error' })
    await user.click(errorButton)
    expect(screen.getByText('Error occurred')).toBeInTheDocument()
    
    // Click "Idle" button to go back
    const idleButton = screen.getByRole('button', { name: 'Idle' })
    await user.click(idleButton)
    expect(screen.getByText('Ready')).toBeInTheDocument()
  })

  it('shows all example sections', () => {
    render(<ConditionalRenderingDemo />)
    
    expect(screen.getByRole('heading', { name: 'Example 1: If Statement' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Example 2: Ternary Operator' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Example 3: Logical AND Operator' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Example 4: Conditional Classes' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Example 5: Switch Statement' })).toBeInTheDocument()
  })
})

/**
 * KEY TESTING CONCEPTS LEARNED:
 * 
 * 1. TESTING STATE CHANGES:
 *    - Test initial state first
 *    - Trigger state change (user interaction)
 *    - Verify new state is reflected in UI
 *    - Test can toggle back and forth
 * 
 * 2. QUERY TYPES:
 *    - getBy*: Throws error if not found (use for elements that MUST exist)
 *    - queryBy*: Returns null if not found (use for elements that MIGHT exist)
 *    - findBy*: Async, waits for element (use for elements that appear later)
 * 
 * 3. TESTING CONDITIONAL CONTENT:
 *    - Test both branches of conditions (true and false)
 *    - Verify content appears when condition is met
 *    - Verify content disappears when condition is not met
 * 
 * 4. TESTING MULTIPLE INSTANCES:
 *    - Use getAllBy* when multiple elements match
 *    - Use .find() or array indexing to get specific element
 *    - Check array length when testing lists
 * 
 * 5. TESTING DYNAMIC CLASSES:
 *    - Use toHaveClass() to check class names
 *    - Test that classes change based on state
 *    - Don't test CSS rules, just class names
 * 
 * 6. TESTING SWITCH STATEMENTS:
 *    - Test each case/branch
 *    - Verify correct content for each state
 *    - Test default case if applicable
 * 
 * BEST PRACTICES:
 * - Test all conditional branches
 * - Use descriptive test names that explain the condition
 * - Test state transitions, not just final states
 * - Keep tests independent (each test should work alone)
 * - Use getAllBy* when you expect multiple matches
 * 
 * COMMON PATTERNS:
 * - Initial render → User action → Verify change
 * - Test both true and false conditions
 * - Test edge cases (empty arrays, null values)
 * 
 * NEXT STEPS:
 * - Try testing components with complex conditional logic
 * - Practice using queryBy* for optional elements
 * - Experiment with testing nested conditionals
 * - Learn about testing loading states and error boundaries
 */
