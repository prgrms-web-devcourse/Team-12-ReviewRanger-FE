import { PropsWithChildren, useState } from 'react'
import { TabsContext } from '@/contexts'
import { Tabs } from '@/types'

const TabsProvider = ({ children }: PropsWithChildren) => {
  const [activeTab, setActiveTab] = useState<Tabs>('invited')

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  )
}

export default TabsProvider
