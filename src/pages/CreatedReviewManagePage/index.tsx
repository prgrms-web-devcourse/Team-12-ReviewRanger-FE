//생성한 리뷰 관리 페이지

import { AxiosError } from 'axios'
import { Suspense, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useToast } from '@/hooks'
import { Header, Modal, ReviewInfo } from '@/components'
import {
  useCloseSurvey,
  useGetReviewForCreator,
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
  const { addToast } = useToast()
  const reviewId = pathname.split('/').at(-1) ?? ''

  //NOTE - 작성자별 탭인지, 수신자별 탭인지
  const [activeTab, setActiveTab] = useState<'responser' | 'receiver'>(
    'responser',
  )

  //NOTE - 리뷰의 질문을 가져온다!
  const { data: getReviewQuestion, refetch: getUpdatdReviewQuestion } =
    useGetReviewForCreator({
      id: Number(reviewId),
    })

  const { data: checkAllReceiverReceived } = useCheckAllReceiverReceived({
    id: reviewId,
  })

  const { mutate: closeReview } = useCloseSurvey({ id: reviewId })

  const { mutate: sendReview } = useSendReview({ reviewId })
  const handleClickSurveyClose = () => {
    closeReview(undefined, {
      onSuccess: () => {
        addToast({
          message: '리뷰가 성공적으로 마감되었습니다!',
          type: 'success',
        })
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          addToast({
            message: error?.response?.data.message,
            type: 'error',
          })
        }
      },
    })
  }

  const handleClickSendSurvey = () => {
    if (getReviewQuestion?.status === 'END') {
      //NOTE - 토스트 처리

      return
    }

    sendReview(undefined, {
      onSuccess: ({ data }) => {
        if (data.errorCode && data.message) {
          addToast({ message: data.message, type: 'error' })

          return
        }

        addToast({
          message: '리뷰가 성공적으로 전송되었어요!',
          type: 'success',
        })
        getUpdatdReviewQuestion()
      },
    })
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
          questionOption={
            getReviewQuestion.status as 'END' | 'DEADLINE' | 'PROCEEDING'
          }
          reviewId={reviewId}
          ResponserList={
            getReviewQuestion.status === 'END'
              ? getReviewQuestion.receivers.map(
                  (receiver) => receiver.receiverId,
                )
              : checkAllReceiverReceived?.data
          }
        />
      </Suspense>
    ),
  }

  return (
    <div className="flex h-auto min-h-screen w-full flex-col bg-main-ivory text-black dark:bg-main-red-100 dark:text-white">
      <div className="sticky top-0">
        <Header />
        <div className="flex  justify-center bg-main-red-300 text-center text-lg text-white">
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[37.5rem] flex-col px-5 py-7 md:p-10">
        <ReviewInfo
          {...{
            title: getReviewQuestion?.title,
            description: getReviewQuestion?.description,
          }}
        />
        <div className="mt-7">{REVIEW_MANAGE_TAB_CONTENT[activeTab]}</div>
        {getReviewQuestion?.status === 'PROCEEDING' && (
          <button
            className={`btn fixed bottom-10 cursor-pointer self-end rounded-md bg-active-orange text-white dark:text-black
    `}
          >
            <label htmlFor="close-review" className="cursor-pointer">
              설문 마감
            </label>
          </button>
        )}

        {getReviewQuestion.status === 'DEADLINE' && (
          <button
            className={`btn fixed bottom-10 h-[2.5rem] w-[6.25rem] cursor-pointer self-end rounded-md bg-active-orange leading-[1.3125rem] text-white dark:text-black
          `}
            disabled={!checkAllReceiverReceived?.success}
          >
            <label htmlFor="send-review" className="cursor-pointer">
              전송
            </label>
          </button>
        )}

        {getReviewQuestion.status === 'END' && (
          <button
            className={`btn fixed bottom-10 h-[2.5rem] w-[6.25rem] cursor-pointer self-end rounded-md bg-gray-100 font-bold leading-[1.3125rem] text-white
          `}
            disabled
          >
            전송완료
          </button>
        )}
      </div>
      <Modal
        modalId="close-review"
        handleClickLabel={handleClickSurveyClose}
        content="설문을 마감하시겠습니까?"
        label="마감하기"
      />
      <Modal
        modalId="send-review"
        handleClickLabel={handleClickSendSurvey}
        content="설문을 전송하시겠습니까?"
        label="전송하기"
      />
    </div>
  )
}
export default CreatedReviewManagePage
