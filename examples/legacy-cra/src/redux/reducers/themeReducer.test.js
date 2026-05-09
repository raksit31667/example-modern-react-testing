import themeReducer from './themeReducer'
import { TOGGLE_THEME, SET_THEME } from '../actions/themeActions'

describe('themeReducer', () => {
  const initialState = {
    theme: 'light',
  }

  beforeEach(() => {
    localStorage.clear()
  })

  it('returns initial state', () => {
    expect(themeReducer(undefined, {})).toEqual(initialState)
  })

  describe('TOGGLE_THEME', () => {
    it('toggles from light to dark', () => {
      const state = { theme: 'light' }
      const action = { type: TOGGLE_THEME }
      
      const newState = themeReducer(state, action)
      
      expect(newState).toEqual({ theme: 'dark' })
      expect(localStorage.getItem('theme')).toBe('dark')
    })

    it('toggles from dark to light', () => {
      const state = { theme: 'dark' }
      const action = { type: TOGGLE_THEME }
      
      const newState = themeReducer(state, action)
      
      expect(newState).toEqual({ theme: 'light' })
      expect(localStorage.getItem('theme')).toBe('light')
    })

    it('does not mutate original state', () => {
      const state = { theme: 'light' }
      const action = { type: TOGGLE_THEME }
      
      themeReducer(state, action)
      
      expect(state).toEqual({ theme: 'light' })
    })
  })

  describe('SET_THEME', () => {
    it('sets theme to light', () => {
      const state = { theme: 'dark' }
      const action = { type: SET_THEME, payload: 'light' }
      
      const newState = themeReducer(state, action)
      
      expect(newState).toEqual({ theme: 'light' })
      expect(localStorage.getItem('theme')).toBe('light')
    })

    it('sets theme to dark', () => {
      const state = { theme: 'light' }
      const action = { type: SET_THEME, payload: 'dark' }
      
      const newState = themeReducer(state, action)
      
      expect(newState).toEqual({ theme: 'dark' })
      expect(localStorage.getItem('theme')).toBe('dark')
    })

    it('does not mutate original state', () => {
      const state = { theme: 'light' }
      const action = { type: SET_THEME, payload: 'dark' }
      
      themeReducer(state, action)
      
      expect(state).toEqual({ theme: 'light' })
    })
  })

  describe('unknown action', () => {
    it('returns current state for unknown action', () => {
      const state = { theme: 'dark' }
      const action = { type: 'UNKNOWN_ACTION' }
      
      expect(themeReducer(state, action)).toEqual(state)
    })
  })
})
