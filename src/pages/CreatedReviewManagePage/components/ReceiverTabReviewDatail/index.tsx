import { useEffect, useRef } from 'react'
import {
  useGetReviewForCreator,
  useGetResponseByReceiver,
  useSaveFinalResult,
} from '@/apis/hooks'
import { CloseDropDownIcon } from '@/assets/icons'
import { scrollToTop } from '@/utils'
import { ProfileGroup, AnswerGroup } from '..'
import { getAnswer } from '../../utils'

interface ReviewDetailAccordionProps {
  receiverId: string
  receiverName: string
  reviewId: string
  ResponserList?: number[]
}

const ReceiverReviewDetail = ({
  receiverId,
  reviewId,
  receiverName,
  ResponserList,
}: ReviewDetailAccordionProps) => {
  //NOTE - 하나라도 응답 실패했을 떄 처리

  const hasAnswered = useRef<number[]>([])
  const { data: getReviewQuestion } = useGetReviewForCreator({
    id: Number(reviewId),
  })

  const { data: responseByReceiver } = useGetResponseByReceiver({
    receiverId,
    reviewId,
  }).data

  const formatAnswers = (
    questionType: Parameters<typeof getAnswer>[0],
    questionId: Parameters<typeof getAnswer>[1],
  ) => {
    const answer = getAnswer(questionType, questionId, responseByReceiver)
    switch (questionType) {
      case 'HEXASTAT':
        return answer?.map((value) => {
          if ('name' in value)
            return {
              statName: value?.name,
              statScore: value.value,
            }
        })

      case 'SUBJECTIVE': {
        const result = answer?.map((value) => value.value)?.join('\n')

        return result === '' ? [] : new Array(result)
      }

      default:
        return answer?.map((value) => value.value)
    }
  }

  const saveFinalReviewResult = {
    userId: receiverId,
    userName: receiverName,
    reviewId,
    reviewTitle: getReviewQuestion?.title,
    reviewDescription: getReviewQuestion?.description,
    replies: getReviewQuestion?.questions
      ?.map((question) => {
        const combinedAnswer = formatAnswers(question.type, Number(question.id))

        if (combinedAnswer.length > 0) {
          return {
            questionId: question.id,
            questionTitle: question.title,
            questionType: question.type,
            answers: combinedAnswer,
          }
        }
      })
      ?.filter((result) => typeof result !== 'undefined'),
  }

  const { mutate: saveFinalResult } = useSaveFinalResult(saveFinalReviewResult)

  useEffect(() => {
    if (
      getReviewQuestion.status === 'END' ||
      getReviewQuestion.status === 'PROCEEDING'
    ) {
      return
    }
    if (
      !ResponserList?.includes(Number(receiverId)) &&
      !hasAnswered.current.includes(Number(receiverId))
    ) {
      saveFinalResult()
      hasAnswered.current = [...hasAnswered.current, Number(receiverId)]
    }
  }, [receiverId])

  //NOTE - 전체 몇 명이 응답했는지 여부
  const responserCount = new Set(
    responseByReceiver?.map((data) => data?.responser?.id.toString()),
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
          <div className="self-start">
            <ProfileGroup
              type="receiver"
              name={receiverName}
              responserSize={responserCount?.size}
            />
          </div>
          <div className="accordion-group m-0 mb-[10px] flex w-full flex-col gap-10">
            {getReviewQuestion?.questions?.map((question) => (
              <AnswerGroup
                questionType={question?.type}
                questionTitle={question?.title}
                questionId={question?.id}
                key={question?.id}
                answers={getAnswer(
                  question?.type,
                  question?.id,
                  responseByReceiver,
                )}
                reviewId={reviewId}
                userId={receiverId}
                reviewStatus={getReviewQuestion?.status}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default ReceiverReviewDetail
