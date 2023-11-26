import { useFormContext } from 'react-hook-form'
import { Data } from '@/apis/hooks/useGetReviewFirst'
import { ReceiverItem } from '../'
import {
  useHandleReceiver,
  useHandleQuestion,
  useClickNextButton,
} from '../../hooks'
import { ReviewReplyEndType } from '../../types'
import Questions from '../Questions'

interface ReviewReplyProps {
  reviewData: Data
}

const ReviewReply = ({ reviewData }: ReviewReplyProps) => {
  const { getValues } = useFormContext<ReviewReplyEndType>()
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
            {receivers.map((receiver) => (
              <ReceiverItem
                key={receiver.receiverId}
                receiver={receiver}
                selectedReceiver={selectedReceiver}
                handleClickReceiver={handleClickReceiver}
              />
            ))}
          </ul>
          <ul className="flex gap-5 overflow-x-auto">
            {questions.map((question, index) => (
              <li
                value={question.id}
                onClick={handleClickQuestion}
                key={question.id}
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm ${
                  index === selectedQuestionIndex
                    ? 'border-black bg-main-hover-yellow text-black dark:border-white dark:bg-main-red-300 dark:text-white'
                    : 'border-sub-green bg-white text-gray-300 dark:border-sub-green dark:bg-main-red-200 dark:text-gray-100'
                }`}
              >
                {index + 1}
              </li>
            ))}
          </ul>
        </div>
        {questionArray[selectedQuestionIndex]}
      </div>
      <div className="flex justify-center md:justify-end">
        <button
          onClick={handleClickNextButton}
          className="mb-5 h-10 w-full rounded-md bg-active-orange text-lg text-white hover:border hover:border-black disabled:bg-opacity-50 dark:text-black md:w-52 md:text-xl"
        >
          다음
        </button>
      </div>
    </div>
  )
}

export default ReviewReply
