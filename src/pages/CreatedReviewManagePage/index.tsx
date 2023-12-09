//생성한 리뷰 관리 페이지

import { AxiosError } from 'axios'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useToast } from '@/hooks'
import { ReviewInfo } from '@/components'
import {
  useCloseSurvey,
  useGetReviewForCreator,
  useCheckAllReceiverReceived,
  useSendReview,
} from '@/apis/hooks'

import { CreatedReviewMangePage } from './SubComponent'

const CreatedReviewManagePage = () => {
  const { pathname } = useLocation()
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

  const handleClickModal = () => {
    if (getReviewQuestion?.status === 'PROCEEDING') {
      return handleClickSurveyClose()
    }
    if (getReviewQuestion?.status === 'DEADLINE') {
      return handleClickSendSurvey()
    }
  }

  const disabled = () => {
    if (getReviewQuestion?.status === 'DEADLINE') {
      return !checkAllReceiverReceived?.success
    }

    if (getReviewQuestion?.status === 'END') {
      return true
    }
  }

  return (
    <div className="flex h-auto min-h-screen w-full flex-col bg-main-ivory text-black dark:bg-main-red-100 dark:text-white">
      <CreatedReviewMangePage.ReviewManageHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="mx-auto flex w-full max-w-[37.5rem] flex-col px-5 py-7 md:p-10">
        <ReviewInfo
          {...{
            title: getReviewQuestion?.title,
            description: getReviewQuestion?.description,
          }}
        />
        <CreatedReviewMangePage.ReviewManageTab
          responserList={
            getReviewQuestion.status === 'END'
              ? getReviewQuestion.receivers.map(
                  (receiver) => receiver.receiverId,
                )
              : checkAllReceiverReceived?.data ?? []
          }
          reviewId={reviewId}
          role={activeTab}
        />
        <CreatedReviewMangePage.ActionButton
          onClickModal={handleClickModal}
          isDisabled={disabled()}
          status={getReviewQuestion?.status}
        />
      </div>
    </div>
  )
}

export default CreatedReviewManagePage
