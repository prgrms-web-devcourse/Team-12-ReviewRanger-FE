import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Header } from '@/components'
import { useGetReviewFirst } from '@/apis/hooks'
import { ReceiverSelect, ReviewReply } from './components'
import { ReviewReplyType } from './types/index'

const reviewId = 812

const ReviewReplyPage = () => {
  const [reviewStep, setReviewStep] = useState<number>(1)

  const { data } = useGetReviewFirst({ id: reviewId })
  const reviewData = data?.data

  const methods = useForm<ReviewReplyType>()

  return (
    <div className="flex h-screen flex-col items-center bg-main-ivory dark:bg-main-red-100">
      <Header />
      {reviewData && (
        <div className="flex h-full w-full max-w-[550px] flex-col p-5 text-black">
          <h1 className="text-lg dark:text-white md:text-2xl">
            {reviewData.title}
          </h1>
          <FormProvider {...methods}>
            {reviewStep === 1 && (
              <ReceiverSelect
                setReviewStep={setReviewStep}
                reviewData={reviewData}
              />
            )}
            {reviewStep === 2 && <ReviewReply reviewData={reviewData} />}
          </FormProvider>
        </div>
      )}
    </div>
  )
}

export default ReviewReplyPage
