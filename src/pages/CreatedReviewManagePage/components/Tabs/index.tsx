import {
  REVIEW_MANAGE_TAB_MENU_STYLE,
  REVIEW_MANAGE_TAB_TITLE,
} from '../../constants'

interface TabsProps {
  activeTab: 'responser' | 'receiver'
  setActiveTab: (tabs: 'responser' | 'receiver') => void
}

const Tabs = ({ activeTab, setActiveTab }: TabsProps) => {
  const tabBorder = `after:absolute after:bottom-0 after:h-1 after:w-full after:bg-white after-duration-[400ms] after:content-[''] after:transition-transform after:scale-x-[0.25] after:rounded-full ${REVIEW_MANAGE_TAB_MENU_STYLE[activeTab]} w-full`

  return (
    <div className="w-full shadow-md">
      <div
        className={`relative mx-auto flex h-11 max-w-[55rem] justify-between bg-main-red-300 text-lg text-white md:h-[3.125rem] md:text-2xl ${tabBorder}`}
      >
        <button className="grow" onClick={() => setActiveTab('responser')}>
          {REVIEW_MANAGE_TAB_TITLE.responser}
        </button>
        <button className="grow" onClick={() => setActiveTab('receiver')}>
          {REVIEW_MANAGE_TAB_TITLE.receiver}
        </button>
      </div>
    </div>
  )
}

export default Tabs
