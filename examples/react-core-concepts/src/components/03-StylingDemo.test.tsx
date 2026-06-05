/**
 * TESTING GUIDE: 03-StylingDemo.test.tsx
 * 
 * This test file demonstrates how to test styled components.
 * 
 * WHAT WE'RE TESTING:
 * - Inline styles
 * - CSS classes
 * - CSS Modules
 * - Style-related attributes
 * 
 * NEW CONCEPTS:
 * - Testing inline styles with toHaveStyle()
 * - Testing CSS classes with toHaveClass()
 * - Testing CSS Modules (scoped styles)
 * 
 * IMPORTANT NOTE:
 * We generally DON'T test specific style values (colors, fonts, etc.)
 * because that's testing implementation details. Instead, we test:
 * - That elements have the correct classes
 * - That critical inline styles are applied
 * - That the component structure is correct
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import StylingDemo from './03-StylingDemo'

describe('StylingDemo', () => {
  it('renders the main heading', () => {
    render(<StylingDemo />)
    
    const heading = screen.getByRole('heading', { name: '3. Adding Styles' })
    expect(heading).toBeInTheDocument()
  })

  it('displays all key points about styling', () => {
    render(<StylingDemo />)
    
    expect(screen.getByText(/Inline styles use JavaScript objects/)).toBeInTheDocument()
    expect(screen.getByText(/CSS classes use className instead of class/)).toBeInTheDocument()
    expect(screen.getByText(/CSS Modules provide scoped styling/)).toBeInTheDocument()
  })

  /**
   * TESTING INLINE STYLES
   * 
   * For inline styles, we can test:
   * 1. That the element exists
   * 2. That critical styles are applied (optional)
   * 
   * Use toHaveStyle() to check inline styles.
   * Only test styles that are critical to functionality.
   */
  it('renders InlineStyleComponent with inline styles', () => {
    render(<StylingDemo />)
    
    const styledElement = screen.getByText('Styled with Inline Styles')
    
    expect(styledElement).toBeInTheDocument()
    
    // Testing critical inline styles (optional)
    // We test these because they're part of the component's behavior
    // Note: colors are converted to rgb format by the browser
    expect(styledElement).toHaveStyle({
      color: 'rgb(0, 0, 255)', // blue in rgb
      'font-size': '20px'
    })
  })

  /**
   * TESTING CSS CLASSES
   * 
   * For CSS classes, we test:
   * 1. That elements have the correct className
   * 2. That content is rendered correctly
   * 
   * We DON'T test the actual CSS rules - that's the browser's job.
   */
  it('renders CSSClassComponent with correct classes', () => {
    render(<StylingDemo />)
    
    const cardTitle = screen.getByRole('heading', { name: 'CSS Classes' })
    const cardContent = screen.getByText('This component uses regular CSS classes')
    
    expect(cardTitle).toBeInTheDocument()
    expect(cardTitle).toHaveClass('styled-card-title')
    
    expect(cardContent).toBeInTheDocument()
    expect(cardContent).toHaveClass('styled-card-content')
  })

  /**
   * TESTING CSS MODULES
   * 
   * CSS Modules generate unique class names like "moduleCard_abc123".
   * We can't test the exact class name because it's generated.
   * 
   * Instead, we test:
   * 1. That the element exists
   * 2. That content is correct
   * 3. (Optional) That some class is applied
   */
  it('renders CSSModuleComponent with CSS Modules', () => {
    render(<StylingDemo />)
    
    const moduleTitle = screen.getByRole('heading', { name: 'CSS Modules' })
    const moduleContent = screen.getByText('This component uses CSS Modules for scoped styling')
    
    expect(moduleTitle).toBeInTheDocument()
    expect(moduleContent).toBeInTheDocument()
    
    // We can verify that a class exists (even if we don't know the exact name)
    // The className attribute should not be empty
    expect(moduleTitle.className).toBeTruthy()
  })

  it('displays all three styling examples', () => {
    render(<StylingDemo />)
    
    // Verify all example sections are present
    expect(screen.getByRole('heading', { name: 'Example 1: Inline Styles' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Example 2: CSS Classes' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Example 3: CSS Modules' })).toBeInTheDocument()
  })

  it('displays CSS vs CSS Modules comparison table', () => {
    render(<StylingDemo />)
    
    // Testing table headers
    expect(screen.getByRole('columnheader', { name: 'Aspect' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'CSS' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'CSS Modules' })).toBeInTheDocument()
    
    // Testing key comparison points
    expect(screen.getByRole('cell', { name: 'Import' })).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: 'Usage' })).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: 'Tree Shaking' })).toBeInTheDocument()
  })

  /**
   * TESTING COMPONENT STRUCTURE
   * 
   * Sometimes it's useful to test the overall structure,
   * especially for educational components.
   */
  it('has the correct section structure', () => {
    render(<StylingDemo />)
    
    const section = document.querySelector('.demo-section')
    expect(section).toBeInTheDocument()
    expect(section).toHaveClass('demo-section')
  })
})

/**
 * KEY TESTING CONCEPTS LEARNED:
 * 
 * 1. TESTING STYLES - WHAT TO TEST:
 *    ✅ DO test:
 *       - That elements have correct classes
 *       - That critical inline styles are applied
 *       - That content is rendered correctly
 *    
 *    ❌ DON'T test:
 *       - Specific color values (unless critical to functionality)
 *       - Font sizes, margins, padding (CSS's job)
 *       - Exact CSS Module class names (they're generated)
 * 
 * 2. STYLE MATCHERS:
 *    - toHaveStyle({ color: 'blue' }): Check inline styles
 *    - toHaveClass('my-class'): Check if element has a class
 *    - element.className: Access the className string
 * 
 * 3. CSS MODULES TESTING:
 *    - Can't test exact class names (they're hashed)
 *    - Test that classes exist (className is truthy)
 *    - Focus on content and behavior, not class names
 * 
 * 4. WHEN TO TEST STYLES:
 *    - Test styles that affect functionality (visibility, layout)
 *    - Test that correct classes are applied
 *    - Don't test purely aesthetic styles
 * 
 * 5. TESTING PHILOSOPHY:
 *    - Test behavior, not implementation
 *    - Styles are usually implementation details
 *    - Focus on what users see and interact with
 * 
 * BEST PRACTICES:
 * - Keep style tests minimal
 * - Test classes, not CSS rules
 * - Focus on semantic HTML and accessibility
 * - Let visual regression tests handle appearance
 * 
 * NEXT STEPS:
 * - Try testing conditional classes (active/inactive)
 * - Experiment with testing visibility (display: none)
 * - Practice testing dynamic styles based on props
 */
