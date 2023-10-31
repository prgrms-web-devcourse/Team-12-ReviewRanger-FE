import { CreatedReview, InvitedReview, ReceivedReview } from '@/types'

interface ReviewListProps {
  reviews: InvitedReview[] | CreatedReview[] | ReceivedReview[]
  RenderComponent: (
    props: InvitedReview | CreatedReview | ReceivedReview,
  ) => JSX.Element
}

const ReviewList = ({ reviews, RenderComponent }: ReviewListProps) => {
  return (
    <>
      <ul className="grid-col-2 grid gap-4 sm:grid-cols-3 md:grid-cols-4">
        {reviews.map((review) => (
          <RenderComponent key={review.id} {...review} />
        ))}
      </ul>
    </>
  )
}

export default ReviewList
