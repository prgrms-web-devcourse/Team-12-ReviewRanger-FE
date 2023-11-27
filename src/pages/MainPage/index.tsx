import { Suspense, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks'
import { Header, TokenErrorBoundary } from '@/components'
import { useDeleteReview } from '@/apis/hooks'
import { rangerIdle } from '@/assets/images'
import { CreatedReview, InvitedReview, ReceivedReview } from '@/types'
import {
  CreatedReviewList,
  InvitedReviewList,
  ListSkeleton,
  PageIntro,
  ReceivedReviewList,
  Tabs,
} from './components'
import { INTRO_CONTENT, INTRO_STYLE } from './constants'

const MainPage = () => {
  const { mutate: deleteReview } = useDeleteReview()

  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState<
    'invited' | 'created' | 'received'
  >('invited')

  const { addToast } = useToast()

  const handleInvitedReviewClick = ({
    reviewId,
    participationId,
    submitStatus,
    status,
  }: Pick<InvitedReview, 'reviewId' | 'participationId' | 'status'> & {
    submitStatus: boolean
  }) => {
    navigate(`review-response/${reviewId}`, {
      state: {
        participationId,
        submitStatus,
        status,
      },
    })
  }

  const handleCreatedReviewClick = ({
    reviewId,
  }: Pick<CreatedReview, 'reviewId'>) => {
    navigate(`review-management/${reviewId}`)
  }

  const handleReceivedReviewClick = ({ id }: Pick<ReceivedReview, 'id'>) => {
    navigate(`review-result/${id}`)
  }

  const handleDeleteReview = ({
    reviewId,
    status,
  }: Pick<CreatedReview, 'reviewId' | 'status'>) => {
    if (status !== 'PROCEEDING') {
      addToast({
        message: '진행 중인 리뷰만 삭제할 수 있습니다.',
        type: 'error',
      })

      return
    }

    deleteReview(
      { reviewId },
      {
        onSuccess: () => {
          addToast({ message: '리뷰가 삭제되었습니다.', type: 'success' })
        },
      },
    )
  }

  const { desc1, desc2, title } = INTRO_CONTENT[activeTab]

  return (
    <>
      <div className="sticky top-0 z-10">
        <Header />
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <div className="mx-auto max-w-[55rem] p-5 md:p-10">
        <PageIntro
          imageSrc={rangerIdle}
          className="mb-5 rounded-md bg-main-yellow py-4 pr-4 dark:bg-main-red-200 md:mb-10"
        >
          <div className="text-sm text-black dark:text-sub-red-100 md:text-xl">
            <span>{desc1}</span>
            <span className={INTRO_STYLE[activeTab]}>{title}</span>
            <span>{desc2}</span>
          </div>
        </PageIntro>

        <TokenErrorBoundary>
          <Suspense
            fallback={
              <ul className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 md:gap-10">
                <ListSkeleton />
              </ul>
            }
          >
            {(() => {
              switch (activeTab) {
                case 'invited':
                  return (
                    <InvitedReviewList
                      handleClickReview={handleInvitedReviewClick}
                    />
                  )
                case 'created':
                  return (
                    <CreatedReviewList
                      handleClickReview={handleCreatedReviewClick}
                      handleAddReview={() => navigate('review-creation')}
                      handleDeleteReview={handleDeleteReview}
                    />
                  )
                case 'received':
                  return (
                    <ReceivedReviewList
                      handleClickReview={handleReceivedReviewClick}
                    />
                  )
                default:
                  return null
              }
            })()}
          </Suspense>
        </TokenErrorBoundary>
      </div>
    </>
  )
}

export default MainPage
