import { nanoid } from 'nanoid'
import { useEffect } from 'react'
import { useInfiniteScroll } from '@/hooks'
import { useGetCreatedReviews } from '@/apis/hooks'
import { PlusIcon } from '@/assets/icons'
import { scrollToTop } from '@/utils'
import { CreatedReview } from '@/types'
import { ListSkeleton } from '..'
import CreatedReviewItem from './CreatedReviewItem'

interface CreatedReviewListProps {
  handleClickReview: ({ reviewId }: Pick<CreatedReview, 'reviewId'>) => void
  handleAddReview: () => void
  handleDeleteReview: ({
    reviewId,
    status,
  }: Pick<CreatedReview, 'reviewId' | 'status'>) => void
}

const CreatedReviewList = ({
  handleClickReview,
  handleAddReview,
  handleDeleteReview,
}: CreatedReviewListProps) => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetCreatedReviews()

  useEffect(() => {
    scrollToTop()
  }, [])

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
    <>
      <ul className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 md:gap-10">
        <button
          className="btn h-36 rounded-md border border-gray-100 bg-main-yellow transition-transform dark:border-white dark:bg-main-red-200 md:h-40"
          onClick={handleAddReview}
        >
          <PlusIcon className="h-6 w-6 fill-gray-200 dark:fill-white" />
        </button>

        {reviews.map((review) => (
          <CreatedReviewItem
            handleClickReview={handleClickReview}
            handleDeleteReview={handleDeleteReview}
            key={nanoid()}
            {...review}
          />
        ))}
        {isFetchingNextPage && <ListSkeleton />}
        <div ref={ref}></div>
      </ul>
    </>
  )
}

export default CreatedReviewList
