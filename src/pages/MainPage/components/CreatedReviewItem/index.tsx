import dayjs from 'dayjs'
import { MenuIcon } from '@/assets/icons'
import { CreatedReview } from '@/types'
import { STATUS, STATUS_STYLE } from '../../constants'

interface CreatedReviewItemProps extends CreatedReview {
  className: string
  handleReviewClick: (id: number) => void
}

const CreatedReviewItem = ({
  reviewId,
  title,
  status,
  responserCount,
  createdAt,
  className,
  handleReviewClick,
}: CreatedReviewItemProps) => {
  console.log(`${reviewId}번 리뷰의 응답자 수: ${responserCount}명`)

  /** 최근 7일 이내 생성된 데이터인지 여부 */
  const newStatus =
    createdAt && dayjs(createdAt).isAfter(dayjs().subtract(7, 'day'))

  return (
    <div className={className} onClick={() => handleReviewClick(reviewId)}>
      <div className="flex items-center justify-between">
        <div className="flex gap-1.5">
          <span
            className={`${STATUS_STYLE[status]} rounded-full px-1.5 py-0.5 text-xs text-white md:text-sm`}
          >
            {STATUS[status]}
          </span>
          {newStatus && (
            <span className="rounded-full bg-sub-red-200 px-1.5 py-0.5 text-xs text-white md:text-sm">
              N
            </span>
          )}
        </div>

        <MenuIcon
          className="stroke-black dark:stroke-white"
          onClick={(e) => {
            e.stopPropagation()
            console.log('메뉴클릭')
          }}
        />
      </div>

      <p className="line-clamp-2 text-center text-base text-black dark:text-sub-red-100 md:text-xl">
        {title}
      </p>
      <p className="text-right text-xs text-black dark:text-sub-red-100 md:text-sm">
        생성일: {dayjs(createdAt).format('YYYY-MM-DD')}
      </p>
    </div>
  )
}

export default CreatedReviewItem
