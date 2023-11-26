import { ReactNode } from 'react'
import { useFormContext } from 'react-hook-form'
import { Profile } from '@/components'
import { Data } from '@/apis/hooks/useGetReviewFirst'
import { CheckInTheCircleIcon } from '@/assets/icons'
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
            {receivers.map(({ receiverId, name }) => (
              <li
                value={receiverId}
                key={receiverId}
                onClick={handleClickReceiver}
                className={`flex h-fit shrink-0 items-center justify-center gap-2 rounded-md border
              px-2 py-1.5
              ${
                selectedReceiver.receiverId === receiverId
                  ? 'border-black bg-main-yellow dark:border-white dark:bg-main-red-300'
                  : 'border-sub-green bg-white dark:bg-main-red-200 '
              }`}
              >
                <Profile
                  name={name}
                  className={`${
                    selectedReceiver.name === name
                      ? 'text-black dark:text-white'
                      : 'text-gray-300 dark:text-gray-100'
                  }`}
                />
                <div className="h-4 w-4">
                  <CheckInTheCircleIcon className="h-4 w-4 fill-sub-green" />
                </div>
              </li>
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
        {questionArray[selectedQuestionIndex] as ReactNode}
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
