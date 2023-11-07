//생성한 리뷰 관리 페이지
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useGetAllResponse } from '@/apis/hooks'
import {
  ReviewManageTabs,
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

  const [activeTab, setActiveTab] = useState<'responser' | 'receiver'>(
    'responser',
  )

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

      <ReviewManageTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div>{REVIEW_MANAGE_TAB_CONTENT[activeTab]}</div>
    </h1>
  )
}
export default CreatedReviewManagePage
