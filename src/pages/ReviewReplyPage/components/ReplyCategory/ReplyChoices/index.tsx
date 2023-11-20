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
  handleCheckReply: ({ value }: { value: number[] }) => void
}

const ReplyChoices = ({
  registerPath,
  receiverIndex,
  questionIndex,
  options,
  handleCheckReply,
}: ReplyChoicesProps) => {
  const [selectedOptionIds, setSelectedOptionIds] = useState<number[]>([])
  const { getValues, setValue, control } = useFormContext<ReviewReplyType>()
  const { append: appendChoiceReply, remove: removeChoiceReply } =
    useFieldArray({
      control,
      name: `replyTargets.${receiverIndex}.replies`,
    })

  // NOTE: 이전에 선택된 옵션을 가져오기.
  const prevSelectedOptions = useMemo(() => {
    return (
      getValues(`replyTargets.${receiverIndex}.replies`)
        .filter(
          (reply) =>
            reply.questionId === questionIndex + 1 && reply.answerChoice !== 0,
        )
        .map((reply) => reply.answerChoice as number) || []
    )
  }, [receiverIndex, questionIndex, getValues])

  useEffect(() => {
    setSelectedOptionIds(prevSelectedOptions)
  }, [prevSelectedOptions, questionIndex, receiverIndex])

  useEffect(() => {
    handleCheckReply({ value: selectedOptionIds })
  }, [selectedOptionIds, handleCheckReply])

  // NOTE: 옵션을 클릭했을 때 이벤트 핸들러
  const handleClickOption = (e: MouseEvent<HTMLLIElement>) => {
    const selectedTarget = options.find(
      (option) => option.optionId === e.currentTarget.value,
    )?.optionId

    if (!selectedTarget) {
      return
    }

    // NOTE: 이미 선택한 값을 다시 눌렀을 때,
    if (selectedOptionIds.includes(selectedTarget)) {
      // NOTE: 해당 수신자의 답변 리스트 'replies[]'에서 선택한 옵션의 대한 답변 index
      const index = getValues(
        `replyTargets.${receiverIndex}.replies`,
      ).findIndex((reply) => {
        return (
          reply.questionId === questionIndex + 1 &&
          reply.answerChoice === selectedTarget
        )
      })

      // NOTE: 선택한 옵션의 대한 답변이 초기 세팅한 index와 같을 때...
      // NOTE: 초기에는 다중 객관식에 대한 답변 데이터를 default 값이 0인 하나의 객체만 넣어준다.
      // NOTE: 예를 들어,
      /*
        replies: [
          {
            questionId: 1,
            ..., 단일 객관식 데이터
          },
          {
            questionId: 2,
            ..., 텍스트 데이터
          },
          {
            questionId: 3,
            ..., 텍스트 데이터
          },
          {
            questionId: 4,
            ..., 다중 객관식 데이터 (defaultValue = 0)
          },
          {
            questionId: 5,
            ..., 드롭다운 데이터
          },
          {
            questionId: 6,
            ..., 별점 데이터
          },
        ]
       */
      // NOTE: 하지만, 사용자가 답변을 추가할 때마다 replies[]에 append 해준다.
      /*
        replies: [
          ...
          {
            questionId: 3,
            ..., 텍스트 데이터
          },
          {
            questionId: 4,
            ..., 다중 객관식 데이터 (defaultValue = 0)
          },
          {
            questionId: 5,
            ..., 드롭다운 데이터
          },
          {
            questionId: 6,
            ..., 별점 데이터
          },
          {
            questionId: 4,
            ..., 다중 객관식 데이터 (selectedTarget)
          },
          {
            questionId: 4,
            ..., 다중 객관식 데이터 (selectedTarget)
          }
          ...
        ]
       */
      // NOTE: 질문의 순서를 해치면 안되기에 현재 선택한 옵션의 답변 index와 현재 참조하고 있는 questionIndex를 분리해서 생각
      // NOTE: index === questionIndex이면 이 답변을 삭제하지 않고, 0으로 초기화
      if (index === questionIndex) {
        setValue(`${registerPath}.answerChoice`, 0)
      } else {
        removeChoiceReply(index)
      }

      // NOTE: 선택한 옵션 배열(selectedOptionIds)에서 해당 옵션 제거
      setSelectedOptionIds(
        selectedOptionIds.filter(
          (selectedOptionId) => selectedOptionId !== selectedTarget,
        ),
      )
    } else {
      // NOTE: 기존에 선택하지 않은 옵션일 때, 해당 옵션 추가
      setSelectedOptionIds([...selectedOptionIds, selectedTarget])
      // NOTE: 위에서 설명했듯이 선택한 옵션이 questionIndex 원소일 때, 그곳에 값을 저장
      if (getValues(`${registerPath}.answerChoice`) === 0) {
        setValue(`${registerPath}.answerChoice`, selectedTarget)
      } else {
        // NOTE: 그렇지 않으면, 새로운 데이터를 만들어 append 하기
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
