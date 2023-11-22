import dayjs from 'dayjs'
import { InvitedReview } from '@/types'
import { STATUS, STATUS_STYLE } from '../../constants'

interface InvitedReviewItemProps extends InvitedReview {
  className: string
  handleReviewClick: (id: number) => void
}

const InvitedReviewItem = ({
  reviewId,
  title,
  status,
  submitAt,
  className,
  participationId,
  handleReviewClick,
}: InvitedReviewItemProps) => {
  console.log(participationId + '초대받은 리뷰 participation ID')

  return (
    <div className={className} onClick={() => handleReviewClick(reviewId)}>
      <div className="flex gap-1.5">
        <span
          className={`${STATUS_STYLE[status]} badge rounded-full border-none text-xs font-medium text-white md:text-sm`}
        >
          {STATUS[status]}
        </span>
      </div>

      <p className="line-clamp-2 text-center text-base text-black dark:text-sub-red-100 md:text-xl">
        {title}
      </p>
      <p
        className={`text-right text-xs md:text-sm ${
          submitAt
            ? 'text-black dark:text-sub-red-100'
            : 'text-sub-red-200 dark:text-sub-yellow'
        }`}
      >
        {submitAt
          ? `응답일: ${dayjs(submitAt).format('YYYY-MM-DD')}`
          : '미응답'}
      </p>
    </div>
  )
}

export default InvitedReviewItem
