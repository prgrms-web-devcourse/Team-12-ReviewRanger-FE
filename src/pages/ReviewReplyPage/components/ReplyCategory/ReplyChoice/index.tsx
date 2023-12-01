import { useState, MouseEvent, ChangeEvent, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import { CheckIcon } from '@/assets/icons'
import {
  ReviewReplyStartType,
  ReviewReplyEditType,
} from '@/pages/ReviewReplyPage/types'
import { QuestionOption } from '@/types'

interface ReplyChoiceProps {
  receiverIndex: number
  questionIndex: number
  options: QuestionOption[]
  handleCheckReply: ({ value }: { value: number }) => void
}

type RegisterPath = `replyTargets.${number}.replies.${number}`

const ReplyChoice = ({
  receiverIndex,
  questionIndex,
  options,
  handleCheckReply,
}: ReplyChoiceProps) => {
  const registerPath: RegisterPath = `replyTargets.${receiverIndex}.replies.${questionIndex}`
  const [selectedOptionId, setSelectedOptionId] = useState<number>(0)
  const { state } = useLocation()
  const { getValues, setValue } = useFormContext<
    ReviewReplyStartType | ReviewReplyEditType
  >()

  useEffect(() => {
    setSelectedOptionId(getValues(`${registerPath}.answerChoice`) || 0)
  }, [getValues, registerPath])

  useEffect(() => {
    handleCheckReply({ value: selectedOptionId })
  }, [handleCheckReply, selectedOptionId])

  const handleClickOption = (
    e: MouseEvent<HTMLLIElement> | ChangeEvent<HTMLSelectElement>,
  ) => {
    if (state.status === 'END' || state.status === 'DEADLINE') {
      return
    }

    const selectedTarget = options.find(
      (option) => option.optionId == e.currentTarget.value,
    )?.optionId

    if (!selectedTarget) {
      return
    }

    if (selectedOptionId === selectedTarget) {
      setSelectedOptionId(0)
      handleCheckReply({ value: 0 })
      setValue(`${registerPath}.answerChoice`, 0)
    } else {
      setSelectedOptionId(selectedTarget)
      handleCheckReply({ value: selectedTarget })
      setValue(`${registerPath}.answerChoice`, selectedTarget)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <span className="flex w-fit items-center gap-2 rounded-full border border-sub-orange bg-white px-3 py-1 dark:border-sub-yellow dark:bg-main-red-200">
        <CheckIcon className="h-4 w-4 fill-sub-orange dark:fill-sub-yellow" />
        <p className="text-sm text-sub-orange dark:text-sub-yellow">
          단일 객관식
        </p>
      </span>

      <ul className="flex max-h-[21rem] flex-col gap-5 overflow-auto">
        {options.map((option) => (
          <li
            key={option.optionId}
            value={option.optionId}
            onClick={handleClickOption}
            className={`flex cursor-pointer items-center justify-between gap-4 rounded-md border p-2.5 text-lg ${
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
    </div>
  )
}

export default ReplyChoice
