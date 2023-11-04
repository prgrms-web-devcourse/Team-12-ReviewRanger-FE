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
  /** 최근 7일 이내 전송된 데이터인지 여부 */
  const newStatus =
    createdAt && dayjs(createdAt).isAfter(dayjs().subtract(7, 'day'))

  return (
    <div className={className} onClick={() => handleReviewClick(id)}>
      <div className="flex">
        {newStatus && (
          <span className="rounded-full bg-sub-red-200 px-1.5 py-0.5 text-xs text-white md:text-sm">
            N
          </span>
        )}
      </div>

      <p className="line-clamp-2 text-center text-base dark:text-sub-red-100 md:text-xl">
        {title}
      </p>
      <p className="text-right text-xs text-black dark:text-sub-red-100 md:text-sm">
        전송일: {dayjs(createdAt).format('YYYY-MM-DD')}
      </p>
    </div>
  )
}

export default ReceivedReviewItem
