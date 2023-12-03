import { Dispatch, SetStateAction, createContext } from 'react'

interface TabsContextType {
  activeTab: 'invited' | 'created' | 'received'
  setActiveTab: Dispatch<SetStateAction<'invited' | 'created' | 'received'>>
}

const TabsContext = createContext<TabsContextType>({
  activeTab: 'invited',
  setActiveTab: () => {},
})

export default TabsContext
