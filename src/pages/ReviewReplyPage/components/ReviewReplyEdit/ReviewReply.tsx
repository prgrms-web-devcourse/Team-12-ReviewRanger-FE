import { useFormContext } from 'react-hook-form'
// import { Profile } from '@/components'
import { Data } from '@/apis/hooks/useGetReviewFirst'
// import { CheckInTheCircleIcon } from '@/assets/icons'
import { ReceiverItem } from '..'
import {
  useHandleReceiver,
  useHandleQuestion,
  useClickNextButton,
  useReplyComplete,
} from '../../hooks'
import { ReviewReplyEditType } from '../../types'
import Questions from '../Questions'

interface ReviewReplyProps {
  reviewData: Data
  handleSubmit?: () => void
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
            {questions.map((question, index) => {
              const complete = getValues(
                `replyComplete.${selectedReceiverIndex}.complete.${index}`,
              )

              return (
                <li
                  value={question.id}
                  onClick={(e) => {
                    handleClickQuestion(e)
                    checkReplyComplete()
                  }}
                  key={question.id}
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm ${
                    index === selectedQuestionIndex
                      ? 'border-black bg-main-hover-yellow text-black dark:border-white dark:bg-main-red-300 dark:text-white'
                      : 'border-gray-100 bg-white text-gray-300 dark:border-gray-300 dark:bg-main-red-200 dark:text-gray-100'
                  } ${complete && 'border-sub-green dark:border-sub-green'}`}
                >
                  {index + 1}
                </li>
              )
            })}
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
