import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate, useLocation } from 'react-router-dom'
import { useToast } from '@/hooks'
import { Header } from '@/components'
import { useCreateResponse, useGetReviewForParticipation } from '@/apis/hooks'
import { ReviewReplyStartType } from '../../types'
import ReceiverSelect from './ReceiverSelect'
import ReviewReply from './ReviewReply'

const ReviewReplyStart = () => {
  const navigate = useNavigate()
  const { addToast } = useToast()
  const { pathname, state } = useLocation()
  const reviewId = parseInt(pathname.split('/').at(-1) as string)
  const [reviewStep, setReviewStep] = useState(1)

  const { data: reviewData } = useGetReviewForParticipation({ id: reviewId })
  const { mutate: createResponse } = useCreateResponse()
  const { title, description, receivers } = reviewData

  const methods = useForm<ReviewReplyStartType>({
    defaultValues: {
      id: state.participationId,
      nonReceiverList: receivers,
    },
  })

  const handleSubmitReply = () => {
    const requestData = {
      id: state.participationId,
      replyTargets: methods.getValues('replyTargets'),
    }

    createResponse(requestData, {
      onSuccess: () => {
        addToast({
          message: '리뷰 답변 제출이 완료되었습니다.',
          type: 'success',
        })
        navigate('/', { replace: true })
      },
    })
  }

  return (
    <>
      <Header />
      <div className="flex h-full w-full max-w-[37.5rem] flex-col p-5 text-black">
        <h1 className="text-2xl font-bold dark:text-white md:text-4xl">
          {title}
        </h1>
        {reviewStep === 1 && (
          <h3 className="mt-2.5 whitespace-pre-wrap text-sm dark:text-white md:text-lg">
            {description}
          </h3>
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
    </>
  )
}

export default ReviewReplyStart
