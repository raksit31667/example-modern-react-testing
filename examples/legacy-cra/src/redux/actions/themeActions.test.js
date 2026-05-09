import { TOGGLE_THEME, SET_THEME, toggleTheme, setTheme, initializeTheme } from './themeActions'

describe('Theme Actions', () => {
  describe('toggleTheme', () => {
    it('creates TOGGLE_THEME action', () => {
      const expectedAction = {
        type: TOGGLE_THEME,
      }
      expect(toggleTheme()).toEqual(expectedAction)
    })
  })

  describe('setTheme', () => {
    it('creates SET_THEME action with light theme', () => {
      const theme = 'light'
      const expectedAction = {
        type: SET_THEME,
        payload: theme,
      }
      expect(setTheme(theme)).toEqual(expectedAction)
    })

    it('creates SET_THEME action with dark theme', () => {
      const theme = 'dark'
      const expectedAction = {
        type: SET_THEME,
        payload: theme,
      }
      expect(setTheme(theme)).toEqual(expectedAction)
    })
  })

  describe('initializeTheme', () => {
    let mockDispatch

    beforeEach(() => {
      mockDispatch = jest.fn()
      localStorage.clear()
    })

    it('initializes from localStorage if available', () => {
      localStorage.setItem('theme', 'dark')
      
      // Mock matchMedia for this test
      window.matchMedia = jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }))
      
      const thunk = initializeTheme()
      thunk(mockDispatch)

      expect(mockDispatch).toHaveBeenCalledWith({
        type: SET_THEME,
        payload: 'dark',
      })
    })

    it('defaults to light theme when no localStorage value', () => {
      // Mock matchMedia to return false for dark mode preference
      window.matchMedia = jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }))

      const thunk = initializeTheme()
      thunk(mockDispatch)

      expect(mockDispatch).toHaveBeenCalledWith({
        type: SET_THEME,
        payload: 'light',
      })
    })

    it('respects system preference when no localStorage value', () => {
      // Mock matchMedia to return true for dark mode preference
      window.matchMedia = jest.fn().mockImplementation((query) => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }))

      const thunk = initializeTheme()
      thunk(mockDispatch)

      expect(mockDispatch).toHaveBeenCalledWith({
        type: SET_THEME,
        payload: 'dark',
      })
    })
  })
})
