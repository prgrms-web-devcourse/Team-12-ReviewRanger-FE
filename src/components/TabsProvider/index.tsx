import { PropsWithChildren, useState } from 'react'
import { TabsContext } from '@/contexts'

const TabsProvider = ({ children }: PropsWithChildren) => {
  const [activeTab, setActiveTab] = useState<
    'invited' | 'created' | 'received'
  >('invited')

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  )
}

export default TabsProvider
