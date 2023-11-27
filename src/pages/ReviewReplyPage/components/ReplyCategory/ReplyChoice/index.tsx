import { useState, MouseEvent, ChangeEvent, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import { QuestionOption } from '@/apis/hooks/useGetReviewForCreator'
import { CheckIcon } from '@/assets/icons'
import {
  ReviewReplyStartType,
  ReviewReplyEditType,
} from '@/pages/ReviewReplyPage/types'

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
  )
}

export default ReplyChoice
