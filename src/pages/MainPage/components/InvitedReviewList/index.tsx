import { nanoid } from 'nanoid'
import { useEffect } from 'react'
import { useInfiniteScroll } from '@/hooks'
import { useGetInvitedReviews } from '@/apis/hooks'
import { scrollToTop } from '@/utils'
import { InvitedReview } from '@/types'
import InvitedReviewItem from './InvitedReviewItem'

interface InvitedReviewListProps {
  handleClickReview: ({
    id,
    participationId,
    submitStatus,
  }: {
    id: number
    participationId: number
    submitStatus: boolean
  }) => void
}

const InvitedReviewList = ({ handleClickReview }: InvitedReviewListProps) => {
  const { data, hasNextPage, fetchNextPage } = useGetInvitedReviews()

  useEffect(() => {
    scrollToTop()
  }, [])

  const reviews = data.pages.reduce<InvitedReview[]>(
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
        <InvitedReviewItem
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

export default InvitedReviewList
