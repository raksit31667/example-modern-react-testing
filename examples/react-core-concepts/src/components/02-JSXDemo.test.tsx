/**
 * TESTING GUIDE: 02-JSXDemo.test.tsx
 * 
 * This test file demonstrates how to test JSX features and embedded JavaScript.
 * 
 * WHAT WE'RE TESTING:
 * - JSX rendering with className
 * - Embedded JavaScript expressions in JSX
 * - React Fragments
 * - Props passed to components
 * - Images and attributes
 * 
 * NEW CONCEPTS:
 * - Testing components with props
 * - Testing images with alt text
 * - Testing fragments (components without wrapper elements)
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import JSXDemo from './02-JSXDemo'

describe('JSXDemo', () => {
  it('renders the main heading', () => {
    render(<JSXDemo />)
    
    const heading = screen.getByRole('heading', { name: '2. JSX - JavaScript + XML' })
    expect(heading).toBeInTheDocument()
  })

  it('displays all key points about JSX', () => {
    render(<JSXDemo />)
    
    // Testing that educational content is displayed
    expect(screen.getByText(/JSX expressions must have one root element/)).toBeInTheDocument()
    expect(screen.getByText(/Use curly braces/)).toBeInTheDocument()
    expect(screen.getByText(/Use className instead of class/)).toBeInTheDocument()
    expect(screen.getByText(/Use camelCase for event handlers/)).toBeInTheDocument()
  })

  /**
   * TESTING NESTED COMPONENTS WITH PROPS
   * 
   * When testing components that render other components with props,
   * we verify the final output that users see, not the props themselves.
   */
  it('renders Card component with correct structure', () => {
    render(<JSXDemo />)
    
    // The Card component should render these elements
    const cardTitle = screen.getByRole('heading', { name: 'Card Title' })
    const cardDescription = screen.getByText('Card Description')
    
    expect(cardTitle).toBeInTheDocument()
    expect(cardDescription).toBeInTheDocument()
  })

  it('renders GreetingWithProps with embedded JavaScript', () => {
    render(<JSXDemo />)
    
    // Testing that props are correctly interpolated in JSX
    // The component receives name="Alice" and age={25}
    expect(screen.getByText('Hello, Alice!')).toBeInTheDocument()
    expect(screen.getByText('You are 25 years old.')).toBeInTheDocument()
  })

  /**
   * TESTING IMAGES
   * 
   * Images should have alt text for accessibility.
   * We use getByRole('img') to find images.
   */
  it('renders Profile component with image', () => {
    render(<JSXDemo />)
    
    // Find the image by its accessible role
    const profileImage = screen.getByRole('img', { name: 'Profile picture' })
    
    expect(profileImage).toBeInTheDocument()
    // Check that the image has the correct src attribute
    expect(profileImage).toHaveAttribute('src', 'https://via.placeholder.com/150')
  })

  it('renders Profile component with fragment (no extra wrapper)', () => {
    render(<JSXDemo />)
    
    // Fragments don't create extra DOM elements
    // We just verify the content is rendered
    expect(screen.getByRole('heading', { name: 'Profile' })).toBeInTheDocument()
    expect(screen.getByText('Bio information...')).toBeInTheDocument()
  })

  /**
   * TESTING TABLES
   * 
   * Tables have specific roles and structure.
   * We can test table content by finding cells.
   */
  it('displays HTML vs JSX comparison table', () => {
    render(<JSXDemo />)
    
    // Testing table headers
    expect(screen.getByRole('columnheader', { name: 'HTML' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'JSX' })).toBeInTheDocument()
    
    // Testing table content - we can use getByRole('cell') or getByText()
    expect(screen.getByRole('cell', { name: 'class' })).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: 'className' })).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: 'onclick' })).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: 'onClick' })).toBeInTheDocument()
  })

  it('shows all example sections', () => {
    render(<JSXDemo />)
    
    // Verify all example headings are present
    expect(screen.getByRole('heading', { name: 'Example 1: Basic JSX with className' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Example 2: Embedding JavaScript' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Example 3: Using Fragments' })).toBeInTheDocument()
  })
})

/**
 * KEY TESTING CONCEPTS LEARNED:
 * 
 * 1. TESTING PROPS INDIRECTLY:
 *    - Don't test props directly (implementation detail)
 *    - Test the rendered output that results from props
 *    - Example: Instead of checking props.name, check the rendered text
 * 
 * 2. TESTING IMAGES:
 *    - Use getByRole('img', { name: 'alt text' })
 *    - Always verify alt text for accessibility
 *    - Check src attribute with toHaveAttribute()
 * 
 * 3. TESTING TABLES:
 *    - Use getByRole('columnheader') for headers
 *    - Use getByRole('cell') for table cells
 *    - Tables have built-in accessibility roles
 * 
 * 4. TESTING FRAGMENTS:
 *    - Fragments don't create DOM elements
 *    - Test the content inside fragments, not the fragment itself
 *    - Fragments are transparent to tests
 * 
 * 5. REGEX IN QUERIES:
 *    - Use /pattern/ for partial text matching
 *    - Example: /JSX expressions/ matches "JSX expressions must have..."
 *    - Useful when exact text is long or variable
 * 
 * BEST PRACTICES:
 * - Test user-visible output, not implementation
 * - Use semantic queries (getByRole) for better accessibility
 * - Verify important attributes (src, alt, href)
 * - Test that all critical content is rendered
 * 
 * NEXT STEPS:
 * - Try testing components with different prop values
 * - Experiment with testing inline styles
 * - Practice finding elements by different roles
 */
