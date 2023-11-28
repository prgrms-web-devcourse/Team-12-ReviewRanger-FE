import { useEffect } from 'react'
import { useToast } from '@/hooks'
import {
  useGetReviewForCreator,
  useGetResponseByReceiver,
  useSaveFinalResult,
  useUpdateFinalReviewAnswer,
} from '@/apis/hooks'
import { CloseDropDownIcon } from '@/assets/icons'
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

  const { addToast } = useToast()
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
        const result = answer?.map((value) => value.value)?.join('')

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

  const { mutate: updateFinalReviewAnswer } = useUpdateFinalReviewAnswer()
  useEffect(() => {
    if (!ResponserList?.includes(Number(receiverId))) {
      saveFinalResult()
    }
  }, [receiverId])

  //NOTE - 전체 몇 명이 응답했는지 여부
  const responserCount = new Set(
    responseByReceiver?.map((data) => data?.responser?.id.toString()),
  )

  const handleUpdateFinalReviewAnswer = (
    updatedAnswer: string,
    questionId: string,
  ) => {
    updateFinalReviewAnswer(
      {
        userId: receiverId,
        answer: updatedAnswer,
        reviewId,
        questionId,
      },
      {
        onSuccess: ({ success }) => {
          if (success) {
            addToast({ message: '성공적으로 저장되었습니다!', type: 'success' })
          }
        },
      },
    )
  }

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
            type="receiver"
            name={receiverName}
            responserSize={responserCount?.size}
          />
          {getReviewQuestion?.questions?.map((question) => (
            <AnswerGroup
              questionType={question?.type}
              questionTitle={question?.title}
              key={question?.id}
              answers={getAnswer(
                question?.type,
                question?.id,
                responseByReceiver,
              )}
              onClickCleanButton={(newAnswer: string) => {
                handleUpdateFinalReviewAnswer(newAnswer, question.id + '')
              }}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default ReceiverReviewDetail
