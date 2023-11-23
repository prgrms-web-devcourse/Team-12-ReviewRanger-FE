import { useState, MouseEvent, useEffect, useMemo } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { QuestionOption } from '@/apis/hooks/useGetReviewFirst'
import { CheckIcon } from '@/assets/icons'
import {
  ReviewReplyStartType,
  ReviewReplyEditType,
} from '@/pages/ReviewReplyPage/types'

interface ReplyChoicesProps {
  receiverIndex: number
  questionIndex: number
  options: QuestionOption[]
  handleCheckReply: ({ value }: { value: number[] }) => void
}

type RegisterPath = `replyTargets.${number}.replies.${number}`

const ReplyChoices = ({
  receiverIndex,
  questionIndex,
  options,
  handleCheckReply,
}: ReplyChoicesProps) => {
  const registerPath: RegisterPath = `replyTargets.${receiverIndex}.replies.${questionIndex}`
  const [selectedOptionIds, setSelectedOptionIds] = useState<number[]>([])
  const { getValues, setValue, control } = useFormContext<
    ReviewReplyStartType | ReviewReplyEditType
  >()
  const { append: appendChoiceReply, remove: removeChoiceReply } =
    useFieldArray({
      control,
      name: `replyTargets.${receiverIndex}.replies`,
    })

  const currentQuestionId = getValues(`${registerPath}.questionId`)

  const prevSelectedOptions = useMemo(() => {
    return (
      getValues(`replyTargets.${receiverIndex}.replies`)
        .filter(
          (reply) =>
            reply.questionId === currentQuestionId && reply.answerChoice !== 0,
        )
        .map((reply) => reply.answerChoice as number) || []
    )
  }, [receiverIndex, currentQuestionId, getValues])

  useEffect(() => {
    setSelectedOptionIds(prevSelectedOptions)
  }, [prevSelectedOptions, questionIndex, receiverIndex])

  useEffect(() => {
    handleCheckReply({ value: selectedOptionIds })
  }, [selectedOptionIds, handleCheckReply])

  const handleClickOption = (e: MouseEvent<HTMLLIElement>) => {
    const selectedTarget = options.find(
      (option) => option.optionId === e.currentTarget.value,
    )?.optionId

    if (!selectedTarget) {
      return
    }

    if (selectedOptionIds.includes(selectedTarget)) {
      const index = getValues(
        `replyTargets.${receiverIndex}.replies`,
      ).findIndex((reply) => {
        return (
          reply.questionId === currentQuestionId &&
          reply.answerChoice === selectedTarget
        )
      })

      if (index === questionIndex) {
        setValue(`${registerPath}.answerChoice`, 0)
      } else {
        removeChoiceReply(index)
      }

      setSelectedOptionIds(
        selectedOptionIds.filter(
          (selectedOptionId) => selectedOptionId !== selectedTarget,
        ),
      )
    } else {
      setSelectedOptionIds([...selectedOptionIds, selectedTarget])
      if (getValues(`${registerPath}.answerChoice`) === 0) {
        setValue(`${registerPath}.answerChoice`, selectedTarget)
      } else {
        appendChoiceReply({
          questionId: currentQuestionId,
          isRequired: getValues(`${registerPath}`).isRequired,
          answerText: null,
          answerChoice: selectedTarget,
          answerRating: null,
          answerHexa: null,
        })
      }
    }
  }

  return (
    <ul className="flex flex-col gap-5">
      {options.map((option) => (
        <li
          key={option.optionId}
          value={option.optionId}
          onClick={handleClickOption}
          className={`flex items-center justify-between gap-4 rounded-md border p-2.5 text-lg ${
            selectedOptionIds.includes(option.optionId)
              ? 'border-sub-green bg-[#F1FFE7] text-black dark:bg-[rgba(81,156,23,0.20)] dark:text-white'
              : 'border-gray-100 bg-white text-gray-200 dark:border-gray-200 dark:bg-main-red-200 dark:text-gray-100'
          }`}
        >
          <p>{option.optionName}</p>
          <div className="h-4 w-4 shrink-0">
            {selectedOptionIds.includes(option.optionId) && (
              <CheckIcon className="h-4 w-4 fill-sub-green" />
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}

export default ReplyChoices
