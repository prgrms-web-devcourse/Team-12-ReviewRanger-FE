//생성한 리뷰 관리 페이지
import { Suspense, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Header } from '@/components'
import { useGetReviewQuestion } from '@/apis/hooks'
import {
  Tabs,
  AllResponseReviewByResponser,
  AllResponseReviewByReceiver,
} from './components'
import { PATH } from './constants'

const CreatedReviewManagePage = () => {
  const { pathname } = useLocation()
  const reviewId = pathname.replace(`${PATH.REVIEW_MANAGEMENT}`, '')

  const { data } = useGetReviewQuestion({ id: reviewId })
  const [activeTab, changeTab] = useState<'responser' | 'receiver'>('responser')

  const REVIEW_MANAGE_TAB_CONTENT = {
    responser: (
      <Suspense
        fallback={
          <div className="flex items-center justify-center">
            <div className="spinner-simple"></div>
          </div>
        }
      >
        <AllResponseReviewByResponser surveyId={reviewId} />
      </Suspense>
    ),
    receiver: (
      <Suspense
        fallback={
          <div className="flex items-center justify-center">
            <div className="spinner-simple"></div>
          </div>
        }
      >
        <AllResponseReviewByReceiver surveyId={reviewId} />
      </Suspense>
    ),
  }

  return (
    <div className="flex h-auto min-h-screen flex-col bg-main-ivory  text-black dark:bg-main-red-100 dark:text-white">
      <div className="sticky top-0 z-10">
        <Header />
        <Tabs activeTab={activeTab} setActiveTab={changeTab} />
      </div>
      <div className="m-0 flex w-full justify-center p-5 md:p-10">
        <div className="m-0 flex w-[550px] max-w-[550px] flex-col">
          <div>{data?.data.title}</div>
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
