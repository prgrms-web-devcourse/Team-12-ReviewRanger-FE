import { useState } from 'react'

const useActiveTab = (initialTab: 'responser' | 'receiver') => {
  const [activeTab, setActiveTab] = useState(initialTab)

  const changeTab = (tab: 'responser' | 'receiver') => {
    setActiveTab(tab)
  }

  return { activeTab, changeTab }
}

export default useActiveTab
