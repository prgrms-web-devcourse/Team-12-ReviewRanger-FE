import dayjs from 'dayjs'
import { MenuIcon } from '@/assets/icons'
import { CreatedReview } from '@/types'
import { STATUS, STATUS_STYLE } from '../../constants'

interface CreatedReviewItemProps extends CreatedReview {
  className: string
  handleClickReview: ({ reviewId }: Pick<CreatedReview, 'reviewId'>) => void
}

const CreatedReviewItem = ({
  reviewId,
  title,
  status,
  createdAt,
  className,
  handleClickReview,
}: CreatedReviewItemProps) => {
  return (
    <div className={className} onClick={() => handleClickReview({ reviewId })}>
      <div className="flex items-center justify-between">
        <div className="flex gap-1.5">
          <span
            className={`${STATUS_STYLE[status]} badge rounded-full border-none text-xs font-medium text-white md:text-sm`}
          >
            {STATUS[status]}
          </span>
        </div>

        <MenuIcon
          className="stroke-black dark:stroke-white"
          onClick={(e) => {
            e.stopPropagation()
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
