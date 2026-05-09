// Theme action types
export const TOGGLE_THEME = 'TOGGLE_THEME'
export const SET_THEME = 'SET_THEME'

// Action creators
export const toggleTheme = () => ({
  type: TOGGLE_THEME,
})

export const setTheme = (theme) => ({
  type: SET_THEME,
  payload: theme,
})

// Thunk action for initializing theme from localStorage
export const initializeTheme = () => (dispatch) => {
  const stored = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const theme = stored || (prefersDark ? 'dark' : 'light')
  
  dispatch(setTheme(theme))
}
