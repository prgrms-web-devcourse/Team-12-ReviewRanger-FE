import { useFormContext } from 'react-hook-form'
import { Modal } from '@/components'
import { ReviewDetailedData } from '@/types'
import { ReceiverItem, QuestionItem } from '..'
import {
  useHandleReceiver,
  useHandleQuestion,
  useClickNextButton,
  useReplyComplete,
} from '../../hooks'
import { ReviewReplyEditType } from '../../types'
import Questions from '../Questions'

interface ReviewReplyProps {
  reviewData: ReviewDetailedData
  handleSubmit: () => void
}

const ReviewReply = ({ reviewData, handleSubmit }: ReviewReplyProps) => {
  const { getValues } = useFormContext<ReviewReplyEditType>()
  const receivers = getValues('receiverList')
  const questions = reviewData.questions

  const {
    selectedReceiver,
    setSelectedReceiver,
    selectedReceiverIndex,
    setSelectedReceiverIndex,
    handleClickReceiver,
  } = useHandleReceiver({ receivers })

  const {
    selectedQuestionIndex,
    setSelectedQuestionIndex,
    handleClickQuestion,
  } = useHandleQuestion({ questions, selectedReceiverIndex })

  const { handleClickNextButton } = useClickNextButton({
    questions,
    receivers,
    selectedQuestionIndex,
    setSelectedQuestionIndex,
    selectedReceiverIndex,
    setSelectedReceiver,
    setSelectedReceiverIndex,
  })

  const { individualReplyCompletes, allReplyComplete, checkReplyComplete } =
    useReplyComplete({ receivers, selectedReceiverIndex, editPage: true })

  const questionArray = questions.map((question, index) => (
    <Questions
      question={question}
      index={index}
      receiverIndex={selectedReceiverIndex}
      checkReplyComplete={checkReplyComplete}
    />
  ))

  return (
    <div className="flex h-full flex-col justify-between gap-2">
      <div className="flex flex-col gap-5 pt-2.5">
        <div className="mt-2 flex items-center gap-2 text-base md:text-xl">
          <span className="text-gray-300 dark:text-gray-400 ">
            응답 대상자:
          </span>
          <span className="text-sub-orange dark:text-sub-yellow">
            {selectedReceiver.name}
          </span>
        </div>
        <div className="flex flex-col gap-5">
          <ul className="flex items-center gap-2.5 overflow-x-auto">
            {receivers.map((receiver, index) => (
              <ReceiverItem
                key={receiver.receiverId}
                receiver={receiver}
                index={index}
                selectedReceiver={selectedReceiver}
                individualReplyCompletes={individualReplyCompletes}
                handleClickReceiver={handleClickReceiver}
                checkReplyComplete={checkReplyComplete}
              />
            ))}
          </ul>
          <ul className="flex items-center gap-5 overflow-x-auto">
            {questions.map((question, index) => (
              <QuestionItem
                index={index}
                key={question.id}
                selectedReceiverIndex={selectedReceiverIndex}
                selectedQuestionIndex={selectedQuestionIndex}
                question={question}
                handleClickQuestion={handleClickQuestion}
                checkReplyComplete={checkReplyComplete}
              />
            ))}
          </ul>
          <hr />
        </div>
        {questionArray[selectedQuestionIndex]}
      </div>
      <div className="flex justify-center md:justify-end">
        {allReplyComplete ? (
          <button className="mb-5 h-10 w-full rounded-md bg-active-orange text-lg text-white hover:border hover:border-black disabled:bg-opacity-50 dark:text-black md:w-52 md:text-xl">
            <label
              htmlFor="review-reply"
              className="flex h-full w-full items-center justify-center"
            >
              답변 수정하기
            </label>
          </button>
        ) : (
          <button
            onClick={() => {
              handleClickNextButton()
              checkReplyComplete()
            }}
            className="mb-5 h-10 w-full rounded-md bg-active-orange text-lg text-white hover:border hover:border-black disabled:bg-opacity-50 dark:text-black md:w-52 md:text-xl"
          >
            다음
          </button>
        )}
      </div>
      <Modal
        modalId="review-reply"
        content="답변 수정을 완료하시겠습니까?"
        label="수정"
        handleClickLabel={handleSubmit}
      />
    </div>
  )
}

export default ReviewReply
