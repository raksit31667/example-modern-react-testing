/**
 * TESTING GUIDE: 06-RenderingListsDemo.test.tsx
 * 
 * This test file demonstrates how to test list rendering.
 * 
 * WHAT WE'RE TESTING:
 * - Rendering arrays of data with map()
 * - List items with unique keys
 * - Interactive lists (checkboxes, toggles)
 * - Dynamic list updates
 * 
 * NEW CONCEPTS:
 * - Testing lists and arrays
 * - Testing checkboxes and their state
 * - Verifying list item count
 * - Testing list interactions
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RenderingListsDemo from './06-RenderingListsDemo'

describe('RenderingListsDemo', () => {
  it('renders the main heading', () => {
    render(<RenderingListsDemo />)
    
    const heading = screen.getByRole('heading', { name: '6. Rendering Lists' })
    expect(heading).toBeInTheDocument()
  })

  /**
   * TESTING BASIC LIST RENDERING
   * 
   * When testing lists:
   * 1. Verify all items are rendered
   * 2. Check the count of items
   * 3. Verify content of specific items
   */
  it('renders all products in the list', () => {
    render(<RenderingListsDemo />)
    
    // Check that all 4 products are displayed
    expect(screen.getByText(/Laptop.*\$999/)).toBeInTheDocument()
    expect(screen.getByText(/Mouse.*\$25/)).toBeInTheDocument()
    expect(screen.getByText(/Keyboard.*\$75/)).toBeInTheDocument()
    expect(screen.getByText(/Monitor.*\$299/)).toBeInTheDocument()
  })

  it('displays correct number of products', () => {
    render(<RenderingListsDemo />)
    
    // Find all list items in the products section
    // We look for text that matches the product pattern
    const laptopItem = screen.getByText(/Laptop.*\$999/)
    const mouseItem = screen.getByText(/Mouse.*\$25/)
    const keyboardItem = screen.getByText(/Keyboard.*\$75/)
    const monitorItem = screen.getByText(/Monitor.*\$299/)
    
    // Verify all 4 items exist
    expect(laptopItem).toBeInTheDocument()
    expect(mouseItem).toBeInTheDocument()
    expect(keyboardItem).toBeInTheDocument()
    expect(monitorItem).toBeInTheDocument()
  })

  /**
   * TESTING INTERACTIVE LISTS
   * 
   * Lists often have interactive elements like checkboxes.
   * We test:
   * 1. Initial state of checkboxes
   * 2. Toggling checkboxes
   * 3. Visual feedback (strikethrough, etc.)
   */
  it('renders todo list with correct initial states', () => {
    render(<RenderingListsDemo />)
    
    // Find all checkboxes
    const checkboxes = screen.getAllByRole('checkbox')
    
    // First todo should be checked (completed: true)
    expect(checkboxes[0]).toBeChecked()
    
    // Second and third todos should be unchecked (completed: false)
    expect(checkboxes[1]).not.toBeChecked()
    expect(checkboxes[2]).not.toBeChecked()
  })

  it('displays all todo items', () => {
    render(<RenderingListsDemo />)
    
    expect(screen.getByText('Learn React')).toBeInTheDocument()
    expect(screen.getByText('Build a project')).toBeInTheDocument()
    expect(screen.getByText('Deploy to production')).toBeInTheDocument()
  })

  /**
   * TESTING LIST ITEM INTERACTIONS
   * 
   * When users interact with list items, we test:
   * 1. The interaction works (checkbox toggles)
   * 2. The state updates correctly
   * 3. Visual feedback is applied
   */
  it('toggles todo completion when checkbox is clicked', async () => {
    const user = userEvent.setup()
    render(<RenderingListsDemo />)
    
    // Find the second checkbox (Build a project - initially unchecked)
    const checkboxes = screen.getAllByRole('checkbox')
    const secondCheckbox = checkboxes[1]
    
    // Initially unchecked
    expect(secondCheckbox).not.toBeChecked()
    
    // Click to check it
    await user.click(secondCheckbox)
    
    // Now it should be checked
    expect(secondCheckbox).toBeChecked()
    
    // Click again to uncheck
    await user.click(secondCheckbox)
    
    // Back to unchecked
    expect(secondCheckbox).not.toBeChecked()
  })

  it('can toggle first todo item (already completed)', async () => {
    const user = userEvent.setup()
    render(<RenderingListsDemo />)
    
    // Find the first checkbox (Learn React - initially checked)
    const checkboxes = screen.getAllByRole('checkbox')
    const firstCheckbox = checkboxes[0]
    
    // Initially checked
    expect(firstCheckbox).toBeChecked()
    
    // Click to uncheck it
    await user.click(firstCheckbox)
    
    // Now it should be unchecked
    expect(firstCheckbox).not.toBeChecked()
  })

  /**
   * TESTING LIST STRUCTURE
   * 
   * We can test the overall structure of lists using roles.
   */
  it('renders lists with proper structure', () => {
    render(<RenderingListsDemo />)
    
    // Find all lists on the page
    const lists = screen.getAllByRole('list')
    
    // Should have at least 2 lists (products and todos)
    expect(lists.length).toBeGreaterThanOrEqual(2)
  })

  it('displays the key importance comparison table', () => {
    render(<RenderingListsDemo />)
    
    // Testing table headers
    expect(screen.getByRole('columnheader', { name: 'Approach' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Example' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Issue' })).toBeInTheDocument()
    
    // Testing key concepts in the table
    expect(screen.getByText('❌ No Key')).toBeInTheDocument()
    expect(screen.getByText('⚠️ Index as Key')).toBeInTheDocument()
    expect(screen.getByText('✅ Unique ID')).toBeInTheDocument()
  })

  it('shows all example sections', () => {
    render(<RenderingListsDemo />)
    
    expect(screen.getByRole('heading', { name: 'Example 1: Basic List Rendering' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Example 2: Interactive Todo List' })).toBeInTheDocument()
  })
})

/**
 * KEY TESTING CONCEPTS LEARNED:
 * 
 * 1. TESTING LISTS:
 *    - Verify all items are rendered
 *    - Check item count with getAllBy* queries
 *    - Test specific item content
 *    - Use within() to scope queries to specific containers
 * 
 * 2. TESTING CHECKBOXES:
 *    - Use getByRole('checkbox') to find checkboxes
 *    - Use toBeChecked() matcher
 *    - Use not.toBeChecked() for unchecked state
 *    - Test toggling behavior
 * 
 * 3. TESTING ARRAY RENDERING:
 *    - Don't test keys directly (implementation detail)
 *    - Test that all array items appear
 *    - Test array length indirectly through rendered items
 *    - Focus on user-visible content
 * 
 * 4. TESTING INTERACTIVE LISTS:
 *    - Test initial state of interactive elements
 *    - Test user interactions (clicks, toggles)
 *    - Verify state changes are reflected in UI
 *    - Test multiple interactions in sequence
 * 
 * 5. QUERY STRATEGIES FOR LISTS:
 *    - getAllByRole(): Get all elements with a role
 *    - getAllByText(): Get all elements with text
 *    - Use array indexing to access specific items
 *    - Use .find() for conditional selection
 * 
 * 6. WITHIN() HELPER:
 *    - Scope queries to a specific container
 *    - Useful for testing nested lists
 *    - Example: within(listItem).getByText('...')
 * 
 * BEST PRACTICES:
 * - Test list content, not implementation (keys, map, etc.)
 * - Verify all items are rendered
 * - Test interactive elements in lists
 * - Use semantic queries (getByRole)
 * - Test edge cases (empty lists, single item)
 * 
 * COMMON PATTERNS:
 * - Render → Verify all items → Test interactions
 * - Use getAllBy* for multiple items
 * - Test initial state → User action → Verify change
 * 
 * NEXT STEPS:
 * - Try testing empty lists
 * - Practice testing filtered/sorted lists
 * - Experiment with testing list additions/removals
 * - Learn about testing virtualized lists
 */
