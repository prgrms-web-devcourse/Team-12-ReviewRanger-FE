import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Header } from '@/components'
import { useCreateResponse, useGetReviewFirst } from '@/apis/hooks'
import { ReceiverSelect, ReviewReply } from './components'
import { ReviewReplyType } from './types/index'

const reviewId = 123

const ReviewReplyPage = () => {
  const navigate = useNavigate()

  // NOTE: Step1에서는 리뷰 대상자를 선택하는 페이지, Step2에서는 질문에 답변하는 페이지
  const [reviewStep, setReviewStep] = useState<number>(1)

  // NOTE: reviewId를 기반으로 초대받은 리뷰 데이터들을 가져옴.
  const { data: reviewData } = useGetReviewFirst({ id: reviewId })
  const { mutate: createResponse } = useCreateResponse()
  const { title, description, receivers } = reviewData

  // NOTE: useForm 사용하여 전체 폼 데이터 관리
  const methods = useForm<ReviewReplyType>({
    defaultValues: {
      id: reviewId,
      nonReceiverList: receivers,
    },
  })

  // NOTE: 리뷰 답변을 최종 제출하는 함수.
  const handleSubmitReply = () => {
    const requestData = {
      id: methods.getValues('id'),
      replyTargets: methods.getValues('replyTargets'),
    }

    createResponse(requestData, {
      onSuccess: () => navigate('/'),
    })
  }

  return (
    <div className="flex h-screen flex-col items-center bg-main-ivory dark:bg-main-red-100">
      <Header />
      {reviewData && (
        <div className="flex h-full w-full max-w-[550px] flex-col p-5 text-black">
          <h1 className="text-lg dark:text-white md:text-2xl">{title}</h1>
          {reviewStep === 1 && (
            <p className="mt-2.5 whitespace-pre-wrap text-sm dark:text-white md:text-lg">
              {description}
            </p>
          )}
          <FormProvider {...methods}>
            {reviewStep === 1 && (
              <ReceiverSelect
                setReviewStep={setReviewStep}
                questions={reviewData.questions}
              />
            )}
            {reviewStep === 2 && (
              <ReviewReply
                reviewData={reviewData}
                handleSubmit={handleSubmitReply}
              />
            )}
          </FormProvider>
        </div>
      )}
    </div>
  )
}

export default ReviewReplyPage
