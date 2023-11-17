import { PropsWithChildren, useEffect, useState } from 'react'
import { ThemeContext } from '@/contexts'

const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const darkState =
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)

    if (darkState) {
      document.documentElement.classList.add('dark')
      setDarkMode(true)
    }
  }, [])

  const toggle = () => {
    document.documentElement.classList.toggle('dark')

    setDarkMode((prev) => {
      const newTheme = prev ? 'light' : 'dark'
      localStorage.setItem('theme', newTheme)

      return !prev
    })
  }

  return (
    <ThemeContext.Provider value={{ darkMode, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
