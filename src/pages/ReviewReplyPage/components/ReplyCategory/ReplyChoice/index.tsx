import { useState, MouseEvent, ChangeEvent, useEffect, useMemo } from 'react'
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
  handleCheckReply: ({ value }: { value: number }) => void
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

  // NOTE: 이전에 선택된 옵션을 가져오기.
  const prevSelectedOptions = useMemo(
    () =>
      getValues(`replyTargets.${receiverIndex}.replies`).find(
        (reply) => reply.questionId === questionIndex + 1,
      )?.answerChoice || 0,
    [receiverIndex, questionIndex, getValues],
  )

  useEffect(() => {
    setSelectedOptionId(prevSelectedOptions)
  }, [prevSelectedOptions, questionIndex, receiverIndex])

  // NOTE: 옵션을 클릭했을 때 이벤트 핸들러
  const handleClickOption = (
    e: MouseEvent<HTMLLIElement> | ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedTarget = options.find(
      (option) => option.optionId == e.currentTarget.value,
    )?.optionId

    // NOTE: selectedTarget은 값이 없을 수가 없지만, typescript이므로...
    if (!selectedTarget) {
      return
    }

    // NOTE: 이미 선택한 값을 다시 눌렀을 때, 초기화
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
