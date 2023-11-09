//생성한 리뷰 관리 페이지
import { useLocation } from 'react-router-dom'
import { IconButton } from '@/components'
import { useGetAllResponse } from '@/apis/hooks'
import { SendIcon } from '@/assets/icons'
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
    <div className="flex flex-col gap-2 text-black dark:text-white">
      <Tabs activeTab={activeTab} setActiveTab={changeTab} />
      <div className="flex flex-col gap-5 px-5">
        <div>{allResponseByResponser.data.data.title}</div>

        <div>{REVIEW_MANAGE_TAB_CONTENT[activeTab]}</div>
        <div>
          <IconButton text="설문 마감" />
          <IconButton text="설문 마감">
            <SendIcon />
          </IconButton>
        </div>
      </div>
    </div>
  )
}
export default CreatedReviewManagePage
