import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import { HexagonIcon } from '@/assets/icons'
import {
  ReviewReplyStartType,
  ReviewReplyEditType,
} from '@/pages/ReviewReplyPage/types'
import { QuestionOption } from '@/types'

interface ReplyHexaProps {
  receiverIndex: number
  questionIndex: number
  options: QuestionOption[]
  handleCheckReply: ({ value }: { value: number }) => void
}

type HexaPath = `replyTargets.${number}.replies.${number}.answerHexa`

const ReplyHexa = ({
  options,
  receiverIndex,
  questionIndex,
  handleCheckReply,
}: ReplyHexaProps) => {
  const [selectedOptionValue, setSelectedOptionValue] = useState(-1)
  const { state } = useLocation()
  const { register, getValues, setValue, watch } = useFormContext<
    ReviewReplyStartType | ReviewReplyEditType
  >()

  useEffect(() => {
    let count = 0

    for (let i = 0; i < 6; i++) {
      if (
        getValues(
          `replyTargets.${receiverIndex}.replies.${
            questionIndex + i
          }.answerHexa`,
        ) !== 0
      ) {
        count++
      }
    }

    handleCheckReply({ value: count })
    setSelectedOptionValue(-1)
  }, [
    handleCheckReply,
    getValues,
    receiverIndex,
    questionIndex,
    selectedOptionValue,
  ])

  return (
    <div className="flex flex-col gap-5">
      <span className="flex w-fit items-center gap-2 rounded-full border border-sub-orange bg-white px-3 py-1 dark:border-sub-yellow dark:bg-main-red-200">
        <HexagonIcon className="h-4 w-4 stroke-sub-orange dark:stroke-sub-yellow" />
        <p className="text-sm text-sub-orange dark:text-sub-yellow">
          육각형 스탯
        </p>
      </span>
      {options.map(({ optionId, optionName }, index) => {
        const hexaPath: HexaPath = `replyTargets.${receiverIndex}.replies.${
          questionIndex + index
        }.answerHexa`

        watch(hexaPath)

        return (
          <div key={optionId} className="flex gap-5">
            <label
              htmlFor={`${optionId}`}
              className="w-fit bg-gray-300 px-1.5 py-1 text-sm text-white dark:bg-gray-400 dark:text-black"
            >
              {optionName}
            </label>
            <select
              {...(register(hexaPath),
              {
                onChange: (e) => {
                  setValue(hexaPath, parseInt(e.currentTarget.value))
                  setSelectedOptionValue(parseInt(e.currentTarget.value))
                },
              })}
              disabled={state.status === 'END' || state.status === 'DEADLINE'}
              value={getValues(hexaPath) || 0}
              className="border border-gray-200 bg-white px-2.5 py-1 text-center text-sm focus:outline-none dark:border-gray-400 dark:bg-main-gray dark:text-white"
            >
              {Array.from({ length: 11 }, (_, i) => i).map((option) => (
                <option key={option} value={option}>
                  {option === 0 ? '점수 선택' : option}
                </option>
              ))}
            </select>
          </div>
        )
      })}
    </div>
  )
}

export default ReplyHexa
