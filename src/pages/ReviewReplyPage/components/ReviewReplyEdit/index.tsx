import { useState, useRef, useEffect } from 'react'
import { FormProvider, useForm, useFieldArray } from 'react-hook-form'
import { useNavigate, useLocation } from 'react-router-dom'
import { useToast } from '@/hooks'
import { Header, Modal } from '@/components'
import {
  useEditResponse,
  useGetReviewForParticipation,
  useUser,
  useGetResponseByResponserForParticipation,
} from '@/apis/hooks'
import { Question } from '@/types'
import { ReviewReplyEditType } from '../../types'
import ReviewReply from './ReviewReply'

const ReviewReplyEdit = () => {
  const navigate = useNavigate()
  const { pathname, state } = useLocation()
  const { addToast } = useToast()
  const reviewId = parseInt(pathname.split('/').at(-1) as string)
  const [initModal, setInitModal] = useState(true)
  const labelRef = useRef<HTMLLabelElement>(null)
  const hasMounted = useRef(false)

  const { data: user } = useUser()
  const { data: reviewData } = useGetReviewForParticipation({ id: reviewId })
  const { data: prevReplyData } = useGetResponseByResponserForParticipation({
    reviewId,
    responserId: user?.id as number,
  })
  const { mutate: editResponse } = useEditResponse()
  const { title, questions } = reviewData

  const methods = useForm<ReviewReplyEditType>({
    defaultValues: {
      id: state.participationId,
      replyComplete: prevReplyData.map(({ receiver }) => {
        return {
          receiverId: receiver.id,
          complete: Array(questions.length).fill(true),
        }
      }),
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
      return
    }
    if (labelRef.current) {
      labelRef.current.click()
      hasMounted.current = true
    }
  }, [])

  const handleClickModal = () => {
    setInitModal(false)
    if (labelRef.current) {
      labelRef.current.click()
    }
    prevReplyData.forEach((receiverData) => {
      const { replies, receiver, responser, id } = receiverData
      const replyTarget = {
        id,
        receiverId: receiver.id,
        responserId: responser.id,
        replies: replies.map(
          ({
            questionId,
            answerChoice,
            answerHexa,
            answerRating,
            answerText,
          }) => {
            return {
              answerChoice: answerChoice?.optionId ?? null,
              answerHexa,
              answerRating,
              answerText,
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

  const handleSubmitReply = () => {
    const requestData = {
      id: state.participationId,
      replyTargets: methods.getValues('replyTargets'),
    }

    editResponse(requestData, {
      onSuccess: () => {
        addToast({
          message: '리뷰 답변 수정이 완료되었습니다.',
          type: 'success',
        })
        navigate('/', { replace: true })
      },
    })
  }

  return (
    <>
      <Header />
      <div className="flex h-full w-full max-w-[37.5rem] flex-col p-5 text-black">
        <h1 className="text-lg dark:text-white md:text-2xl">{title}</h1>
        {!initModal && (
          <FormProvider {...methods}>
            <ReviewReply
              reviewData={reviewData}
              handleSubmit={handleSubmitReply}
            />
          </FormProvider>
        )}
        <label ref={labelRef} htmlFor="review-previous-reply-load" />
        <Modal
          modalId="review-previous-reply-load"
          content={`이전에 작성한 답변이 남아 있습니다.\n계속 진행하시겠습니까?`}
          label="확인"
          handleClickLabel={handleClickModal}
          handleClose={handleClickCancelModal}
        />
      </div>
    </>
  )
}

export default ReviewReplyEdit
