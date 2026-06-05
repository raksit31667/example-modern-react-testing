/**
 * TESTING GUIDE: 10-UseEffectDemo.test.tsx
 * 
 * This test file demonstrates how to test useEffect hook and side effects.
 * 
 * WHAT WE'RE TESTING:
 * - Side effects (document title updates)
 * - Timers and intervals
 * - Cleanup functions
 * - API calls and async operations
 * - Loading and error states
 * 
 * NEW CONCEPTS:
 * - Testing side effects
 * - Mocking timers with vi.useFakeTimers()
 * - Testing async operations with waitFor()
 * - Mocking fetch API
 * - Testing cleanup functions
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import UseEffectDemo from './10-UseEffectDemo'

describe('UseEffectDemo', () => {
  it('renders the main heading', () => {
    render(<UseEffectDemo />)
    
    const heading = screen.getByRole('heading', { name: '10. useEffect Hook' })
    expect(heading).toBeInTheDocument()
  })

  it('displays all key points about useEffect', () => {
    render(<UseEffectDemo />)
    
    expect(screen.getByText(/Effects run after every render by default/)).toBeInTheDocument()
    expect(screen.getByText(/Use dependency array to control when effects run/)).toBeInTheDocument()
    expect(screen.getByText(/Return cleanup function to prevent memory leaks/)).toBeInTheDocument()
  })

  /**
   * TESTING DOCUMENT TITLE SIDE EFFECT
   * 
   * useEffect can update the document title.
   * We test that the title changes when state changes.
   */
  it('updates document title when count changes', async () => {
    const user = userEvent.setup()
    render(<UseEffectDemo />)
    
    // Initial title should be "Count: 0"
    expect(document.title).toBe('Count: 0')
    
    // Find and click increment button in the first example
    const buttons = screen.getAllByRole('button')
    const incrementButton = buttons.find(btn => btn.textContent === 'Increment')
    
    expect(incrementButton).toBeDefined()
    await user.click(incrementButton!)
    
    // Title should update to "Count: 1"
    expect(document.title).toBe('Count: 1')
  })

  /**
   * TESTING API CALLS
   * 
   * useEffect is commonly used for data fetching.
   * We mock the fetch API to test this.
   */
  describe('API call on mount', () => {
    beforeEach(() => {
      // Mock fetch API
      globalThis.fetch = vi.fn() as typeof fetch
    })

    afterEach(() => {
      vi.restoreAllMocks()
    })

    it('displays loading state initially', () => {
      // Mock fetch to never resolve (stays loading)
      vi.mocked(globalThis.fetch).mockImplementation(() => new Promise(() => {}))
      
      render(<UseEffectDemo />)
      
      expect(screen.getByText('Loading users...')).toBeInTheDocument()
    })

    it('displays users after successful API call', async () => {
      // Mock successful API response
      const mockUsers = [
        { id: 1, name: 'User 1' },
        { id: 2, name: 'User 2' },
        { id: 3, name: 'User 3' },
      ]
      
      vi.mocked(globalThis.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockUsers,
      } as Response)
      
      render(<UseEffectDemo />)
      
      // Wait for users to load
      await waitFor(() => {
        expect(screen.getByText('User 1')).toBeInTheDocument()
      })
      
      expect(screen.getByText('User 2')).toBeInTheDocument()
      expect(screen.getByText('User 3')).toBeInTheDocument()
    })

    it('displays error message when API call fails', async () => {
      // Mock failed API response
      vi.mocked(globalThis.fetch).mockResolvedValueOnce({
        ok: false,
        status: 500,
      } as Response)
      
      render(<UseEffectDemo />)
      
      // Wait for error to appear
      await waitFor(() => {
        expect(screen.getByText(/Error: HTTP 500/)).toBeInTheDocument()
      })
    })

    it('handles network errors', async () => {
      // Mock network error
      vi.mocked(globalThis.fetch).mockRejectedValueOnce(new Error('Network error'))
      
      render(<UseEffectDemo />)
      
      // Wait for error to appear
      await waitFor(() => {
        expect(screen.getByText(/Error: Network error/)).toBeInTheDocument()
      })
    })
  })

  it('displays useEffect patterns table', () => {
    render(<UseEffectDemo />)
    
    // Testing table headers
    expect(screen.getByRole('columnheader', { name: 'Pattern' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Dependencies' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'When It Runs' })).toBeInTheDocument()
    
    // Testing patterns
    expect(screen.getByText('No array')).toBeInTheDocument()
    expect(screen.getByText('Empty array')).toBeInTheDocument()
    expect(screen.getByText('With dependencies')).toBeInTheDocument()
  })

  it('shows all example sections', () => {
    render(<UseEffectDemo />)
    
    expect(screen.getByRole('heading', { name: 'Example 1: Document Title (Side Effect)' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Example 2: Timer with Cleanup' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Example 3: API Call on Mount' })).toBeInTheDocument()
  })
})

/**
 * KEY TESTING CONCEPTS LEARNED:
 * 
 * 1. TESTING SIDE EFFECTS:
 *    - Test the observable result, not the effect itself
 *    - Example: Test document.title, not that useEffect ran
 *    - Focus on what users/systems observe
 * 
 * 2. TESTING TIMERS:
 *    - Use vi.useFakeTimers() to control time
 *    - Use vi.advanceTimersByTime(ms) to move time forward
 *    - Use vi.restoreAllMocks() to clean up
 *    - Set userEvent delay to null with fake timers
 * 
 * 3. TESTING ASYNC OPERATIONS:
 *    - Use waitFor() to wait for async updates
 *    - Use async/await in test functions
 *    - Mock async APIs (fetch, setTimeout, etc.)
 * 
 * 4. MOCKING FETCH API:
 *    - Mock global.fetch with vi.fn()
 *    - Use mockResolvedValueOnce() for success
 *    - Use mockRejectedValueOnce() for errors
 *    - Return { ok, json, status } for HTTP responses
 * 
 * 5. TESTING LOADING STATES:
 *    - Mock fetch to never resolve for loading state
 *    - Test that loading indicator appears
 *    - Test that loading disappears after data loads
 * 
 * 6. TESTING ERROR STATES:
 *    - Mock API failures (HTTP errors, network errors)
 *    - Verify error messages are displayed
 *    - Test different error scenarios
 * 
 * 7. TESTING CLEANUP:
 *    - Test that timers stop when component unmounts
 *    - Test that subscriptions are cancelled
 *    - Verify no memory leaks occur
 * 
 * 8. BEFOREEACH/AFTEREACH:
 *    - Use beforeEach() to set up mocks
 *    - Use afterEach() to clean up
 *    - Keeps tests isolated and independent
 * 
 * BEST PRACTICES:
 * - Always clean up mocks and timers
 * - Test observable behavior, not implementation
 * - Use fake timers for deterministic tests
 * - Mock external dependencies (APIs, timers)
 * - Test loading, success, and error states
 * 
 * COMMON PATTERNS:
 * - Render → Wait for effect → Verify result
 * - Mock API → Render → Wait → Verify data
 * - Start timer → Advance time → Verify update
 * 
 * WAITFOR() TIPS:
 * - Use when waiting for async updates
 * - Default timeout is 1000ms
 * - Can customize timeout: waitFor(() => {}, { timeout: 3000 })
 * - Polls until condition is true or timeout
 * 
 * NEXT STEPS:
 * - Try testing useEffect with dependencies
 * - Practice testing WebSocket connections
 * - Experiment with testing subscriptions
 * - Learn about testing custom hooks with useEffect
 */
