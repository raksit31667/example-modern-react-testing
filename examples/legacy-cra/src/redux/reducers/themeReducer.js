import { TOGGLE_THEME, SET_THEME } from '../actions/themeActions'

const initialState = {
  theme: 'light', // 'light' | 'dark'
}

export default function themeReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_THEME: {
      const newTheme = state.theme === 'light' ? 'dark' : 'light'
      // Persist to localStorage
      localStorage.setItem('theme', newTheme)
      return {
        ...state,
        theme: newTheme,
      }
    }
    
    case SET_THEME:
      // Persist to localStorage
      localStorage.setItem('theme', action.payload)
      return {
        ...state,
        theme: action.payload,
      }
    
    default:
      return state
  }
}
