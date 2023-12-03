import { useContext } from 'react'
import { TabsContext } from '@/contexts'

const useTabs = () => {
  return useContext(TabsContext)
}

export default useTabs
