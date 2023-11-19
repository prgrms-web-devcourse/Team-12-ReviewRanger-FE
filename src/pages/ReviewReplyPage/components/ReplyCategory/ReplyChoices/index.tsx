import { useState, MouseEvent, useEffect, useMemo } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { QuestionOption } from '@/apis/hooks/useGetReviewFirst'
import { CheckIcon } from '@/assets/icons'
import { ReviewReplyType } from '@/pages/ReviewReplyPage/types'

interface ReplyChoicesProps {
  registerPath: `replyTargets.${number}.replies.${number}`
  receiverIndex: number
  questionIndex: number
  options: QuestionOption[]
  handleCheckReply: ({ choices }: { choices: number[] }) => void
}

const ReplyChoices = ({
  registerPath,
  receiverIndex,
  questionIndex,
  options,
  handleCheckReply,
}: ReplyChoicesProps) => {
  const { getValues, setValue, control } = useFormContext<ReviewReplyType>()
  const { append: appendChoiceReply, remove: removeChoiceReply } =
    useFieldArray({
      control,
      name: `replyTargets.${receiverIndex}.replies`,
    })

  const prevSelectedOptions = useMemo(
    () =>
      getValues(`replyTargets.${receiverIndex}.replies`)
        .filter(
          (reply) =>
            reply.questionId === questionIndex + 1 && reply.answerChoice !== 0,
        )
        .map((reply) => reply.answerChoice as number),
    [receiverIndex, questionIndex, getValues],
  )

  const [selectedOptionIds, setSelectedOptionIds] = useState<number[]>(
    prevSelectedOptions || [],
  )

  useEffect(() => {
    handleCheckReply({ choices: selectedOptionIds })
  }, [selectedOptionIds, handleCheckReply])

  useEffect(() => {
    setSelectedOptionIds(prevSelectedOptions)
  }, [prevSelectedOptions])

  const handleClickOption = (e: MouseEvent<HTMLLIElement>) => {
    const selectedTarget = options.find(
      (option) => option.optionId === e.currentTarget.value,
    )?.optionId

    if (!selectedTarget) {
      return
    }

    if (selectedOptionIds.includes(selectedTarget)) {
      if (selectedOptionIds.length > 1) {
        const index = getValues(
          `replyTargets.${receiverIndex}.replies`,
        ).findIndex((reply) => {
          return (
            reply.questionId === questionIndex + 1 &&
            reply.answerChoice === selectedTarget
          )
        })
        removeChoiceReply(index)
      } else {
        setValue(`${registerPath}.answerChoice`, 0)
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
          questionId: questionIndex + 1,
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
