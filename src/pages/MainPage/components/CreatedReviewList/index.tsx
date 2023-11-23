import { nanoid } from 'nanoid'
import { useInfiniteScroll } from '@/hooks'
import { useGetCreatedReviews } from '@/apis/hooks'
import { CreatedReview } from '@/types'
import CreatedReviewItem from './CreatedReviewItem'

interface CreatedReviewListProps {
  handleReviewClick: (id: number) => void
}

const CreatedReviewList = ({ handleReviewClick }: CreatedReviewListProps) => {
  const { data, hasNextPage, fetchNextPage } = useGetCreatedReviews()

  const reviews = data.pages.reduce<CreatedReview[]>(
    (acc, item) => acc.concat(item.content),
    [],
  )

  const { ref } = useInfiniteScroll<HTMLDivElement>({
    fetchData: () => {
      fetchNextPage()
    },
    hasNextPage,
  })

  return (
    <ul className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 md:gap-10">
      {reviews.map((review) => (
        <CreatedReviewItem
          handleReviewClick={handleReviewClick}
          key={nanoid()}
          className="btn flex h-36 flex-col items-stretch justify-between rounded-md border border-gray-100 bg-main-yellow p-2.5 transition-transform dark:border-white dark:bg-main-red-200 md:h-40"
          {...review}
        />
      ))}
      <div ref={ref}></div>
    </ul>
  )
}

export default CreatedReviewList
