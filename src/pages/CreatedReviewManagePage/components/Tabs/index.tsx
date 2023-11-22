import {
  REVIEW_MANAGE_TAB_MENU_STYLE,
  REVIEW_MANAGE_TAB_TITLE,
} from '../../constants'

interface TabsProps {
  activeTab: 'responser' | 'receiver'
  setActiveTab: (tabs: 'responser' | 'receiver') => void
}

const Tabs = ({ activeTab, setActiveTab }: TabsProps) => {
  const tabBorder = `after:absolute after:bottom-0 after:h-1 after:w-full after:bg-white after-duration-[400ms] after:content-[''] after:transition-transform after:scale-x-[0.25] after:rounded-full ${REVIEW_MANAGE_TAB_MENU_STYLE[activeTab]}`

  return (
    <div
      className={`relative flex h-11 bg-main-red-300 text-lg text-white md:h-[3.125rem] md:text-2xl ${tabBorder} shadow-md`}
    >
      <button className="grow" onClick={() => setActiveTab('responser')}>
        {REVIEW_MANAGE_TAB_TITLE.responser}
      </button>
      <button className="grow" onClick={() => setActiveTab('receiver')}>
        {REVIEW_MANAGE_TAB_TITLE.receiver}
      </button>
    </div>
  )
}

export default Tabs
