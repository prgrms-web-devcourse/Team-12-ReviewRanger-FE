import { useState, MouseEvent } from 'react'
import { useFormContext } from 'react-hook-form'
import { Profile } from '@/components'
import { Data, Receiver, Question } from '@/apis/hooks/useGetReviewFirst'
import { ReviewReplyType } from '../../types'
import { ReplyText } from '../ReplyCategory'
import ReplyChoice from '../ReplyCategory/ReplyChoice/index'

interface ReviewReplyProps {
  reviewData: Data
}

const ReviewReply = ({ reviewData }: ReviewReplyProps) => {
  const questions = reviewData.questions

  const { getValues } = useFormContext<ReviewReplyType>()
  const receivers = getValues('receiverList')

  const [selectedReceiver, setSelectedReceiver] = useState(receivers[0])
  const [
    { type, title, description, isRequired, questionOptions, id },
    setSelectedQuestion,
  ] = useState(questions[0])

  const handleClickReceiver = (e: MouseEvent<HTMLLIElement>) => {
    const selectedTarget = receivers.find(
      (receiver) => receiver.name === e.currentTarget.innerText,
    )

    setSelectedReceiver(selectedTarget as Receiver)
  }

  const handleClickQuestion = (e: MouseEvent<HTMLLIElement>) => {
    const selectedTarget = questions.find(
      (question) => question.id === e.currentTarget.value,
    )

    setSelectedQuestion(selectedTarget as Question)
  }

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex flex-col gap-8 pt-2.5">
        <h3 className="text-sm text-gray-300 dark:text-gray-400">{`응답자: ${selectedReceiver.name}`}</h3>
        <div className="flex flex-col gap-5">
          <ul className="flex gap-2.5 overflow-x-auto">
            {receivers.map(({ id, name }) => (
              <li
                key={id}
                onClick={handleClickReceiver}
                className={`flex h-fit shrink-0 items-center justify-center gap-2 rounded-md border px-2 
              py-1.5
              ${
                selectedReceiver.name === name
                  ? 'border-black bg-main-yellow dark:border-white dark:bg-main-red-300'
                  : 'border-gray-100 bg-white dark:bg-main-red-200'
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
              </li>
            ))}
          </ul>
          <ul className="flex gap-5">
            {questions.map((question, index) => (
              <li
                value={question.id}
                onClick={handleClickQuestion}
                key={question.id}
                className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm ${
                  question.id === id
                    ? // TODO: bg-main-yellow -> bg-yellow-200으로 변경하기
                      'border-black bg-main-yellow text-black dark:border-white dark:bg-main-red-300 dark:text-white'
                    : 'border-gray-100 bg-white text-gray-300 dark:border-gray-300 dark:bg-main-red-200 dark:text-gray-100'
                }`}
              >
                {index + 1}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-2.5">
          <div className="flex justify-between">
            <h2 className="text-lg dark:text-white">{title}</h2>
            {isRequired && (
              <h3 className="text-sm text-sub-red-200 dark:text-active-orange">
                필수 질문
              </h3>
            )}
          </div>
          <p className="text-sm text-gray-300 dark:text-gray-400">
            {description}
          </p>
          {type === 'SUBJECTIVE' && <ReplyText />}
          {type === 'SINGLE_CHOICE' && (
            <ReplyChoice options={questionOptions} type="MULTIPLE_CHOICE" />
          )}
        </div>
      </div>
      <div className="flex justify-center md:justify-end">
        <button className="mb-5 h-10 w-full rounded-md bg-active-orange text-lg text-white hover:border hover:border-black disabled:bg-opacity-50 dark:text-black md:w-52 md:text-xl">
          다음
        </button>
      </div>
    </div>
  )
}

export default ReviewReply
