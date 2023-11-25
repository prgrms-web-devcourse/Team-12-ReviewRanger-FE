import { useFormContext } from 'react-hook-form'
import { Question } from '@/apis/hooks/useGetReviewFirst'
import { ReviewReplyStartType, ReviewReplyEditType } from '../../types'
import {
  ReplyText,
  ReplyChoice,
  ReplyChoices,
  ReplyRating,
  ReplyHexa,
  ReplyDropdown,
} from '../ReplyCategory'

interface QuestionsProps {
  question: Question
  index: number
  receiverIndex: number
}

type ReplyCompletePath = `replyComplete.${number}.complete.${number}`

const Questions = ({ question, index, receiverIndex }: QuestionsProps) => {
  const replyCompletePath: ReplyCompletePath = `replyComplete.${receiverIndex}.complete.${index}`
  const { title, description, type, questionOptions, isRequired, id } = question
  const { setValue, getValues } = useFormContext<
    ReviewReplyStartType | ReviewReplyEditType
  >()

  const questionIndex = getValues(
    `replyTargets.${receiverIndex}.replies`,
  ).findIndex(({ questionId }) => questionId === id)

  const handleCheckReply = ({
    value,
  }: {
    value: string | number | number[]
  }) => {
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
          receiverIndex={receiverIndex}
          questionIndex={questionIndex}
          handleCheckReply={handleCheckReply}
        />
      )}
      {type === 'SINGLE_CHOICE' && (
        <ReplyChoice
          options={questionOptions}
          receiverIndex={receiverIndex}
          questionIndex={questionIndex}
          handleCheckReply={handleCheckReply}
        />
      )}
      {type === 'MULTIPLE_CHOICE' && (
        <ReplyChoices
          options={questionOptions}
          receiverIndex={receiverIndex}
          questionIndex={questionIndex}
          handleCheckReply={handleCheckReply}
        />
      )}
      {type === 'DROPDOWN' && (
        <ReplyDropdown
          options={questionOptions}
          receiverIndex={receiverIndex}
          questionIndex={questionIndex}
          handleCheckReply={handleCheckReply}
        />
      )}
      {type === 'RATING' && (
        <ReplyRating
          receiverIndex={receiverIndex}
          questionIndex={questionIndex}
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
