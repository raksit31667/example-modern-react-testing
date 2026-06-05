/**
 * TESTING GUIDE: 09-SharingDataDemo.test.tsx
 * 
 * This test file demonstrates how to test lifting state up.
 * 
 * WHAT WE'RE TESTING:
 * - Parent component managing shared state
 * - Child components receiving state via props
 * - Child components communicating with parent via callbacks
 * - Data flow between sibling components
 * 
 * NEW CONCEPTS:
 * - Testing component communication
 * - Testing data flow (parent → child)
 * - Testing callbacks (child → parent)
 * - Testing derived state (calculations)
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SharingDataDemo from './09-SharingDataDemo'

describe('SharingDataDemo', () => {
  it('renders the main heading', () => {
    render(<SharingDataDemo />)
    
    const heading = screen.getByRole('heading', { name: '9. Sharing Data Between Components' })
    expect(heading).toBeInTheDocument()
  })

  it('displays all key points about sharing data', () => {
    render(<SharingDataDemo />)
    
    expect(screen.getByText(/Lift state up to the closest common ancestor/)).toBeInTheDocument()
    expect(screen.getByText(/Parent manages the state, children receive it via props/)).toBeInTheDocument()
    expect(screen.getByText(/Children communicate with parent through callback props/)).toBeInTheDocument()
  })

  /**
   * TESTING INITIAL STATE
   * 
   * First, verify the initial state of the application.
   * The cart should be empty initially.
   */
  it('displays empty cart initially', () => {
    render(<SharingDataDemo />)
    
    expect(screen.getByText('Shopping Cart (0 items)')).toBeInTheDocument()
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument()
  })

  it('displays all products', () => {
    render(<SharingDataDemo />)
    
    // Verify all 3 products are displayed
    expect(screen.getByText('Laptop')).toBeInTheDocument()
    expect(screen.getByText(/\$999/)).toBeInTheDocument()
    
    expect(screen.getByText('Mouse')).toBeInTheDocument()
    expect(screen.getByText(/\$25/)).toBeInTheDocument()
    
    expect(screen.getByText('Keyboard')).toBeInTheDocument()
    expect(screen.getByText(/\$75/)).toBeInTheDocument()
  })

  /**
   * TESTING PARENT-CHILD COMMUNICATION
   * 
   * When a child component triggers an action (add to cart),
   * the parent's state should update, and all children should
   * reflect the new state.
   */
  it('adds product to cart when Add to Cart button is clicked', async () => {
    const user = userEvent.setup()
    render(<SharingDataDemo />)
    
    // Find all "Add to Cart" buttons
    const addToCartButtons = screen.getAllByRole('button', { name: 'Add to Cart' })
    
    // Click the first one (Laptop)
    await user.click(addToCartButtons[0])
    
    // Cart should now show 1 item
    expect(screen.getByText('Shopping Cart (1 items)')).toBeInTheDocument()
    
    // Cart should display the laptop
    expect(screen.getByText(/Laptop - \$999/)).toBeInTheDocument()
  })

  /**
   * TESTING MULTIPLE INTERACTIONS
   * 
   * Test that multiple items can be added to the cart.
   */
  it('adds multiple products to cart', async () => {
    const user = userEvent.setup()
    render(<SharingDataDemo />)
    
    const addToCartButtons = screen.getAllByRole('button', { name: 'Add to Cart' })
    
    // Add Laptop
    await user.click(addToCartButtons[0])
    
    // Add Mouse
    await user.click(addToCartButtons[1])
    
    // Add Keyboard
    await user.click(addToCartButtons[2])
    
    // Cart should show 3 items
    expect(screen.getByText('Shopping Cart (3 items)')).toBeInTheDocument()
    
    // All items should be in cart
    expect(screen.getByText(/Laptop - \$999/)).toBeInTheDocument()
    expect(screen.getByText(/Mouse - \$25/)).toBeInTheDocument()
    expect(screen.getByText(/Keyboard - \$75/)).toBeInTheDocument()
  })

  /**
   * TESTING DERIVED STATE
   * 
   * The total is calculated from the cart items.
   * We test that the calculation is correct.
   */
  it('calculates correct total for cart items', async () => {
    const user = userEvent.setup()
    render(<SharingDataDemo />)
    
    const addToCartButtons = screen.getAllByRole('button', { name: 'Add to Cart' })
    
    // Add Laptop ($999)
    await user.click(addToCartButtons[0])
    expect(screen.getByText('Total: $999.00')).toBeInTheDocument()
    
    // Add Mouse ($25)
    await user.click(addToCartButtons[1])
    expect(screen.getByText('Total: $1024.00')).toBeInTheDocument()
    
    // Add Keyboard ($75)
    await user.click(addToCartButtons[2])
    expect(screen.getByText('Total: $1099.00')).toBeInTheDocument()
  })

  /**
   * TESTING DUPLICATE ITEMS
   * 
   * Users can add the same item multiple times.
   * Test that this works correctly.
   */
  it('allows adding the same product multiple times', async () => {
    const user = userEvent.setup()
    render(<SharingDataDemo />)
    
    const addToCartButtons = screen.getAllByRole('button', { name: 'Add to Cart' })
    
    // Add Mouse twice
    await user.click(addToCartButtons[1])
    await user.click(addToCartButtons[1])
    
    // Cart should show 2 items
    expect(screen.getByText('Shopping Cart (2 items)')).toBeInTheDocument()
    
    // Total should be $50 (2 × $25)
    expect(screen.getByText('Total: $50.00')).toBeInTheDocument()
  })

  /**
   * TESTING SIBLING COMMUNICATION
   * 
   * ProductCard and CartDisplay are siblings.
   * They communicate through their parent (EcommerceApp).
   * We test that changes in one affect the other.
   */
  it('updates cart display when product is added', async () => {
    const user = userEvent.setup()
    render(<SharingDataDemo />)
    
    // Initially empty
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument()
    
    // Add a product
    const addToCartButtons = screen.getAllByRole('button', { name: 'Add to Cart' })
    await user.click(addToCartButtons[0])
    
    // Empty message should be gone
    expect(screen.queryByText('Your cart is empty')).not.toBeInTheDocument()
    
    // Cart items should be visible
    expect(screen.getByText(/Laptop - \$999/)).toBeInTheDocument()
  })

  it('displays the data flow table', () => {
    render(<SharingDataDemo />)
    
    // Testing table headers
    expect(screen.getByRole('columnheader', { name: 'Component' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Role' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Data Flow' })).toBeInTheDocument()
    
    // Testing component roles
    expect(screen.getByText('Parent (EcommerceApp)')).toBeInTheDocument()
    expect(screen.getByText('Child (ProductCard)')).toBeInTheDocument()
    expect(screen.getByText('Child (CartDisplay)')).toBeInTheDocument()
  })

  it('shows the example section', () => {
    render(<SharingDataDemo />)
    
    expect(screen.getByRole('heading', { name: 'Example: E-commerce Cart (Lifting State Up)' })).toBeInTheDocument()
  })
})

/**
 * KEY TESTING CONCEPTS LEARNED:
 * 
 * 1. TESTING LIFTING STATE UP:
 *    - Test the parent component that manages state
 *    - Don't test child components in isolation here
 *    - Focus on the data flow and communication
 * 
 * 2. TESTING PARENT-CHILD COMMUNICATION:
 *    - Test that parent passes data to children (via props)
 *    - Test that children can trigger parent updates (via callbacks)
 *    - Verify the entire flow works together
 * 
 * 3. TESTING SIBLING COMMUNICATION:
 *    - Siblings communicate through their parent
 *    - Test that action in one sibling affects another
 *    - Example: Adding product updates cart display
 * 
 * 4. TESTING DERIVED STATE:
 *    - Test calculations based on state (like totals)
 *    - Verify derived values update correctly
 *    - Test edge cases (empty cart, single item, etc.)
 * 
 * 5. TESTING COMPONENT INTEGRATION:
 *    - Test how components work together
 *    - Verify data flows correctly
 *    - Test the complete user journey
 * 
 * 6. TESTING CONDITIONAL RENDERING:
 *    - Use queryBy* for elements that might not exist
 *    - Test that empty states are handled
 *    - Verify content appears/disappears correctly
 * 
 * 7. TESTING LISTS WITH DUPLICATES:
 *    - Test that same item can be added multiple times
 *    - Verify counts and totals are correct
 *    - Test that list rendering handles duplicates
 * 
 * BEST PRACTICES:
 * - Test the integration, not individual components
 * - Focus on user workflows (add to cart, view cart)
 * - Test data flow in both directions
 * - Verify derived state calculations
 * - Test edge cases (empty, single, multiple items)
 * 
 * COMMON PATTERNS:
 * - Initial state → User action → Verify all affected components
 * - Test complete user journeys
 * - Verify parent and all children update correctly
 * 
 * ARCHITECTURE INSIGHTS:
 * - Lifting state up enables sibling communication
 * - Parent owns the state, children are "controlled"
 * - Callbacks allow children to request state changes
 * - This pattern scales to complex applications
 * 
 * NEXT STEPS:
 * - Try testing more complex state lifting scenarios
 * - Practice testing deeply nested component trees
 * - Experiment with testing multiple levels of lifting
 * - Learn about Context API for avoiding prop drilling
 */
