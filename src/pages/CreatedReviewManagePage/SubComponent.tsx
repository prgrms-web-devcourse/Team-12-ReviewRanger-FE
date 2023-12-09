import { nanoid } from 'nanoid'
import { useRef, Suspense, ComponentProps } from 'react'
import { Modal, Header } from '@/components'
import {
  AllResponseReviewByResponser,
  AllResponseReviewByReceiver,
  Tabs,
} from './components'

const ReviewManageHeader = ({
  activeTab,
  setActiveTab,
}: ComponentProps<typeof Tabs>) => {
  return (
    <div className="sticky top-0">
      <Header />
      <div className="flex  justify-center bg-main-red-300 text-center text-lg text-white">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  )
}

const ReviewManageTab = ({
  role,
  reviewId,
  responserList,
}: {
  role: 'responser' | 'receiver'
  reviewId: string
  responserList: number[]
}) => {
  return (
    <>
      {role === 'responser' ? (
        <Suspense
          fallback={
            <div className="flex items-center justify-center">
              <div className="spinner-simple"></div>
            </div>
          }
        >
          <AllResponseReviewByResponser reviewId={reviewId} />
        </Suspense>
      ) : (
        <Suspense
          fallback={
            <div className="flex items-center justify-center">
              <div className="spinner-simple"></div>
            </div>
          }
        >
          <AllResponseReviewByReceiver
            reviewId={reviewId}
            ResponserList={responserList}
          />
        </Suspense>
      )}
    </>
  )
}

const ActionButton = ({
  status,
  isDisabled,
  onClickModal,
}: {
  status: 'DEADLINE' | 'END' | 'PROCEEDING'
  isDisabled?: boolean
  onClickModal: () => void
}) => {
  const actionButtonRef = useRef<HTMLLabelElement | null>(null)
  const activeButtonModalId = `${status}${nanoid()}`
  const handleModalClick = () => {
    onClickModal()
    actionButtonRef?.current?.click()
  }
  const actionButtonLabel = new Map([
    ['DEADLINE', '설문 마감'],
    ['END', '전송'],
    ['PROCEEDING', '설문 종료'],
  ])
  const className =
    status !== 'END'
      ? `btn fixed bottom-10 cursor-pointer self-end rounded-md bg-active-orange text-white dark:text-black`
      : `btn fixed bottom-10 h-[2.5rem] w-[6.25rem] cursor-pointer self-end rounded-md bg-gray-100 font-bold leading-[1.3125rem] text-white`

  return (
    <button className={className} disabled={isDisabled}>
      <label
        htmlFor={activeButtonModalId}
        className="cursor-pointer"
        ref={actionButtonRef}
      >
        {actionButtonLabel.get(status)}
      </label>
      <ActionButtonModal
        handleClickLabel={handleModalClick}
        modalId={activeButtonModalId}
        status={status}
      />
    </button>
  )
}

const ActionButtonModal = ({
  handleClickLabel,
  modalId,
  status,
}: {
  handleClickLabel: () => void
  modalId: string
  status: 'DEADLINE' | 'END' | 'PROCEEDING'
}) => {
  const actionButtonModalLabel = new Map([
    ['PROCEEDING', '마감하기'],
    ['DEADLINE', '전송하기'],
  ])

  const actionButtonModalContent = new Map([
    ['PROCEEDING', '마감하시겠습니까?'],
    ['DEADLINE', '전송하시겠습니까?'],
  ])

  return (
    <Modal
      handleClickLabel={handleClickLabel}
      modalId={modalId}
      label={actionButtonModalLabel.get(status) ?? ''}
      content={actionButtonModalContent.get(status) ?? ''}
    />
  )
}

export const CreatedReviewMangePage = {
  ActionButton,
  ReviewManageTab,
  ReviewManageHeader,
}
