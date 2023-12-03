import { useContext } from 'react'
import { TabsContext } from '@/contexts'

const useDarkMode = () => {
  return useContext(TabsContext)
}

export default useDarkMode
