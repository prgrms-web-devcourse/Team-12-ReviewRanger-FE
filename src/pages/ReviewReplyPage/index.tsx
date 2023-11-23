import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate, useLocation } from 'react-router-dom'
import { Header } from '@/components'
import { useCreateResponse, useGetReviewFirst } from '@/apis/hooks'
import { ReceiverSelect, ReviewReply } from './components'
import { ReviewReplyType } from './types'

const ReviewReplyPage = () => {
  const navigate = useNavigate()
  const { pathname, state } = useLocation()
  //NOTE - 리뷰ID
  const reviewId = pathname.split('/').at(-1) ?? ''
  const [reviewStep, setReviewStep] = useState<number>(1)

  const { data: reviewData } = useGetReviewFirst({ id: Number(reviewId) })
  const { mutate: createResponse } = useCreateResponse()
  const { title, description, receivers } = reviewData

  const methods = useForm<ReviewReplyType>({
    defaultValues: {
      id: state?.participationId,
      nonReceiverList: receivers,
    },
  })

  const handleSubmitReply = () => {
    const requestData = {
      id: state?.participationId,
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
