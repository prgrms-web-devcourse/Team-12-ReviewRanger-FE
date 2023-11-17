import { createContext } from 'react'

const ThemeContext = createContext({
  darkMode: false,
  toggle: () => {},
})

export default ThemeContext
