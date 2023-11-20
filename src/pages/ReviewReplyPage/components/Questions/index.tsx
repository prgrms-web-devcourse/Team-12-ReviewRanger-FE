import { useFormContext } from 'react-hook-form'
import { Question } from '@/apis/hooks/useGetReviewFirst'
import { ReviewReplyType } from '@/pages/ReviewReplyPage/types'
import {
  ReplyText,
  ReplyChoice,
  ReplyChoices,
  ReplyRating,
  ReplyHexa,
} from '../ReplyCategory'

interface QuestionsProps {
  question: Question
  questionIndex: number
  receiverIndex: number
}

type RegisterPath = `replyTargets.${number}.replies.${number}`
type ReplyCompletePath = `replyComplete.${number}.complete.${number}`

const Questions = ({
  question,
  questionIndex,
  receiverIndex,
}: QuestionsProps) => {
  const { title, description, type, questionOptions, isRequired } = question
  const { setValue } = useFormContext<ReviewReplyType>()

  // NOTE: 폼 데이터의 경로
  const registerPath: RegisterPath = `replyTargets.${receiverIndex}.replies.${questionIndex}`
  const replyCompletePath: ReplyCompletePath = `replyComplete.${receiverIndex}.complete.${questionIndex}`

  // NOTE: 문항별로 답변 여부 체크
  const handleCheckReply = ({
    value,
  }: {
    value: string | number | number[]
  }) => {
    // NOTE: 필수 질문이 아닐 때는, 답변을 한 것으로 처리.
    if (!question.isRequired) {
      setValue(replyCompletePath, true)

      return
    }

    switch (type) {
      case 'SUBJECTIVE':
        setValue(replyCompletePath, (value as string).trim().length > 0)
        break
      case 'SINGLE_CHOICE':
      case 'DROPDOWN':
      case 'RATING':
        setValue(replyCompletePath, value !== 0)
        break
      case 'MULTIPLE_CHOICE':
        setValue(replyCompletePath, (value as number[]).length > 0)
        break
      case 'HEXASTAT':
        setValue(replyCompletePath, value === 6)
        break
      default:
        break
    }
  }

  return (
    <div className={`flex flex-col gap-2.5`}>
      <div className="flex justify-between">
        <h2 className="text-lg dark:text-white">{title}</h2>
        {isRequired && (
          <h3 className="text-sm text-sub-red-200 dark:text-active-orange">
            필수 질문
          </h3>
        )}
      </div>
      {description && (
        <p className="min-h-[2.5rem] text-sm text-gray-300 dark:text-gray-400">
          {description}
        </p>
      )}
      {type === 'SUBJECTIVE' && (
        <ReplyText
          registerPath={registerPath}
          handleCheckReply={handleCheckReply}
        />
      )}
      {(type === 'SINGLE_CHOICE' || type === 'DROPDOWN') && (
        <ReplyChoice
          registerPath={registerPath}
          options={questionOptions}
          receiverIndex={receiverIndex}
          questionIndex={questionIndex}
          type={type}
          handleCheckReply={handleCheckReply}
        />
      )}
      {type === 'MULTIPLE_CHOICE' && (
        <ReplyChoices
          registerPath={registerPath}
          options={questionOptions}
          receiverIndex={receiverIndex}
          questionIndex={questionIndex}
          handleCheckReply={handleCheckReply}
        />
      )}
      {type === 'RATING' && (
        <ReplyRating
          registerPath={registerPath}
          handleCheckReply={handleCheckReply}
        />
      )}
      {type === 'HEXASTAT' && (
        <ReplyHexa
          options={questionOptions}
          receiverIndex={receiverIndex}
          questionIndex={questionIndex}
          handleCheckReply={handleCheckReply}
        />
      )}
    </div>
  )
}

export default Questions
