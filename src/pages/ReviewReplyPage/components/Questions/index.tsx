import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { Question } from '@/types'
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
  checkReplyComplete?: () => void
}

type ReplyCompletePath = `replyComplete.${number}.complete.${number}`

const Questions = ({
  question,
  index,
  receiverIndex,
  checkReplyComplete,
}: QuestionsProps) => {
  const replyCompletePath: ReplyCompletePath = `replyComplete.${receiverIndex}.complete.${index}`
  const { title, description, type, questionOptions, isRequired, id } = question
  const { setValue, getValues } = useFormContext<
    ReviewReplyStartType | ReviewReplyEditType
  >()

  const questionIndex = getValues(
    `replyTargets.${receiverIndex}.replies`,
  ).findIndex(({ questionId }) => questionId === id)

  const handleCheckReply = useCallback(
    ({ value }: { value: number }) => {
      if (!question.isRequired) {
        if (type === 'HEXASTAT' && value !== 0 && value !== 6) {
          setValue(replyCompletePath, false)
        } else {
          setValue(replyCompletePath, true)
        }
        checkReplyComplete && checkReplyComplete()

        return
      }

      setValue(
        replyCompletePath,
        type === 'HEXASTAT' ? value === 6 : value !== 0,
      )

      checkReplyComplete && checkReplyComplete()
    },
    [
      replyCompletePath,
      type,
      question.isRequired,
      setValue,
      checkReplyComplete,
    ],
  )

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
        <p className="mb-8 min-h-[2.5rem] whitespace-pre-wrap text-sm text-gray-300 dark:text-gray-400">
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
