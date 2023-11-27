import dayjs from 'dayjs'
import { ReceivedReview } from '@/types'

interface ReceivedReviewItemProps extends ReceivedReview {
  handleClickReview: ({ id }: Pick<ReceivedReview, 'id'>) => void
}

const ReceivedReviewItem = ({
  id,
  title,
  createdAt,
  handleClickReview,
}: ReceivedReviewItemProps) => {
  return (
    <div
      className="btn flex h-36 flex-col items-stretch justify-between rounded-md border border-gray-100 bg-main-yellow p-2.5 transition-transform dark:border-white dark:bg-main-red-200 md:h-40"
      onClick={() => handleClickReview({ id })}
    >
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
