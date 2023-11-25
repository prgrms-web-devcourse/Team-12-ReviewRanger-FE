//생성한 리뷰 관리 페이지

import { Suspense, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Header } from '@/components'
import {
  useCloseSurvey,
  useGetReviewQuestion,
  useCheckAllReceiverReceived,
  useSendReview,
} from '@/apis/hooks'

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
  })

  const { data: checkAllReceiverReceived } = useCheckAllReceiverReceived({
    id: reviewId,
  })

  const { mutate: closeReview } = useCloseSurvey({ id: reviewId })

  const { mutate: sendReview } = useSendReview()
  const handleClickSurveyClose = () => {
    closeReview()
  }

  const handleClickSendSurvey = () => {
    if (!checkAllReceiverReceived?.success) {
      //NOTE - 토스트 처리

      return
    }

    sendReview({ reviewId })
  }

  const REVIEW_MANAGE_TAB_CONTENT = {
    responser: (
      <Suspense
        fallback={
          <div className="flex items-center justify-center">
            <div className="spinner-simple"></div>
          </div>
        }
      >
        <AllResponseReviewByResponser reviewId={reviewId} />
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
        <AllResponseReviewByReceiver
          reviewId={reviewId}
          ResponserList={checkAllReceiverReceived?.data}
        />
      </Suspense>
    ),
  }

  return (
    <div className="flex h-auto min-h-screen flex-col bg-main-ivory text-black dark:bg-main-red-100 dark:text-white">
      <div className="sticky top-0 ">
        <Header />
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <div className="mx-auto flex w-full max-w-[800px] flex-col px-5 py-7 md:p-10">
        <h1 className="text-xl md:text-2xl">
          {getReviewQuestion?.data?.title}
        </h1>
        <h2 className="mt-3 text-sm md:mt-4 md:text-xl">
          {getReviewQuestion?.data?.description}
        </h2>
        <div className="mt-7">{REVIEW_MANAGE_TAB_CONTENT[activeTab]}</div>
        {getReviewQuestion?.data?.status === 'PROCEEDING' ? (
          <button
            className={`btn fixed bottom-10 cursor-pointer self-end rounded-md bg-active-orange text-white dark:text-black
    `}
            onClick={handleClickSurveyClose}
          >
            설문 마감
          </button>
        ) : (
          <button
            className={`btn fixed bottom-10 h-[2.5rem] w-[6.25rem] cursor-pointer self-end rounded-md bg-active-orange leading-[1.3125rem] text-white dark:text-black
          `}
            disabled={!checkAllReceiverReceived?.success}
            onClick={handleClickSendSurvey}
          >
            전송
          </button>
        )}
      </div>
    </div>
  )
}
export default CreatedReviewManagePage
