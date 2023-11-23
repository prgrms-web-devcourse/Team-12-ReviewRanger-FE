import dayjs from 'dayjs'
import { ReceivedReview } from '@/types'

interface ReceivedReviewItemProps extends ReceivedReview {
  className: string
  handleReviewClick: (id: number) => void
}

const ReceivedReviewItem = ({
  id,
  title,
  createdAt,
  className,
  handleReviewClick,
}: ReceivedReviewItemProps) => {
  return (
    <div className={className} onClick={() => handleReviewClick(id)}>
      <div className="flex"></div>

      <p className="line-clamp-2 text-center text-base text-black dark:text-sub-red-100 md:text-xl">
        {title}
      </p>
      <p className="text-right text-xs text-black dark:text-sub-red-100 md:text-sm">
        전송일: {dayjs(createdAt).format('YYYY-MM-DD')}
      </p>
    </div>
  )
}

export default ReceivedReviewItem
