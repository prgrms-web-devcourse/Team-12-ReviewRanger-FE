import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { QuestionOption } from '@/apis/hooks/useGetReviewFirst'
import { ReviewReplyType } from '@/pages/ReviewReplyPage/types'

interface ReplyHexaProps {
  receiverIndex: number
  questionIndex: number
  options: QuestionOption[]
  handleCheckReply: ({ count }: { count: number }) => void
}

type HexaPath = `replyTargets.${number}.replies.${number}.answerHexa`

const ReplyHexa = ({
  options,
  receiverIndex,
  questionIndex,
  handleCheckReply,
}: ReplyHexaProps) => {
  const { register, getValues, setValue, watch } =
    useFormContext<ReviewReplyType>()

  useEffect(() => {
    let count = 0

    while (count < 6) {
      if (
        getValues(
          `replyTargets.${receiverIndex}.replies.${
            questionIndex + count
          }.answerHexa`,
        ) === 0
      ) {
        break
      }
      count++
    }

    handleCheckReply({ count })
  }, [handleCheckReply, getValues, receiverIndex, questionIndex])

  return (
    <div className="flex flex-col gap-5">
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
                },
              })}
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
