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

const CreatedReviewManagePage = () => {
  const { pathname } = useLocation()
  const reviewId = pathname.split('/').at(-1) ?? ''

  const [activeTab, setActiveTab] = useState<'responser' | 'receiver'>(
    'responser',
  )

  const { data: getReviewQuestion } = useGetReviewQuestion({
    id: reviewId,
  }).data

  console.log(getReviewQuestion.status)

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
    <div className="flex h-auto min-h-screen flex-col bg-main-ivory text-black dark:bg-main-red-100 dark:text-white">
      <div className="sticky top-0 z-10">
        <Header />
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <div className="mx-auto flex w-full max-w-[800px] flex-col px-5 py-7 md:p-10">
        <h1 className="text-xl md:text-2xl">{getReviewQuestion?.title}</h1>
        <h2 className="mt-3 text-sm md:mt-4 md:text-xl">
          {getReviewQuestion?.description}
        </h2>
        <div className="mt-7">{REVIEW_MANAGE_TAB_CONTENT[activeTab]}</div>
        <button
          disabled={getReviewQuestion?.status === 'END'}
          className={`btn fixed bottom-10 self-end rounded-md bg-active-orange text-white dark:text-black
  `}
        >
          설문 마감
        </button>
      </div>
    </div>
  )
}
export default CreatedReviewManagePage
