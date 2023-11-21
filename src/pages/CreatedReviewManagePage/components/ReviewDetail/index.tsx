import { useEffect } from 'react'
import {
  useGetReviewQuestion,
  useGetResponseByReceiver,
  useSaveFinalResult,
} from '@/apis/hooks'
import { CloseDropDownIcon } from '@/assets/icons'
import { ProfileGroup, QuestionGroup } from '..'
import { getAnswer } from '../../utils'

interface ReviewDetailAccordionProps {
  receiverId: string
  receiverName: string
  reviewId: string
}

const ReviewDetail = ({
  receiverId,
  reviewId,
  receiverName,
}: ReviewDetailAccordionProps) => {
  //NOTE - 하나라도 응답 실패했을 떄 처리
  const { data: getReviewQuestion } = useGetReviewQuestion({
    id: reviewId,
  }).data

  const { data: responseByReceiver } = useGetResponseByReceiver({
    receiverId,
  }).data

  const saveFinalReviewResult = {
    userId: receiverId,
    userName: receiverName,
    reviewId,
    reviewTitle: getReviewQuestion?.title,
    reviewDescription: getReviewQuestion?.description,
    replies: getReviewQuestion?.questions?.map((question) => {
      return {
        questionId: question.id,
        questionTitle: question.title,
        questionType: question.type,
        answers: [
          question.type !== 'HEXASTAT'
            ? getAnswer(question?.type, question?.id, responseByReceiver)?.map(
                (value) => value.value,
              )
            : getAnswer(question?.type, question?.id, responseByReceiver)?.map(
                (value) => {
                  if ('name' in value)
                    return {
                      statName: value?.name,
                      statScore: value.value,
                    }
                },
              ),
        ],
      }
    }),
  }
  const { mutate: saveFinalResult } = useSaveFinalResult(saveFinalReviewResult)

  //NOTE - 전체 몇 명이 응답했는지 여부
  const responserCount = new Set(
    responseByReceiver?.map((data) => data?.responser?.id.toString()),
  )

  useEffect(() => {
    saveFinalResult()
  }, [saveFinalResult])

  return (
    <>
      <label htmlFor="drawer" className="overlay"></label>
      <div className="drawer drawer-bottom m-0 flex h-4/5 w-full  flex-col items-center gap-10 overflow-auto bg-main-ivory dark:bg-main-red-100 md:h-[32rem]">
        <div className="sticky top-0 z-50 flex h-[30px] w-full shrink-0 flex-col items-center justify-center bg-main-yellow dark:bg-main-red-200 sm:h-[40px]">
          <label htmlFor="drawer-bottom">
            <CloseDropDownIcon className="h-[1rem] w-[1rem] cursor-pointer fill-black stroke-black text-black dark:fill-white dark:stroke-white dark:text-white md:h-[1.25rem] md:w-[1.25rem]" />
          </label>
        </div>
        <div className="accordion-group m-0 mb-[10px] flex w-[21.875rem] max-w-[550px] flex-col gap-10 md:w-[34.375rem]">
          <ProfileGroup
            name={receiverName}
            responserSize={responserCount?.size}
          />
          {getReviewQuestion?.questions?.map((question) => (
            <QuestionGroup
              questionType={question?.type}
              questionTitle={question?.title}
              key={question?.id}
              answers={getAnswer(
                question?.type,
                question?.id,
                responseByReceiver,
              )}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default ReviewDetail
