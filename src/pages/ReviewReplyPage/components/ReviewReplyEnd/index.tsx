import { useState } from 'react'
import { FormProvider, useForm, useFieldArray } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import {
  useGetReviewForCreator,
  useUser,
  useGetResponseByResponserForReviewReplyPage,
} from '@/apis/hooks'
import { Question } from '@/apis/hooks/useGetReviewForCreator'
import { ReviewReplyEndType } from '../../types'
import ReviewReply from './ReviewReply'

const ReviewReplyEnd = () => {
  const { pathname, state } = useLocation()
  const reviewId = parseInt(pathname.split('/').at(-1) as string)
  const [initModal, setInitModal] = useState(true)

  const { data: user } = useUser()
  const { data: prevReplyData } = useGetResponseByResponserForReviewReplyPage({
    reviewId,
    responserId: user?.id as number,
  })
  const { data: reviewData } = useGetReviewForCreator({ id: reviewId })
  const { title, questions } = reviewData

  const methods = useForm<ReviewReplyEndType>({
    defaultValues: {
      id: state.participationId,
    },
  })

  const { append: appendReceiver } = useFieldArray({
    control: methods.control,
    name: 'receiverList',
  })

  const { append: appendReplyTarget } = useFieldArray({
    control: methods.control,
    name: 'replyTargets',
  })

  const handleClickModal = () => {
    setInitModal(false)
    prevReplyData.forEach((receiverData) => {
      const { replies, receiver, responser } = receiverData
      const replyTarget = {
        receiverId: receiver.id,
        responserId: responser.id,
        replies: replies.map(
          ({
            questionId,
            answerChoice,
            answerHexa,
            answerRating,
            answerText,
            id,
          }) => {
            return {
              answerChoice: answerChoice?.optionId ?? null,
              answerHexa,
              answerRating,
              answerText,
              id,
              isRequired: (
                questions.find(({ id }) => id === questionId) as Question
              ).isRequired,
              questionId,
            }
          },
        ),
      }
      appendReplyTarget(replyTarget)
      appendReceiver({ receiverId: receiver.id, name: receiver.name })
    })
  }

  return (
    <div className="flex h-full w-full max-w-[37.5rem] flex-col p-5 text-black">
      <h1 className="text-lg dark:text-white md:text-2xl">{title}</h1>
      {initModal ? (
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex h-56 w-96 flex-col items-center justify-between rounded-md bg-gray-400 p-8">
            <p className="whitespace-pre-wrap">{`이미 종료된 설문입니다.\n답변하신 내용을 확인하시겠습니까?`}</p>
            <button
              onClick={handleClickModal}
              className="rounded-md bg-green-300 px-4 py-2"
            >
              확인
            </button>
          </div>
        </div>
      ) : (
        <FormProvider {...methods}>
          <ReviewReply reviewData={reviewData} />
        </FormProvider>
      )}
    </div>
  )
}

export default ReviewReplyEnd
