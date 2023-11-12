import { PlusIcon } from '@/assets/icons'
import { CreatedReview, InvitedReview, ReceivedReview } from '@/types'

interface ReviewListProps {
  reviews: InvitedReview[] | CreatedReview[] | ReceivedReview[]
  addButtonExistence: boolean
  RenderComponent: (
    props: (InvitedReview | CreatedReview | ReceivedReview) & {
      className: string
    },
  ) => JSX.Element
}

const ReviewList = ({
  reviews,
  addButtonExistence,
  RenderComponent,
}: ReviewListProps) => {
  return (
    <ul className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 md:gap-10">
      {addButtonExistence && (
        <button
          className="btn h-36 border border-black bg-main-ivory transition-transform dark:border-white dark:bg-main-red-200 md:h-44"
          onClick={() => {
            console.log('리뷰 추가 버튼 클릭')
          }}
        >
          <PlusIcon className="fill-black dark:fill-white" />
        </button>
      )}

      {reviews.map((review) => (
        <RenderComponent
          key={review.id}
          className="btn flex h-36 flex-col items-stretch justify-between rounded-sm border border-gray-100 bg-main-ivory p-2.5 transition-transform dark:border-white dark:bg-main-red-200 md:h-44"
          {...review}
        />
      ))}
    </ul>
  )
}

export default ReviewList
