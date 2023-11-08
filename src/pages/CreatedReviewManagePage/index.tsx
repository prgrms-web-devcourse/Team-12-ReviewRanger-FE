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
      <AllResponseReviewByResponser
        responsers={allResponseByResponser.data.responsers}
        responserCount={allResponseByResponser.data.responserCount}
      />
    ),
    receiver: (
      <AllResponseReviewByReceiver
        recipientList={allResponseByReceiver.data.recipientList}
      />
    ),
  }

  return (
    <h1>
      <div className="flex justify-center text-4xl">
        {allResponseByResponser.data.title}
      </div>

      <Tabs activeTab={activeTab} setActiveTab={changeTab} />
      <div>{REVIEW_MANAGE_TAB_CONTENT[activeTab]}</div>
    </h1>
  )
}
export default CreatedReviewManagePage
