import { useState, MouseEvent, useEffect, useMemo } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import { CheckIcon, MultipleCheckIcon } from '@/assets/icons'
import {
  ReviewReplyStartType,
  ReviewReplyEditType,
} from '@/pages/ReviewReplyPage/types'
import { QuestionOption } from '@/types'

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
  const { state } = useLocation()
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
    if (state.status === 'END' || state.status === 'DEADLINE') {
      return
    }

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
    <div className="flex flex-col gap-4">
      <span className="flex w-fit items-center gap-2 rounded-full border border-sub-orange bg-white px-3 py-1 dark:border-sub-yellow dark:bg-main-red-200">
        <MultipleCheckIcon className="h-4 w-4 stroke-sub-orange dark:stroke-sub-yellow" />
        <p className="text-sm text-sub-orange dark:text-sub-yellow">
          다중 객관식
        </p>
      </span>
      <ul className="flex max-h-[21rem] flex-col gap-5 overflow-auto">
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
    </div>
  )
}

export default ReplyChoices
