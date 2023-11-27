import { useFormContext } from 'react-hook-form'
import { ReviewDetailedData } from '@/types'
import { QuestionItem, ReceiverItem } from '..'
import {
  useHandleReceiver,
  useHandleQuestion,
  useClickNextButton,
  useReplyComplete,
} from '../../hooks'
import { ReviewReplyStartType } from '../../types'
import Questions from '../Questions'

interface ReviewReplyProps {
  reviewData: ReviewDetailedData
  handleSubmit?: () => void
}

const ReviewReply = ({ reviewData, handleSubmit }: ReviewReplyProps) => {
  const { getValues } = useFormContext<ReviewReplyStartType>()
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
    useReplyComplete({ receivers, selectedReceiverIndex })

  const questionArray = questions.map((question, index) => (
    <Questions
      question={question}
      index={index}
      receiverIndex={selectedReceiverIndex}
    />
  ))

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex flex-col gap-8 pt-2.5">
        <h3 className="text-sm text-gray-300 dark:text-gray-400">{`응답자: ${selectedReceiver.name}`}</h3>
        <div className="flex flex-col gap-5">
          <ul className="flex gap-2.5 overflow-x-auto">
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
          <ul className="flex gap-5 overflow-x-auto">
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
        </div>
        {questionArray[selectedQuestionIndex]}
      </div>
      <div className="flex justify-center md:justify-end">
        {allReplyComplete ? (
          <button
            onClick={handleSubmit}
            className="mb-5 h-10 w-full rounded-md bg-active-orange text-lg text-white hover:border hover:border-black disabled:bg-opacity-50 dark:text-black md:w-52 md:text-xl"
          >
            답변 제출하기
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
    </div>
  )
}

export default ReviewReply
