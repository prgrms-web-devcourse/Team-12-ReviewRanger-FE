import { nanoid } from 'nanoid'
import { useEffect } from 'react'
import { useInfiniteScroll } from '@/hooks'
import { useGetReceivedReviews } from '@/apis/hooks'
import { scrollToTop } from '@/utils'
import { ReceivedReview } from '@/types'
import EmptyReview from '../EmptyReview'
import ListSkeleton from '../ListSkeleton'
import ReceivedReviewItem from './ReceivedReviewItem'

interface ReceivedReviewListProps {
  handleClickReview: ({ id }: Pick<ReceivedReview, 'id'>) => void
}

const ReceivedReviewList = ({ handleClickReview }: ReceivedReviewListProps) => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetReceivedReviews()

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

  if (reviews.length) {
    return (
      <>
        <ul className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 md:gap-10">
          {reviews.map((review) => (
            <ReceivedReviewItem
              handleClickReview={handleClickReview}
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

  return <EmptyReview message="받은 리뷰 결과가 아직 없습니다. 😥" />
}

export default ReceivedReviewList
