import { Suspense, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '@/components'
import { rangerIdle } from '@/assets/images'
import {
  CreatedReviewList,
  InvitedReviewList,
  PageIntro,
  ReceivedReviewList,
  Tabs,
} from './components'
import { INTRO_CONTENT, INTRO_STYLE } from './constants'

const MainPage = () => {
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState<
    'invited' | 'created' | 'received'
  >('invited')

  const handleInvitedReviewClick = (id: number, participationId: number) => {
    navigate(`review-response/${id}`, {
      state: {
        participationId,
      },
    })
  }

  const handleCreatedReviewClick = (id: number) => {
    navigate(`review-management/${id}`)
  }

  const handleReceivedReviewClick = (id: number) => {
    navigate(`review-result/${id}`)
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

        <Suspense>
          {(() => {
            switch (activeTab) {
              case 'invited':
                return (
                  <InvitedReviewList
                    handleReviewClick={handleInvitedReviewClick}
                  />
                )
              case 'created':
                return (
                  <CreatedReviewList
                    handleReviewClick={handleCreatedReviewClick}
                  />
                )
              case 'received':
                return (
                  <ReceivedReviewList
                    handleReviewClick={handleReceivedReviewClick}
                  />
                )
              default:
                return null
            }
          })()}
        </Suspense>
      </div>
    </>
  )
}

export default MainPage
