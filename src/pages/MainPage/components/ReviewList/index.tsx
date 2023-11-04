import { CreatedReview, InvitedReview, ReceivedReview } from '@/types'

interface ReviewListProps {
  reviews: InvitedReview[] | CreatedReview[] | ReceivedReview[]
  RenderComponent: (
    props: (InvitedReview | CreatedReview | ReceivedReview) & {
      className: string
    },
  ) => JSX.Element
}

const ReviewList = ({ reviews, RenderComponent }: ReviewListProps) => {
  return (
    <>
      <ul className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 md:gap-10">
        {reviews.map((review) => (
          <RenderComponent
            key={review.id}
            className="flex h-36 cursor-pointer flex-col justify-between rounded-lg border border-black bg-main-ivory p-2.5 dark:border-white dark:bg-main-red-200 md:h-44"
            {...review}
          />
        ))}
      </ul>
    </>
  )
}

export default ReviewList
