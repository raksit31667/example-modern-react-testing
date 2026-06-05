/**
 * TESTING GUIDE: 08-StateManagementDemo.test.tsx
 * 
 * This test file demonstrates how to test state management with useState.
 * 
 * WHAT WE'RE TESTING:
 * - Basic useState hook
 * - Functional state updates
 * - Multiple state variables
 * - Object state updates (immutability)
 * - Array state updates (add/remove items)
 * 
 * NEW CONCEPTS:
 * - Testing functional state updates
 * - Testing immutable state updates
 * - Testing array operations (add, remove)
 * - Testing object state with spread operator
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import StateManagementDemo from './08-StateManagementDemo'

describe('StateManagementDemo', () => {
  it('renders the main heading', () => {
    render(<StateManagementDemo />)
    
    const heading = screen.getByRole('heading', { name: '8. State Management' })
    expect(heading).toBeInTheDocument()
  })

  it('displays all key points about state management', () => {
    render(<StateManagementDemo />)
    
    expect(screen.getByText(/State is private to the component/)).toBeInTheDocument()
    expect(screen.getByText(/Use useState hook to declare state variables/)).toBeInTheDocument()
    expect(screen.getByText(/State updates trigger re-renders/)).toBeInTheDocument()
  })

  /**
   * TESTING BASIC USESTATE
   * 
   * The simplest state test: increment/decrement a counter.
   */
  it('increments and decrements basic counter', async () => {
    const user = userEvent.setup()
    render(<StateManagementDemo />)
    
    // Find the first counter (Basic useState Hook)
    // Initial count should be 0
    const countDisplays = screen.getAllByText(/Count: \d+/)
    expect(countDisplays[0]).toHaveTextContent('Count: 0')
    
    // Find increment button in first example
    const buttons = screen.getAllByRole('button')
    const firstIncrementButton = buttons.find(btn => btn.textContent === 'Increment')
    
    expect(firstIncrementButton).toBeDefined()
    await user.click(firstIncrementButton!)
    
    // Count should be 1
    expect(countDisplays[0]).toHaveTextContent('Count: 1')
    
    // Find decrement button
    const firstDecrementButton = buttons.find(btn => btn.textContent === 'Decrement')
    expect(firstDecrementButton).toBeDefined()
    await user.click(firstDecrementButton!)
    
    // Back to 0
    expect(countDisplays[0]).toHaveTextContent('Count: 0')
  })

  /**
   * TESTING FUNCTIONAL STATE UPDATES
   * 
   * Functional updates are important when state depends on previous state.
   * We test that clicking "+2" actually adds 2 (not 1).
   */
  it('increments by 2 using functional updates', async () => {
    const user = userEvent.setup()
    render(<StateManagementDemo />)
    
    // Find the "+2 (Functional Update)" button
    const functionalUpdateButton = screen.getByRole('button', { name: '+2 (Functional Update)' })
    
    // Click it
    await user.click(functionalUpdateButton)
    
    // Should increment by 2
    // Find the count display in the functional update section
    const countDisplays = screen.getAllByText(/Count: \d+/)
    // The second counter is for functional updates
    expect(countDisplays[1]).toHaveTextContent('Count: 2')
  })

  it('resets functional update counter', async () => {
    const user = userEvent.setup()
    render(<StateManagementDemo />)
    
    // Increment first
    const plusTwoButton = screen.getByRole('button', { name: '+2 (Functional Update)' })
    await user.click(plusTwoButton)
    
    // Then reset - find the reset button in the functional update section
    const resetButtons = screen.getAllByRole('button', { name: 'Reset' })
    // The reset button for functional updates is the second one
    await user.click(resetButtons[0])
    
    const countDisplays = screen.getAllByText(/Count: \d+/)
    expect(countDisplays[1]).toHaveTextContent('Count: 0')
  })

  /**
   * TESTING MULTIPLE STATE VARIABLES
   * 
   * Components often have multiple pieces of state.
   * We test that each state variable works independently.
   */
  it('updates multiple state variables independently', async () => {
    const user = userEvent.setup()
    render(<StateManagementDemo />)
    
    // Find inputs for name, email, age using getAllByPlaceholderText
    const nameInputs = screen.getAllByPlaceholderText('Name')
    const emailInputs = screen.getAllByPlaceholderText('Email')
    const ageInput = screen.getByPlaceholderText('Age')
    
    // Use the first name and email inputs (from Multiple State Variables section)
    const nameInput = nameInputs[0]
    const emailInput = emailInputs[0]
    
    // Type in each input
    await user.type(nameInput, 'Alice')
    await user.type(emailInput, 'alice@example.com')
    await user.clear(ageInput)
    await user.type(ageInput, '30')
    
    // Verify each state is displayed
    // The component shows "Name: Alice" with strong tags
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('alice@example.com')).toBeInTheDocument()
    expect(screen.getByText('30')).toBeInTheDocument()
  })

  /**
   * TESTING OBJECT STATE
   * 
   * When state is an object, we test that updates are immutable.
   * We verify that changing one property doesn't affect others.
   */
  it('updates object state immutably', async () => {
    const user = userEvent.setup()
    render(<StateManagementDemo />)
    
    // Find inputs in the Object State section
    const inputs = screen.getAllByRole('textbox')
    // Find the inputs that have "John Doe" and "john@example.com" as values
    const objectNameInput = inputs.find(input => (input as HTMLInputElement).value === 'John Doe')
    const objectEmailInput = inputs.find(input => (input as HTMLInputElement).value === 'john@example.com')
    
    expect(objectNameInput).toBeDefined()
    expect(objectEmailInput).toBeDefined()
    
    // Clear and update name
    await user.clear(objectNameInput!)
    await user.type(objectNameInput!, 'Jane Smith')
    
    // Verify the object is displayed with updated name
    // The component shows JSON.stringify of the user object
    expect(screen.getByText(/"name": "Jane Smith"/)).toBeInTheDocument()
    // Email should still be there (immutable update)
    expect(screen.getByText(/"email": "john@example.com"/)).toBeInTheDocument()
  })

  /**
   * TESTING ARRAY STATE
   * 
   * Arrays are common in state. We test:
   * 1. Adding items
   * 2. Removing items
   * 3. That the list updates correctly
   */
  it('adds items to array state', async () => {
    const user = userEvent.setup()
    render(<StateManagementDemo />)
    
    // Find the input for adding items
    const addItemInput = screen.getByPlaceholderText('Add new item')
    const addButton = screen.getByRole('button', { name: 'Add' })
    
    // Initially should have Apple and Banana
    expect(screen.getByText('Apple')).toBeInTheDocument()
    expect(screen.getByText('Banana')).toBeInTheDocument()
    
    // Add a new item
    await user.type(addItemInput, 'Orange')
    await user.click(addButton)
    
    // Orange should now appear
    expect(screen.getByText('Orange')).toBeInTheDocument()
    
    // Input should be cleared
    expect(addItemInput).toHaveValue('')
  })

  it('removes items from array state', async () => {
    const user = userEvent.setup()
    render(<StateManagementDemo />)
    
    // Find remove buttons (×)
    const removeButtons = screen.getAllByRole('button', { name: '×' })
    
    // Initially should have Apple and Banana
    expect(screen.getByText('Apple')).toBeInTheDocument()
    expect(screen.getByText('Banana')).toBeInTheDocument()
    
    // Click first remove button (should remove Apple)
    await user.click(removeButtons[0])
    
    // Apple should be gone
    expect(screen.queryByText('Apple')).not.toBeInTheDocument()
    // Banana should still be there
    expect(screen.getByText('Banana')).toBeInTheDocument()
  })

  it('does not add empty items to array', async () => {
    const user = userEvent.setup()
    render(<StateManagementDemo />)
    
    const addButton = screen.getByRole('button', { name: 'Add' })
    
    // Count initial items
    const initialItems = screen.getAllByText(/Apple|Banana/)
    const initialCount = initialItems.length
    
    // Try to add without typing anything
    await user.click(addButton)
    
    // Count should be the same
    const afterItems = screen.getAllByText(/Apple|Banana/)
    expect(afterItems.length).toBe(initialCount)
  })

  it('displays state best practices', () => {
    render(<StateManagementDemo />)
    
    // Check for Do's and Don'ts
    expect(screen.getByText('✅ Do')).toBeInTheDocument()
    expect(screen.getByText('❌ Don\'t')).toBeInTheDocument()
    
    expect(screen.getByText(/Keep state as simple as possible/)).toBeInTheDocument()
    expect(screen.getByText(/Mutate state directly/)).toBeInTheDocument()
  })

  it('shows all example sections', () => {
    render(<StateManagementDemo />)
    
    expect(screen.getByRole('heading', { name: 'Example 1: Basic useState Hook' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Example 2: Functional State Updates' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Example 3: Multiple State Variables' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Example 4: Object State (Immutable Updates)' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Example 5: Array State' })).toBeInTheDocument()
  })
})

/**
 * KEY TESTING CONCEPTS LEARNED:
 * 
 * 1. TESTING STATE:
 *    - Don't test state directly (implementation detail)
 *    - Test the UI that reflects state changes
 *    - Verify state updates through rendered output
 * 
 * 2. TESTING FUNCTIONAL UPDATES:
 *    - Test that multiple updates work correctly
 *    - Verify the final value is correct
 *    - Don't test the implementation (prevState => ...)
 * 
 * 3. TESTING MULTIPLE STATE VARIABLES:
 *    - Test each state independently
 *    - Verify they don't interfere with each other
 *    - Test combinations of state changes
 * 
 * 4. TESTING IMMUTABLE UPDATES:
 *    - Verify that updating one property doesn't affect others
 *    - Test that objects/arrays are not mutated
 *    - Focus on the result, not the spread operator
 * 
 * 5. TESTING ARRAY OPERATIONS:
 *    - Test adding items (push equivalent)
 *    - Test removing items (filter equivalent)
 *    - Test that array updates are immutable
 *    - Verify list rendering updates
 * 
 * 6. QUERY STRATEGIES:
 *    - Use queryBy* for elements that might not exist
 *    - Use getAllBy* when multiple elements match
 *    - Use .find() to locate specific elements
 * 
 * 7. TESTING INPUT CLEARING:
 *    - Use user.clear(input) to clear inputs
 *    - Verify input is empty after clearing
 *    - Test that cleared inputs don't affect state
 * 
 * BEST PRACTICES:
 * - Test behavior, not implementation
 * - Don't access component state directly
 * - Test through user interactions
 * - Verify UI updates, not state values
 * - Test edge cases (empty inputs, etc.)
 * 
 * COMMON PATTERNS:
 * - Initial state → User action → Verify UI change
 * - Test multiple state updates in sequence
 * - Test that state persists across re-renders
 * 
 * NEXT STEPS:
 * - Try testing complex state objects
 * - Practice testing state with useReducer
 * - Experiment with testing derived state
 * - Learn about testing state with context
 */
