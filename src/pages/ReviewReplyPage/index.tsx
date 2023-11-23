import { useLocation } from 'react-router-dom'
import { Header } from '@/components'
import { ReviewReplyEdit, ReviewReplyStart } from './components'

const ReviewReplyPage = () => {
  const { state } = useLocation()

  console.log(state.submitStatus)

  return (
    <div className="flex h-screen flex-col items-center bg-main-ivory dark:bg-main-red-100">
      <Header />
      {!state.submitStatus ? <ReviewReplyStart /> : <ReviewReplyEdit />}
    </div>
  )
}

export default ReviewReplyPage
