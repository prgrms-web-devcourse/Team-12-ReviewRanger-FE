import { useState } from 'react'
import { Header } from '@/components'
import { useGetAllReviews } from '@/apis/hooks'
import { rangerIdle } from '@/assets/images'
import {
  CreatedReviewItem,
  InvitedReviewItem,
  PageIntro,
  ReceivedReviewItem,
  ReviewList,
  Tabs,
} from './components'
import { INTRO_CONTENT, INTRO_STYLE } from './constants'

const MainPage = () => {
  const [
    { data: invitedReviews },
    { data: createdReviews },
    { data: receivedReviews },
  ] = useGetAllReviews()

  const [activeTab, setActiveTab] = useState<
    'invited' | 'created' | 'received'
  >('invited')

  const TAB_REVIEWS = {
    invited: invitedReviews,
    created: createdReviews,
    received: receivedReviews,
  }

  const handleInvitedReviewClick = (id: number) => {
    console.log('응답 리뷰 클릭', id)
  }

  const handleCreatedReviewClick = (id: number) => {
    console.log('생성 리뷰 클릭', id)
  }

  const handleReceivedReviewClick = (id: number) => {
    console.log('결과 리뷰 클릭', id)
  }

  const { desc1, desc2, title } = INTRO_CONTENT[activeTab]

  return (
    <>
      <div className="sticky top-0 z-10">
        <Header />
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <div className="p-5 md:p-10">
        <PageIntro
          imageSrc={rangerIdle}
          className="mb-5 rounded-lg bg-main-ivory py-4 pr-4 dark:bg-main-red-200 md:mb-10"
        >
          <div className="text-sm text-black dark:text-sub-red-100 md:text-xl">
            <span>{desc1}</span>
            <span className={INTRO_STYLE[activeTab]}>{title}</span>
            <span>{desc2}</span>
          </div>
        </PageIntro>

        <ReviewList
          reviews={TAB_REVIEWS[activeTab]}
          addButtonExistence={activeTab === 'created'}
          RenderComponent={(review) => {
            if ('isCompleted' in review) {
              return (
                <InvitedReviewItem
                  {...review}
                  handleReviewClick={handleInvitedReviewClick}
                />
              )
            }

            if ('responserCount' in review) {
              return (
                <CreatedReviewItem
                  {...review}
                  handleReviewClick={handleCreatedReviewClick}
                />
              )
            }

            return (
              <ReceivedReviewItem
                {...review}
                handleReviewClick={handleReceivedReviewClick}
              />
            )
          }}
        />
      </div>
    </>
  )
}

export default MainPage
