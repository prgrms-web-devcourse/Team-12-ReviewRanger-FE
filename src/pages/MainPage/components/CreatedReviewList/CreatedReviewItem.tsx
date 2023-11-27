import dayjs from 'dayjs'
import { Dropdown, Modal } from '@/components'
import { MenuIcon } from '@/assets/icons'
import { CreatedReview } from '@/types'
import { STATUS, STATUS_STYLE } from '../../constants'

interface CreatedReviewItemProps extends CreatedReview {
  handleClickReview: ({ reviewId }: Pick<CreatedReview, 'reviewId'>) => void
  handleDeleteReview: ({
    reviewId,
    status,
  }: Pick<CreatedReview, 'reviewId' | 'status'>) => void
}

const CreatedReviewItem = ({
  reviewId,
  title,
  status,
  createdAt,
  handleClickReview,
  handleDeleteReview,
}: CreatedReviewItemProps) => {
  return (
    <>
      <div
        className="btn flex h-36 flex-col items-stretch justify-between rounded-md border border-gray-100 bg-main-yellow p-2.5 transition-transform dark:border-white dark:bg-main-red-200 md:h-40"
        onClick={() => handleClickReview({ reviewId })}
      >
        <div className="flex items-center justify-between">
          <div className="flex gap-1.5">
            <span
              className={`${STATUS_STYLE[status]} badge rounded-full border-none text-xs font-medium text-white md:text-sm`}
            >
              {STATUS[status]}
            </span>
          </div>

          <Dropdown>
            <Dropdown.Toggle className="cursor-pointer">
              <MenuIcon className="rounded-full stroke-black hover:scale-110 hover:bg-main-hover-yellow dark:stroke-white" />
            </Dropdown.Toggle>
            <Dropdown.Menu className="w-28 rounded-md border-gray-100">
              <label htmlFor={`delete${reviewId}`} className="cursor-pointer">
                <Dropdown.Item>리뷰 삭제</Dropdown.Item>
              </label>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <p className="line-clamp-2 text-center text-base text-black dark:text-sub-red-100 md:text-xl">
          {title}
        </p>
        <p className="text-right text-xs text-black dark:text-sub-red-100 md:text-sm">
          생성일: {dayjs(createdAt).format('YYYY-MM-DD')}
        </p>
      </div>

      <Modal
        modalId={`delete${reviewId}`}
        content="정말 삭제하시겠습니까?"
        label="삭제"
        handleClickLabel={() => handleDeleteReview({ reviewId, status })}
      />
    </>
  )
}

export default CreatedReviewItem
