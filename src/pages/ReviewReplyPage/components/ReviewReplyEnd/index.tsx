import { useState, useRef, useEffect } from 'react'
import { FormProvider, useForm, useFieldArray } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { Modal } from '@/components'
import {
  useGetReviewForParticipation,
  useUser,
  useGetResponseByResponserForParticipation,
} from '@/apis/hooks'
import { Question } from '@/types'
import { ReviewReplyEndType } from '../../types'
import ReviewReply from './ReviewReply'

const ReviewReplyEnd = () => {
  const navigate = useNavigate()
  const { pathname, state } = useLocation()
  const reviewId = parseInt(pathname.split('/').at(-1) as string)
  const [initModal, setInitModal] = useState(true)
  const labelRef = useRef<HTMLLabelElement>(null)
  const hasMounted = useRef(false)

  const { data: user } = useUser()
  const { data: prevReplyData } = useGetResponseByResponserForParticipation({
    reviewId,
    responserId: user?.id as number,
  })
  const { data: reviewData } = useGetReviewForParticipation({ id: reviewId })
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

  useEffect(() => {
    if (hasMounted.current) {
      if (labelRef.current) {
        labelRef.current.click()
      }
    } else {
      hasMounted.current = true
    }
  }, [])

  const handleClickModal = () => {
    setInitModal(false)
    if (labelRef.current) {
      labelRef.current.click()
    }
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

  const handleClickCancelModal = () => {
    navigate('/')
  }

  return (
    <div className="flex h-full w-full max-w-[37.5rem] flex-col p-5 text-black">
      <h1 className="text-lg dark:text-white md:text-2xl">{title}</h1>
      {!initModal && (
        <FormProvider {...methods}>
          <ReviewReply reviewData={reviewData} />
        </FormProvider>
      )}
      <label ref={labelRef} htmlFor="review-previous-reply-load" />
      <Modal
        modalId="review-previous-reply-load"
        content={`이미 종료된 설문입니다.\n답변하신 내용을 확인하시겠습니까?`}
        label="확인"
        handleClickLabel={handleClickModal}
        handleClose={handleClickCancelModal}
      />
    </div>
  )
}

export default ReviewReplyEnd
