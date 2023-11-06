import { Dispatch, SetStateAction } from 'react'
import { TAB_MENU } from '../../constants'

interface TabsProps {
  activeTab: 'invited' | 'created' | 'received'
  setActiveTab: Dispatch<SetStateAction<'invited' | 'created' | 'received'>>
}

const Tabs = ({ activeTab, setActiveTab }: TabsProps) => {
  const { position } = TAB_MENU[activeTab]

  const tabBorder = `after:absolute after:bottom-0 after:h-1 after:w-full after:bg-white after-duration-[400ms] after:content-[''] after:transition-transform after:scale-x-[0.25] after:rounded-full ${position}`

  return (
    <div
      className={`relative flex h-11 bg-main-red-300 text-lg text-white md:h-[3.125rem] md:text-2xl ${tabBorder} sticky top-0 shadow-md`}
    >
      <button className="grow" onClick={() => setActiveTab('invited')}>
        {TAB_MENU.invited.title}
      </button>
      <button className="grow" onClick={() => setActiveTab('created')}>
        {TAB_MENU.created.title}
      </button>
      <button className="grow" onClick={() => setActiveTab('received')}>
        {TAB_MENU.received.title}
      </button>
    </div>
  )
}

export default Tabs
