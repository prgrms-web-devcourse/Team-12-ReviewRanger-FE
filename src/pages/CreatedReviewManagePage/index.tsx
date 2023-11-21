//생성한 리뷰 관리 페이지
import { Suspense, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Header } from '@/components'
import { useCloseSurvey, useGetReviewQuestion } from '@/apis/hooks'

import {
  Tabs,
  AllResponseReviewByResponser,
  AllResponseReviewByReceiver,
} from './components'

const CreatedReviewManagePage = () => {
  const { pathname } = useLocation()
  //NOTE - 리뷰ID
  const reviewId = pathname.split('/').at(-1) ?? ''

  //NOTE - 작성자별 탭인지, 수신자별 탭인지
  const [activeTab, setActiveTab] = useState<'responser' | 'receiver'>(
    'responser',
  )

  //NOTE - 리뷰의 질문을 가져온다!
  const { data: getReviewQuestion } = useGetReviewQuestion({
    id: reviewId,
  }).data

  const { mutate: closeSurvey } = useCloseSurvey({ id: reviewId })

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
        //NOTE - 설문 진행 상태 여부에 따라 다르게 보여줘야 함
        {getReviewQuestion?.status === 'PROCEEDING' ? (
          <button
            className={`btn fixed bottom-10 self-end rounded-md bg-active-orange text-white dark:text-black
    `}
            onClick={() => closeSurvey()}
          >
            설문 마감
          </button>
        ) : (
          <button
            className={`btn fixed bottom-10 h-[2.5rem] w-[6.25rem] self-end rounded-md bg-active-orange leading-[1.3125rem] text-white dark:text-black
          `}
          >
            전송
          </button>
        )}
      </div>
    </div>
  )
}
export default CreatedReviewManagePage
