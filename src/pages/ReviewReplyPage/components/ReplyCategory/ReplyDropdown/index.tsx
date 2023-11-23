import { useState, MouseEvent, ChangeEvent, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { QuestionOption } from '@/apis/hooks/useGetReviewFirst'
import { ReviewReplyType } from '@/pages/ReviewReplyPage/types'

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
  const { getValues, setValue, register } = useFormContext<ReviewReplyType>()

  useEffect(() => {
    setSelectedOptionId(getValues(`${registerPath}.answerChoice`) || 0)
  }, [getValues, registerPath])

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
  )
}

export default ReplyChoice
