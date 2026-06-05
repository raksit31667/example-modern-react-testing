/**
 * TESTING GUIDE: 07-EventHandlingDemo.test.tsx
 * 
 * This test file demonstrates how to test event handling.
 * 
 * WHAT WE'RE TESTING:
 * - Click events
 * - Form submissions
 * - Input changes
 * - Multiple event types (focus, blur, double-click)
 * - Event handlers with parameters
 * 
 * NEW CONCEPTS:
 * - Testing form submissions with preventDefault
 * - Testing input changes with user.type()
 * - Testing multiple event types
 * - Testing event logs and history
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EventHandlingDemo from './07-EventHandlingDemo'

describe('EventHandlingDemo', () => {
  // Mock alert for tests that use it
  beforeEach(() => {
    vi.spyOn(window, 'alert').mockImplementation(() => {})
  })

  it('renders the main heading', () => {
    render(<EventHandlingDemo />)
    
    const heading = screen.getByRole('heading', { name: '7. Event Handling' })
    expect(heading).toBeInTheDocument()
  })

  it('displays all key points about event handling', () => {
    render(<EventHandlingDemo />)
    
    expect(screen.getByText(/Use camelCase for event names/)).toBeInTheDocument()
    expect(screen.getByText(/Pass functions, not function calls/)).toBeInTheDocument()
    expect(screen.getByText(/Use arrow functions for inline handlers/)).toBeInTheDocument()
  })

  /**
   * TESTING BASIC CLICK EVENTS
   * 
   * The simplest event to test: button clicks.
   * We verify that clicking triggers the expected behavior.
   */
  it('shows alert when basic event button is clicked', async () => {
    const user = userEvent.setup()
    render(<EventHandlingDemo />)
    
    // Find the "Click me" button
    const button = screen.getByRole('button', { name: 'Click me' })
    
    // Click it
    await user.click(button)
    
    // Verify alert was called
    expect(window.alert).toHaveBeenCalledWith('Button clicked!')
  })

  /**
   * TESTING EVENT HANDLERS WITH PARAMETERS
   * 
   * Sometimes event handlers need parameters.
   * We test that the correct parameter is passed.
   */
  it('shows custom message when parameter button is clicked', async () => {
    const user = userEvent.setup()
    render(<EventHandlingDemo />)
    
    const button = screen.getByRole('button', { name: 'Show Message' })
    await user.click(button)
    
    expect(window.alert).toHaveBeenCalledWith('Hello from parameter!')
  })

  /**
   * TESTING STATE UPDATES FROM EVENTS
   * 
   * Many events update component state.
   * We test that state changes are reflected in the UI.
   */
  it('increments counter when increment button is clicked', async () => {
    const user = userEvent.setup()
    render(<EventHandlingDemo />)
    
    // Initial count should be 0
    expect(screen.getByText('Count: 0')).toBeInTheDocument()
    
    // Find and click increment button
    const incrementButton = screen.getByRole('button', { name: 'Increment' })
    await user.click(incrementButton)
    
    // Count should now be 1
    expect(screen.getByText('Count: 1')).toBeInTheDocument()
  })

  it('decrements counter when decrement button is clicked', async () => {
    const user = userEvent.setup()
    render(<EventHandlingDemo />)
    
    // Start at 0
    expect(screen.getByText('Count: 0')).toBeInTheDocument()
    
    // Decrement
    const decrementButton = screen.getByRole('button', { name: 'Decrement' })
    await user.click(decrementButton)
    
    // Should be -1
    expect(screen.getByText('Count: -1')).toBeInTheDocument()
  })

  it('resets counter when reset button is clicked', async () => {
    const user = userEvent.setup()
    render(<EventHandlingDemo />)
    
    // Increment a few times
    const incrementButton = screen.getByRole('button', { name: 'Increment' })
    await user.click(incrementButton)
    await user.click(incrementButton)
    expect(screen.getByText('Count: 2')).toBeInTheDocument()
    
    // Reset
    const resetButton = screen.getByRole('button', { name: 'Reset' })
    await user.click(resetButton)
    
    // Back to 0
    expect(screen.getByText('Count: 0')).toBeInTheDocument()
  })

  /**
   * TESTING FORM SUBMISSIONS
   * 
   * Forms are special - they have default behavior (page reload).
   * We test that preventDefault works and form data is handled.
   */
  it('handles form submission without page reload', async () => {
    const user = userEvent.setup()
    render(<EventHandlingDemo />)
    
    // Find the input and type a name
    const input = screen.getByPlaceholderText('Enter your name')
    await user.type(input, 'John Doe')
    
    // Submit the form
    const submitButton = screen.getByRole('button', { name: 'Submit' })
    await user.click(submitButton)
    
    // Success message should appear
    expect(screen.getByText(/Form submitted! Name: John Doe/)).toBeInTheDocument()
  })

  /**
   * TESTING INPUT CHANGES
   * 
   * Testing that typing in inputs updates the component state.
   */
  it('updates input value as user types', async () => {
    const user = userEvent.setup()
    render(<EventHandlingDemo />)
    
    const input = screen.getByPlaceholderText('Enter your name')
    
    // Initially empty
    expect(input).toHaveValue('')
    
    // Type something
    await user.type(input, 'Alice')
    
    // Value should update
    expect(input).toHaveValue('Alice')
  })

  /**
   * TESTING MULTIPLE EVENT TYPES
   * 
   * Components can handle various events: click, double-click, focus, blur.
   * We test each event type.
   */
  it('logs click event when button is clicked', async () => {
    const user = userEvent.setup()
    render(<EventHandlingDemo />)
    
    // Find the "Click" button in the multiple events section
    const buttons = screen.getAllByRole('button')
    const clickButton = buttons.find(btn => btn.textContent === 'Click')
    
    expect(clickButton).toBeDefined()
    await user.click(clickButton!)
    
    // Check that event was logged
    expect(screen.getByText(/Click at/)).toBeInTheDocument()
  })

  it('logs double click event when button is double-clicked', async () => {
    const user = userEvent.setup()
    render(<EventHandlingDemo />)
    
    const buttons = screen.getAllByRole('button')
    const doubleClickButton = buttons.find(btn => btn.textContent === 'Double Click')
    
    expect(doubleClickButton).toBeDefined()
    await user.dblClick(doubleClickButton!)
    
    // Check that double click was logged
    expect(screen.getByText(/Double Click at/)).toBeInTheDocument()
  })

  it('logs focus event when input receives focus', async () => {
    const user = userEvent.setup()
    render(<EventHandlingDemo />)
    
    // Find the "Focus/Blur me" input
    const input = screen.getByPlaceholderText('Focus/Blur me')
    
    // Click to focus
    await user.click(input)
    
    // Check that focus was logged
    expect(screen.getByText(/Focus at/)).toBeInTheDocument()
  })

  it('logs blur event when input loses focus', async () => {
    const user = userEvent.setup()
    render(<EventHandlingDemo />)
    
    const input = screen.getByPlaceholderText('Focus/Blur me')
    
    // Focus the input
    await user.click(input)
    
    // Tab away to blur
    await user.tab()
    
    // Check that blur was logged
    expect(screen.getByText(/Blur at/)).toBeInTheDocument()
  })

  it('displays common events table', () => {
    render(<EventHandlingDemo />)
    
    // Testing table headers
    expect(screen.getByRole('columnheader', { name: 'Event' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Description' })).toBeInTheDocument()
    
    // Testing event types in table
    expect(screen.getByRole('cell', { name: 'onClick' })).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: 'onChange' })).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: 'onSubmit' })).toBeInTheDocument()
  })

  it('shows all example sections', () => {
    render(<EventHandlingDemo />)
    
    expect(screen.getByRole('heading', { name: 'Example 1: Basic Event Handler' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Example 2: Event Handler with Parameters' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Example 3: Arrow Function Handlers with State' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Example 4: Form Event (preventDefault)' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Example 5: Multiple Event Types' })).toBeInTheDocument()
  })
})

/**
 * KEY TESTING CONCEPTS LEARNED:
 * 
 * 1. TESTING CLICK EVENTS:
 *    - Use user.click(element) to simulate clicks
 *    - Always await user interactions
 *    - Verify the expected behavior occurs
 * 
 * 2. TESTING FORM SUBMISSIONS:
 *    - Forms can be submitted by clicking submit button
 *    - preventDefault is handled automatically in tests
 *    - Test that form data is processed correctly
 *    - Verify success/error messages appear
 * 
 * 3. TESTING INPUT CHANGES:
 *    - Use user.type(input, 'text') to simulate typing
 *    - Use toHaveValue() to check input values
 *    - Test that state updates as user types
 * 
 * 4. TESTING MULTIPLE EVENT TYPES:
 *    - user.click(): Single click
 *    - user.dblClick(): Double click
 *    - user.tab(): Tab key (for focus/blur)
 *    - Each event type has its own method
 * 
 * 5. TESTING EVENT PARAMETERS:
 *    - Don't test the parameter directly
 *    - Test the behavior that results from the parameter
 *    - Example: Test alert message, not the function call
 * 
 * 6. TESTING STATE UPDATES:
 *    - Test initial state
 *    - Trigger event
 *    - Verify state change in UI
 *    - Test multiple state transitions
 * 
 * 7. USER EVENT METHODS:
 *    - user.click(element): Click
 *    - user.dblClick(element): Double click
 *    - user.type(element, text): Type text
 *    - user.clear(element): Clear input
 *    - user.tab(): Tab key
 *    - user.keyboard('{Enter}'): Keyboard keys
 * 
 * BEST PRACTICES:
 * - Always use userEvent, not fireEvent (more realistic)
 * - Always await user interactions
 * - Test user-visible behavior, not implementation
 * - Mock browser APIs (alert, confirm, etc.)
 * - Test both success and error cases
 * 
 * COMMON PATTERNS:
 * - Render → Find element → Trigger event → Verify result
 * - Test initial state → User action → Verify change
 * - Test multiple interactions in sequence
 * 
 * NEXT STEPS:
 * - Try testing keyboard events (Enter, Escape)
 * - Practice testing drag and drop
 * - Experiment with testing hover events
 * - Learn about testing custom events
 */
