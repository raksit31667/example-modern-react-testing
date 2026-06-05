/**
 * TESTING GUIDE: 04-PropsDemo.test.tsx
 * 
 * This test file demonstrates how to test components with props.
 * 
 * WHAT WE'RE TESTING:
 * - Components receiving different prop types
 * - Default props
 * - Props with different data types (string, number, boolean, array, object, function)
 * - User interactions with function props
 * 
 * NEW CONCEPTS:
 * - Testing user interactions with userEvent
 * - Testing function props (callbacks)
 * - Mocking functions with vi.fn()
 * - Testing alerts and browser APIs
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PropsDemo from './04-PropsDemo'

describe('PropsDemo', () => {
  /**
   * SETUP: Mock window.alert
   * 
   * The component uses alert(), which is a browser API.
   * In tests, we need to mock it to:
   * 1. Prevent actual alerts from showing
   * 2. Verify that alert was called with correct message
   */
  beforeEach(() => {
    // Mock window.alert before each test
    vi.spyOn(window, 'alert').mockImplementation(() => {})
  })

  it('renders the main heading', () => {
    render(<PropsDemo />)
    
    const heading = screen.getByRole('heading', { name: '4. Displaying Data (Props)' })
    expect(heading).toBeInTheDocument()
  })

  it('displays all key points about props', () => {
    render(<PropsDemo />)
    
    expect(screen.getByText(/Props pass data from parent to child components/)).toBeInTheDocument()
    expect(screen.getByText(/Props are read-only/)).toBeInTheDocument()
    expect(screen.getByText(/Use destructuring for cleaner code/)).toBeInTheDocument()
  })

  /**
   * TESTING COMPONENTS WITH PROPS
   * 
   * We test the rendered output, not the props themselves.
   * Focus on what the user sees.
   */
  it('renders GreetingBasic components with different props', () => {
    render(<PropsDemo />)
    
    // First instance: name="Alice", age=25
    expect(screen.getByText('Hello, Alice!')).toBeInTheDocument()
    expect(screen.getByText('You are 25 years old.')).toBeInTheDocument()
    
    // Second instance: name="Bob", age=30
    expect(screen.getByText('Hello, Bob!')).toBeInTheDocument()
    expect(screen.getByText('You are 30 years old.')).toBeInTheDocument()
  })

  /**
   * TESTING DEFAULT PROPS
   * 
   * When props have default values, test both:
   * 1. With explicit props
   * 2. With default props
   */
  it('renders GreetingDefault with explicit props', () => {
    render(<PropsDemo />)
    
    expect(screen.getByText('Hello, Charlie!')).toBeInTheDocument()
    expect(screen.getByText('You are 35 years old.')).toBeInTheDocument()
  })

  it('renders GreetingDefault with default name', () => {
    render(<PropsDemo />)
    
    // When no name is provided, it should use "Guest"
    expect(screen.getByText('Hello, Guest!')).toBeInTheDocument()
  })

  /**
   * TESTING FUNCTION PROPS (CALLBACKS)
   * 
   * This is a crucial skill! Components often receive functions as props.
   * We test that:
   * 1. The button exists
   * 2. Clicking it calls the function
   * 3. The function is called with correct arguments
   */
  it('calls function prop when button is clicked', async () => {
    // Create a user instance for interactions
    const user = userEvent.setup()
    
    render(<PropsDemo />)
    
    // Find the button
    const button = screen.getByRole('button', { name: 'Function Prop' })
    expect(button).toBeInTheDocument()
    
    // Click the button
    await user.click(button)
    
    // Verify alert was called
    expect(window.alert).toHaveBeenCalledWith('Function prop clicked!')
  })

  it('displays the prop types comparison table', () => {
    render(<PropsDemo />)
    
    // Testing table headers
    expect(screen.getByRole('columnheader', { name: 'Type' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Example' })).toBeInTheDocument()
    
    // Testing table content for different prop types
    expect(screen.getByRole('cell', { name: 'String' })).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: 'Number' })).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: 'Boolean' })).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: 'Array' })).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: 'Object' })).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: 'Function' })).toBeInTheDocument()
  })

  it('shows all example sections', () => {
    render(<PropsDemo />)
    
    expect(screen.getByRole('heading', { name: 'Example 1: Basic Props' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Example 2: Default Props' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Example 3: Different Prop Types' })).toBeInTheDocument()
  })
})

/**
 * KEY TESTING CONCEPTS LEARNED:
 * 
 * 1. TESTING PROPS:
 *    - Don't test props directly (implementation detail)
 *    - Test the rendered output that results from props
 *    - Verify different prop values produce different outputs
 * 
 * 2. TESTING USER INTERACTIONS:
 *    - Use userEvent.setup() to create a user instance
 *    - Use await with user interactions (they're async)
 *    - userEvent is more realistic than fireEvent
 * 
 * 3. MOCKING BROWSER APIs:
 *    - Use vi.spyOn(window, 'alert') to mock alert
 *    - Use mockImplementation(() => {}) to prevent actual behavior
 *    - Use beforeEach() to reset mocks before each test
 * 
 * 4. TESTING FUNCTION PROPS:
 *    - Verify the function is called when expected
 *    - Check the function is called with correct arguments
 *    - Use toHaveBeenCalledWith() matcher
 * 
 * 5. ASYNC TESTING:
 *    - User interactions are async (use await)
 *    - Test functions should be async when using await
 *    - Always await user.click(), user.type(), etc.
 * 
 * 6. BEFOREEACH HOOK:
 *    - Runs before each test in the describe block
 *    - Perfect for setting up mocks
 *    - Keeps tests isolated and independent
 * 
 * BEST PRACTICES:
 * - Test behavior, not implementation
 * - Mock browser APIs that aren't available in tests
 * - Use userEvent for realistic user interactions
 * - Keep tests focused and independent
 * - Clean up mocks between tests
 * 
 * NEXT STEPS:
 * - Try testing components with complex object props
 * - Practice testing multiple function calls
 * - Experiment with testing prop validation errors
 * - Learn about testing custom hooks with props
 */
