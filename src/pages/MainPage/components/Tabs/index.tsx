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
      className={`z-10 h-11 bg-main-red-300 text-lg text-white shadow-md md:h-[3.125rem]  md:text-2xl`}
    >
      <div
        className={`relative h-full ${tabBorder} mx-auto flex max-w-[55rem]`}
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
    </div>
  )
}

export default Tabs
