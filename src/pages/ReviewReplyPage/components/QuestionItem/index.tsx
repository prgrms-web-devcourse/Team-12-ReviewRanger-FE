import { MouseEvent } from 'react'
import { useFormContext } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import { Question } from '@/types'
import { ReviewReplyStartType, ReviewReplyEditType } from '../../types'

interface QuestionItemProps {
  index: number
  selectedReceiverIndex?: number
  selectedQuestionIndex: number
  question: Question
  handleClickQuestion: (e: MouseEvent<HTMLLIElement>) => void
  checkReplyComplete?: () => void
}

const QuestionItem = ({
  index,
  selectedReceiverIndex,
  selectedQuestionIndex,
  question,
  handleClickQuestion,
  checkReplyComplete,
}: QuestionItemProps) => {
  const { state } = useLocation()
  const { getValues } = useFormContext<
    ReviewReplyStartType | ReviewReplyEditType
  >()
  const complete =
    selectedReceiverIndex !== undefined &&
    index !== undefined &&
    getValues(`replyComplete.${selectedReceiverIndex}.complete.${index}`)

  return (
    <li
      value={question.id}
      onClick={(e) => {
        handleClickQuestion(e)
        checkReplyComplete && checkReplyComplete()
      }}
      className={`flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border text-sm ${
        index === selectedQuestionIndex
          ? 'border-2 border-black bg-main-hover-yellow text-black dark:border-white dark:bg-gray-500 dark:text-white'
          : 'border-gray-100 bg-white text-gray-300 dark:border-gray-300 dark:bg-main-red-200 dark:text-gray-100'
      } ${complete && 'border-1 !border-sub-green'} ${
        (state.status === 'END' || state.status === 'DEADLINE') &&
        'border-1 !border-sub-green'
      }`}
    >
      {index + 1}
    </li>
  )
}

export default QuestionItem
