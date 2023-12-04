import { useEffect, useState } from 'react'
import {
  useGetReviewForCreator,
  useGetResponseByResponserForCreator,
} from '@/apis/hooks'
import { CloseDropDownIcon } from '@/assets/icons'
import { getAnswer } from '@/pages/CreatedReviewManagePage/utils'
import { scrollToTop } from '@/utils'
import { SelectResponseUser, ProfileGroup, AnswerGroup } from '..'

interface ReviewDetailAccordionProps {
  reviewId: string
  responserName: string
  responserId: string
}

const ReceiverReviewDetail = ({
  responserName,
  reviewId,
  responserId,
}: ReviewDetailAccordionProps) => {
  //NOTE - 하나라도 응답 실패했을 떄 처리
  const { data: getReviewQuestion } = useGetReviewForCreator({
    id: Number(reviewId),
  })

  const { data: responseByReceiver } = useGetResponseByResponserForCreator({
    responserId,
    reviewId,
  }).data

  const getAllReceiverName = responseByReceiver?.map(
    (data) => data.receiver.name,
  )

  const [selectedName, setSelectedName] = useState(getAllReceiverName[0] ?? '')

  //NOTE - 현재 선택한 유저들에게 답변한 내용들
  const getUserSelectedAnswers = responseByReceiver?.filter(
    (response) => response?.receiver?.name === selectedName,
  )

  useEffect(() => {
    scrollToTop()
  }, [])

  return (
    <>
      <label className="overlay" htmlFor="drawer-bottom"></label>
      <div className="drawer drawer-bottom m-0 flex h-[90%] w-full flex-col items-center gap-10 overflow-auto bg-main-ivory pb-8 dark:bg-main-red-100 md:h-5/6">
        <div className="sticky top-0 z-50 flex h-8 w-full shrink-0 flex-col items-center justify-center bg-main-yellow dark:bg-main-red-200 sm:h-10">
          <label
            htmlFor="drawer-bottom"
            className="flex w-full cursor-pointer justify-center"
          >
            <CloseDropDownIcon className="h-4 w-4 cursor-pointer fill-black stroke-black text-black dark:fill-white dark:stroke-white dark:text-white md:h-5 md:w-5" />
          </label>
        </div>
        <div className="flex w-full max-w-[37.5rem] flex-col items-center gap-8 px-5">
          <div className="accordion-group m-0 mb-[10px] flex w-full flex-col gap-10">
            <ProfileGroup
              name={responserName}
              type="responser"
              responserSize={getAllReceiverName.length}
            />
            <SelectResponseUser
              allUser={getAllReceiverName}
              selectedName={selectedName}
              setSelectedName={setSelectedName}
            />
            {getReviewQuestion?.questions?.map((question) => (
              <AnswerGroup
                role="responser"
                questionType={question?.type}
                questionTitle={question?.title}
                key={question?.id}
                answers={getAnswer(
                  question?.type,
                  question?.id,
                  getUserSelectedAnswers,
                )}
                questionId={question?.id}
                userId={responserId}
                reviewId={reviewId}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default ReceiverReviewDetail
