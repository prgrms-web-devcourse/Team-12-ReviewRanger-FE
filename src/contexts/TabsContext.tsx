import { Dispatch, SetStateAction, createContext } from 'react'
import { Tabs } from '@/types'

interface TabsContextType {
  activeTab: Tabs
  setActiveTab: Dispatch<SetStateAction<Tabs>>
}

const TabsContext = createContext<TabsContextType>({
  activeTab: 'invited',
  setActiveTab: () => {},
})

export default TabsContext
