import { useState, MouseEvent } from 'react'
import { useFormContext } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import { Question } from '@/types'
import { ReviewReplyStartType } from '../types'

interface UseHandleQuestionProps {
  questions: Question[]
  selectedReceiverIndex: number
}

const useHandleQuestion = ({
  questions,
  selectedReceiverIndex,
}: UseHandleQuestionProps) => {
  const { state } = useLocation()
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number>(0)
  const { setValue } = useFormContext<ReviewReplyStartType>()

  const handleClickQuestion = (e: MouseEvent<HTMLLIElement>) => {
    const selectedTarget = questions.findIndex(
      (question) => question.id === e.currentTarget.value,
    )

    if (
      state.status === 'PROCEEDING' &&
      !questions[selectedTarget].isRequired
    ) {
      setValue(
        `replyComplete.${selectedReceiverIndex}.complete.${selectedTarget}`,
        true,
      )
    }

    setSelectedQuestionIndex(selectedTarget)
  }

  return {
    selectedQuestionIndex,
    setSelectedQuestionIndex,
    handleClickQuestion,
  }
}

export default useHandleQuestion
