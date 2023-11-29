import { useLocation } from 'react-router-dom'
import { Header } from '@/components'
import { ReviewReplyEdit, ReviewReplyEnd, ReviewReplyStart } from './components'

const ReviewReplyPage = () => {
  const { state } = useLocation()
  const { submitStatus, status: reviewStatus } = state

  return (
    <div className="flex h-screen flex-col items-center overflow-auto bg-main-ivory dark:bg-main-red-100">
      <Header />
      {reviewStatus === 'PROCEEDING' &&
        (!submitStatus ? <ReviewReplyStart /> : <ReviewReplyEdit />)}
      {(reviewStatus === 'END' || reviewStatus === 'DEADLINE') && (
        <ReviewReplyEnd />
      )}
    </div>
  )
}

export default ReviewReplyPage
