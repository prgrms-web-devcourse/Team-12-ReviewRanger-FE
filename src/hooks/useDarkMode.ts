import { useContext } from 'react'
import { ThemeContext } from '@/contexts'

const useDarkMode = () => {
  return useContext(ThemeContext)
}

export default useDarkMode
