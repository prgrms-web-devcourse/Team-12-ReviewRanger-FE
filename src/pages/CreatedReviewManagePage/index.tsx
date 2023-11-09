//생성한 리뷰 관리 페이지
import { useLocation } from 'react-router-dom'
import { useGetAllResponse } from '@/apis/hooks'
import useActiveTab from '@/pages/CreatedReviewManagePage/hooks/useReviewTab'
import {
  Tabs,
  AllResponseReviewByResponser,
  AllResponseReviewByReceiver,
} from './components'
import { PATH } from './constants'

const CreatedReviewManagePage = () => {
  const { pathname } = useLocation()
  const reviewId = pathname.replace(`${PATH.REVIEW_MANAGEMENT}`, '')

  const { allResponseByReceiver, allResponseByResponser } = useGetAllResponse({
    reviewId,
  })

  const { activeTab, changeTab } = useActiveTab('responser')

  const REVIEW_MANAGE_TAB_CONTENT = {
    responser: (
      <AllResponseReviewByResponser data={allResponseByResponser.data.data} />
    ),
    receiver: (
      <AllResponseReviewByReceiver data={allResponseByReceiver.data.data} />
    ),
  }

  return (
    <div className="flex h-auto min-h-screen flex-col gap-2 bg-main-ivory  text-black dark:bg-main-red-100 dark:text-white ">
      <Tabs activeTab={activeTab} setActiveTab={changeTab} />
      <div className="m-0 flex  w-full justify-center p-5 md:p-10">
        <div className="m-0 flex w-[550px] max-w-[550px] flex-col">
          <div>{allResponseByResponser.data.data.title}</div>
          <div>{REVIEW_MANAGE_TAB_CONTENT[activeTab]}</div>
          <div className="mt-[50px] flex w-full justify-end">
            <button className="w-25 btn h-10 rounded bg-active-orange text-white">
              설문 마감
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CreatedReviewManagePage
