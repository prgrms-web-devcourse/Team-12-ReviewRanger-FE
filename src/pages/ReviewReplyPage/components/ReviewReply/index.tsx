import { useState, useEffect, MouseEvent, ReactNode, useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { Profile } from '@/components'
import { Data, Receiver } from '@/apis/hooks/useGetReviewFirst'
import { CheckInTheCircleIcon } from '@/assets/icons'
import { ReviewReplyType } from '../../types'
import Questions from '../Questions'

interface ReviewReplyProps {
  reviewData: Data
}

const ReviewReply = ({ reviewData }: ReviewReplyProps) => {
  const questions = reviewData.questions

  const { getValues } = useFormContext<ReviewReplyType>()

  const receivers = getValues('receiverList')
  const replyTargets = getValues('replyTargets')
  console.log(replyTargets)

  const [selectedReceiver, setSelectedReceiver] = useState<Receiver>(
    receivers[0],
  )
  const [selectedReceiverIndex, setSelectedReceiverIndex] = useState<number>(0)
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number>(0)
  const [individualReplyCompletes, setIndividualReplyCompletes] = useState<
    boolean[]
  >(Array(receivers.length).fill(false))
  const [allReplyComplete, setAllReplyComplete] = useState<boolean>(false)

  const questionArray = questions.map((question, index) => (
    <Questions
      question={question}
      questionIndex={index}
      receiverIndex={selectedReceiverIndex}
    />
  ))

  const checkReplyComplete = useCallback(async () => {
    const checkIndividualReplyComplete = getValues(
      `replyComplete.${selectedReceiverIndex}.complete`,
    ).every((value) => value)

    setIndividualReplyCompletes((individualReplyCompletes) =>
      individualReplyCompletes.map((status, index) =>
        index === selectedReceiverIndex ? checkIndividualReplyComplete : status,
      ),
    )
  }, [selectedReceiverIndex, getValues])

  useEffect(() => {
    setAllReplyComplete(individualReplyCompletes.every((value) => value))
  }, [individualReplyCompletes])

  const handleClickReceiver = (e: MouseEvent<HTMLLIElement>) => {
    receivers.forEach((receiver, index) => {
      if (receiver.receiverId === e.currentTarget.value) {
        setSelectedReceiver(receiver)
        setSelectedReceiverIndex(index)
        checkReplyComplete()
      }
    })
  }

  const handleClickQuestion = (e: MouseEvent<HTMLLIElement>) => {
    const selectedTarget = questions.findIndex(
      (question) => question.id === e.currentTarget.value,
    )
    setSelectedQuestionIndex(selectedTarget)
    checkReplyComplete()
  }

  const handleClickNextButton = () => {
    checkReplyComplete()

    if (selectedQuestionIndex < questions.length - 1) {
      setSelectedQuestionIndex((prevQuestion) => prevQuestion + 1)

      return
    }

    if (selectedReceiverIndex < receivers.length - 1) {
      const nextReceiver = receivers.find(
        (_, index) => index === selectedReceiverIndex + 1,
      )

      if (!nextReceiver) {
        return
      }

      setSelectedReceiver(nextReceiver)
      setSelectedReceiverIndex((prevReceiver) => prevReceiver + 1)
    } else {
      const firstReceiver = receivers[0]

      setSelectedReceiver(firstReceiver)
      setSelectedReceiverIndex(0)
    }
    setSelectedQuestionIndex(0)
  }

  const handleSubmitReply = () => {}

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex flex-col gap-8 pt-2.5">
        <h3 className="text-sm text-gray-300 dark:text-gray-400">{`응답자: ${selectedReceiver.name}`}</h3>
        <div className="flex flex-col gap-5">
          <ul className="flex gap-2.5 overflow-x-auto">
            {receivers.map(({ receiverId, name }, index) => (
              <li
                value={receiverId}
                key={receiverId}
                onClick={handleClickReceiver}
                className={`flex h-fit shrink-0 items-center justify-center gap-2 rounded-md border px-2 
              py-1.5
              ${
                selectedReceiver.receiverId === receiverId
                  ? 'border-black bg-main-yellow dark:border-white dark:bg-main-red-300'
                  : 'border-gray-100 bg-white dark:border-gray-300 dark:bg-main-red-200'
              } ${individualReplyCompletes[index] && 'border-sub-green'}`}
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
                  {individualReplyCompletes[index] && (
                    <CheckInTheCircleIcon className="h-4 w-4 fill-sub-green" />
                  )}
                </div>
              </li>
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
                  onClick={handleClickQuestion}
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
        {questionArray[selectedQuestionIndex] as ReactNode}
      </div>
      <div className="flex justify-center md:justify-end">
        {allReplyComplete ? (
          <button
            onClick={handleSubmitReply}
            className="mb-5 h-10 w-full rounded-md bg-active-orange text-lg text-white hover:border hover:border-black disabled:bg-opacity-50 dark:text-black md:w-52 md:text-xl"
          >
            답변 제출하기
          </button>
        ) : (
          <button
            type="button"
            onClick={handleClickNextButton}
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
