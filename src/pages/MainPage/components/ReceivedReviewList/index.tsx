import { nanoid } from 'nanoid'
import { useEffect } from 'react'
import { useInfiniteScroll } from '@/hooks'
import { useGetReceivedReviews } from '@/apis/hooks'
import { scrollToTop } from '@/utils'
import { ReceivedReview } from '@/types'
import ReceivedReviewItem from './ReceivedReviewItem'

interface ReceivedReviewListProps {
  handleClickReview: (id: number) => void
}

const ReceivedReviewList = ({ handleClickReview }: ReceivedReviewListProps) => {
  const { data, hasNextPage, fetchNextPage } = useGetReceivedReviews()

  useEffect(() => {
    scrollToTop()
  }, [])

  const reviews = data.pages.reduce<ReceivedReview[]>(
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
        <ReceivedReviewItem
          handleClickReview={handleClickReview}
          key={nanoid()}
          className="btn flex h-36 flex-col items-stretch justify-between rounded-md border border-gray-100 bg-main-yellow p-2.5 transition-transform dark:border-white dark:bg-main-red-200 md:h-40"
          {...review}
        />
      ))}
      <div ref={ref}></div>
    </ul>
  )
}

export default ReceivedReviewList
