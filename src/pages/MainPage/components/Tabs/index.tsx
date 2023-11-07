import { Dispatch, SetStateAction } from 'react'
import { TAB_MENU_TITLE, TAB_MENU_STYLE } from '../../constants'

interface TabsProps {
  activeTab: 'invited' | 'created' | 'received'
  setActiveTab: Dispatch<SetStateAction<'invited' | 'created' | 'received'>>
}

const Tabs = ({ activeTab, setActiveTab }: TabsProps) => {
  const tabBorder = `after:absolute after:bottom-0 after:h-1 after:w-full after:bg-white after-duration-[400ms] after:content-[''] after:transition-transform after:scale-x-[0.25] after:rounded-full ${TAB_MENU_STYLE[activeTab]}`

  return (
    <div
      className={`relative z-10 flex h-11 bg-main-red-300 text-lg text-white md:h-[3.125rem] md:text-2xl ${tabBorder} sticky top-0 shadow-md`}
    >
      <button className="grow" onClick={() => setActiveTab('invited')}>
        {TAB_MENU_TITLE.invited}
      </button>
      <button className="grow" onClick={() => setActiveTab('created')}>
        {TAB_MENU_TITLE.created}
      </button>
      <button className="grow" onClick={() => setActiveTab('received')}>
        {TAB_MENU_TITLE.received}
      </button>
    </div>
  )
}

export default Tabs
