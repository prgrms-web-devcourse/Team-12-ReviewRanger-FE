import { useState, MouseEvent, ChangeEvent, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { QuestionOption } from '@/apis/hooks/useGetReviewFirst'
import { CheckIcon } from '@/assets/icons'
import { ReviewReplyType } from '@/pages/ReviewReplyPage/types'

interface ReplyChoiceProps {
  registerPath: `replyTargets.${number}.replies.${number}`
  receiverIndex: number
  questionIndex: number
  options: QuestionOption[]
  type: 'SINGLE_CHOICE' | 'DROPDOWN'
  handleCheckReply: ({ choice }: { choice: number }) => void
}

const ReplyChoice = ({
  registerPath,
  receiverIndex,
  questionIndex,
  options,
  type,
  handleCheckReply,
}: ReplyChoiceProps) => {
  const [selectedOptionId, setSelectedOptionId] = useState<number>(0)
  const { getValues, setValue, register } = useFormContext<ReviewReplyType>()

  useEffect(() => {
    handleCheckReply({ choice: selectedOptionId })
  }, [selectedOptionId, handleCheckReply])

  useEffect(() => {
    setSelectedOptionId(
      getValues(`replyTargets.${receiverIndex}.replies`).find(
        (reply) => reply.questionId === questionIndex + 1,
      )?.answerChoice as number,
    )
  }, [receiverIndex, questionIndex, getValues])

  const handleClickOption = (
    e: MouseEvent<HTMLLIElement> | ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedTarget = options.find(
      (option) => option.optionId == e.currentTarget.value,
    )?.optionId

    if (!selectedTarget) {
      return
    }

    if (selectedOptionId === selectedTarget) {
      setSelectedOptionId(0)
      setValue(`${registerPath}.answerChoice`, 0)
    } else {
      setSelectedOptionId(selectedTarget)
      setValue(`${registerPath}.answerChoice`, selectedTarget)
    }
  }

  return (
    <>
      {type === 'SINGLE_CHOICE' && (
        <ul className="flex flex-col gap-5">
          {options.map((option) => (
            <li
              key={option.optionId}
              value={option.optionId}
              onClick={handleClickOption}
              className={`flex items-center justify-center gap-4 rounded-md border p-2.5 text-lg ${
                selectedOptionId === option.optionId
                  ? 'border-sub-green bg-[#F1FFE7] text-black dark:bg-[rgba(81,156,23,0.20)] dark:text-white'
                  : 'border-gray-100 bg-white text-gray-200 dark:border-gray-200 dark:bg-main-red-200 dark:text-gray-100'
              }`}
            >
              <p>{option.optionName}</p>
              <div className="h-4 w-4 shrink-0">
                {selectedOptionId === option.optionId && (
                  <CheckIcon className="h-4 w-4 fill-sub-green" />
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
      {type === 'DROPDOWN' && (
        <div>
          <select
            className="h-10 w-full rounded-md border p-2.5 text-lg"
            value={selectedOptionId}
            {...(register(`${registerPath}.answerChoice`),
            {
              onChange: handleClickOption,
            })}
          >
            <option key={0} value={0}>
              선택하세요.
            </option>
            {options.map((option) => {
              return (
                <option
                  className="text-md w-full bg-white"
                  key={option.optionId}
                  value={option.optionId}
                >
                  {option.optionName}
                </option>
              )
            })}
          </select>
        </div>
      )}
    </>
  )
}

export default ReplyChoice
