/**
 * TESTING GUIDE: 01-ComponentsDemo.test.tsx
 * 
 * This test file demonstrates how to test basic React components.
 * 
 * WHAT WE'RE TESTING:
 * - Component rendering (does it show up on the screen?)
 * - Text content (does it display the right text?)
 * - Component structure (are nested components working?)
 * 
 * TESTING PHILOSOPHY:
 * We test components the way users interact with them:
 * - Users see text on the screen
 * - Users don't care about implementation details
 * - We focus on "what" the component does, not "how" it does it
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ComponentsDemo from './01-ComponentsDemo'

/**
 * STEP 1: Organize tests with describe()
 * 
 * describe() groups related tests together.
 * Think of it as a folder for your tests.
 */
describe('ComponentsDemo', () => {
  /**
   * STEP 2: Write individual tests with it()
   * 
   * Each it() block tests ONE specific thing.
   * The description should complete the sentence: "it..."
   */
  
  it('renders the main heading', () => {
    // ARRANGE: Set up the test by rendering the component
    // render() puts the component on a virtual screen
    render(<ComponentsDemo />)
    
    // ACT: In this case, no action needed - we just need to check what's rendered
    
    // ASSERT: Check if the heading is on the screen
    // screen.getByRole() finds elements by their accessibility role
    // This is how screen readers "see" your app
    const heading = screen.getByRole('heading', { name: '1. Creating Components' })
    
    // expect() checks if our assumption is true
    expect(heading).toBeInTheDocument()
  })

  it('displays the description text', () => {
    render(<ComponentsDemo />)
    
    // screen.getByText() finds elements by their text content
    // Use this when you want to find text that users will read
    const description = screen.getByText(/Components are the building blocks of React applications/)
    
    expect(description).toBeInTheDocument()
  })

  it('shows all key points about components', () => {
    render(<ComponentsDemo />)
    
    // Testing multiple related items
    // We check that all important information is displayed
    expect(screen.getByText('Components are JavaScript functions')).toBeInTheDocument()
    expect(screen.getByText('They return JSX (React elements)')).toBeInTheDocument()
    expect(screen.getByText('Component names must be capitalized')).toBeInTheDocument()
    expect(screen.getByText('Components can be nested inside each other')).toBeInTheDocument()
  })

  it('renders nested Welcome component with correct text', () => {
    render(<ComponentsDemo />)
    
    // Testing nested components
    // The Welcome component should render "Hello, World!"
    const welcomeText = screen.getByText('Hello, World!')
    
    expect(welcomeText).toBeInTheDocument()
  })

  it('renders nested Greeting component with correct text', () => {
    render(<ComponentsDemo />)
    
    // Testing another nested component
    const greetingText = screen.getByText('Welcome to React!')
    
    expect(greetingText).toBeInTheDocument()
  })

  it('has the correct section structure', () => {
    render(<ComponentsDemo />)
    
    // Testing semantic HTML structure
    // Section elements don't have implicit role, so we find by class
    const section = document.querySelector('.demo-section')
    
    expect(section).toBeInTheDocument()
    expect(section).toHaveClass('demo-section')
  })
})

/**
 * KEY TESTING CONCEPTS LEARNED:
 * 
 * 1. ARRANGE-ACT-ASSERT PATTERN:
 *    - Arrange: Set up the test (render component)
 *    - Act: Perform actions (click, type, etc.)
 *    - Assert: Check the results (expect...)
 * 
 * 2. QUERIES (How to find elements):
 *    - getByRole(): Find by accessibility role (heading, button, etc.)
 *    - getByText(): Find by text content
 *    - getByLabelText(): Find form elements by their label
 *    - getByTestId(): Find by data-testid attribute (use sparingly!)
 * 
 * 3. MATCHERS (How to check results):
 *    - toBeInTheDocument(): Element exists on the page
 *    - toHaveClass(): Element has a CSS class
 *    - toHaveTextContent(): Element contains specific text
 * 
 * 4. BEST PRACTICES:
 *    - Test user-visible behavior, not implementation
 *    - Use accessibility queries (getByRole) when possible
 *    - Write descriptive test names
 *    - Keep tests simple and focused
 *    - One assertion per test (when possible)
 * 
 * NEXT STEPS:
 * - Try adding more tests for edge cases
 * - Experiment with different queries
 * - Run tests with: npm test
 */
