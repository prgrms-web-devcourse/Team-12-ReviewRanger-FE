import dayjs from 'dayjs'
import { InvitedReview } from '@/types'
import { STATUS_STYLE } from '../../constants'

interface InvitedReviewItemProps extends InvitedReview {
  className: string
  handleReviewClick: (id: number) => void
}

const InvitedReviewItem = ({
  participationId,
  title,
  status,
  createdAt,
  submitAt,
  className,
  handleReviewClick,
}: InvitedReviewItemProps) => {
  /** 최근 7일 이내 데이터인지 여부 */
  // TODO: 이건 설문 응답일이 아니라 생성일 기준으로 해야함
  const newStatus =
    createdAt && dayjs(createdAt).isAfter(dayjs().subtract(7, 'day'))

  return (
    <div
      className={className}
      onClick={() => handleReviewClick(participationId)}
    >
      <div className="flex gap-1.5">
        <span
          className={`${STATUS_STYLE[status]} rounded-full px-1.5 py-0.5 text-xs text-white md:text-sm`}
        >
          {status}
        </span>
        {newStatus && (
          <span className="rounded-full bg-sub-red-200 px-1.5 py-0.5 text-xs text-white md:text-sm">
            N
          </span>
        )}
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
