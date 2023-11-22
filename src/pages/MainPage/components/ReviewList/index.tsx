import { nanoid } from 'nanoid'
import { useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()

  return (
    <ul className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 md:gap-10">
      {addButtonExistence && (
        <button
          className="btn h-36 rounded-md border border-gray-100 bg-main-yellow transition-transform dark:border-white dark:bg-main-red-200 md:h-40"
          onClick={() => {
            navigate('review-creation')
          }}
        >
          <PlusIcon className="h-6 w-6 fill-gray-300 dark:fill-white" />
        </button>
      )}

      {reviews.map((review) => (
        <RenderComponent
          key={nanoid()}
          className="btn flex h-36 flex-col items-stretch justify-between rounded-md border border-gray-100 bg-main-yellow p-2.5 transition-transform dark:border-white dark:bg-main-red-200 md:h-40"
          {...review}
        />
      ))}
    </ul>
  )
}

export default ReviewList
