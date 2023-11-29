import { useState, MouseEvent, ChangeEvent, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import { DropdownIcon } from '@/assets/icons'
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
  const { getValues, setValue, register } = useFormContext<
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
    if (e.currentTarget.value === '0') {
      setSelectedOptionId(0)
      handleCheckReply({ value: 0 })
      setValue(`${registerPath}.answerChoice`, 0)
    } else {
      const selectedTarget = options.find(
        (option) => option.optionId == e.currentTarget.value,
      )?.optionId as number

      setSelectedOptionId(selectedTarget)
      handleCheckReply({ value: selectedTarget })
      setValue(`${registerPath}.answerChoice`, selectedTarget)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <span className="flex w-fit items-center gap-2 rounded-full border border-sub-orange bg-white px-3 py-1 dark:border-sub-yellow dark:bg-main-red-200">
        <DropdownIcon className="h-4 w-4 stroke-sub-orange dark:stroke-sub-yellow" />
        <p className="text-sm text-sub-orange dark:text-sub-yellow">드롭다운</p>
      </span>
      <select
        className="h-10 w-full rounded-md border bg-white p-2.5 text-lg dark:bg-main-gray dark:text-white"
        value={selectedOptionId}
        {...(register(`${registerPath}.answerChoice`),
        {
          onChange: handleClickOption,
        })}
        disabled={state.status === 'END' || state.status === 'DEADLINE'}
      >
        <option key={0} value={0}>
          선택하세요.
        </option>
        {options.map((option) => {
          return (
            <option
              className="text-md w-full bg-white dark:bg-main-gray"
              key={option.optionId}
              value={option.optionId}
            >
              {option.optionName}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default ReplyChoice
