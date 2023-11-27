import dayjs from 'dayjs'
import { InvitedReview } from '@/types'
import { STATUS, STATUS_STYLE } from '../../constants'

interface InvitedReviewItemProps extends InvitedReview {
  handleClickReview: ({
    reviewId,
    participationId,
    submitStatus,
    status,
  }: Pick<InvitedReview, 'reviewId' | 'participationId' | 'status'> & {
    submitStatus: boolean
  }) => void
}

const InvitedReviewItem = ({
  reviewId,
  participationId,
  title,
  status,
  submitAt,
  handleClickReview,
}: InvitedReviewItemProps) => {
  return (
    <div
      className="btn flex h-36 flex-col items-stretch justify-between rounded-md border border-gray-100 bg-main-yellow p-2.5 transition-transform dark:border-white dark:bg-main-red-200 md:h-40"
      onClick={() =>
        handleClickReview({
          reviewId,
          participationId,
          submitStatus: !!submitAt,
          status,
        })
      }
    >
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
