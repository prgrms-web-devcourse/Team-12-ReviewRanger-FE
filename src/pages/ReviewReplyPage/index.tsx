import { useState } from 'react'
import { Header } from '@/components'
import { useGetReviewFirst } from '@/apis/hooks'
import { Receiver } from '@/apis/hooks/useGetReviewFirst'
import { ReceiverSelect, ReviewReply } from './components'

const reviewId = 812

const ReviewReplyPage = () => {
  const [selectedReceivers, setSelectedReceivers] = useState<Receiver[]>([])
  const [checkSelectedReceiver, setCheckSelectedReceiver] =
    useState<boolean>(false)

  const { data } = useGetReviewFirst({ id: reviewId })
  const reviewData = data?.data

  return (
    <div className="flex h-screen flex-col items-center bg-main-ivory dark:bg-main-red-100">
      <Header />
      {reviewData && (
        <div className="flex h-full w-full max-w-[550px] flex-col p-5 text-black">
          <h1 className="text-lg dark:text-white md:text-2xl">
            {reviewData.title}
          </h1>
          {!checkSelectedReceiver ? (
            <ReceiverSelect
              setCheckSelectedReceiver={setCheckSelectedReceiver}
              reviewData={reviewData}
              selectedReceivers={selectedReceivers}
              setSelectedReceivers={setSelectedReceivers}
            />
          ) : (
            <>
              <ReviewReply
                receivers={selectedReceivers}
                reviewData={reviewData}
              />
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default ReviewReplyPage
