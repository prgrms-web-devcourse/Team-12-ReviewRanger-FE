import { useState, MouseEvent } from 'react'
import { Question } from '@/types'

interface UseHandleQuestionProps {
  questions: Question[]
  selectedReceiverIndex: number
}

const useHandleQuestion = ({ questions }: UseHandleQuestionProps) => {
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number>(0)

  const handleClickQuestion = (e: MouseEvent<HTMLLIElement>) => {
    const selectedTarget = questions.findIndex(
      (question) => question.id === e.currentTarget.value,
    )
    setSelectedQuestionIndex(selectedTarget)
  }

  return {
    selectedQuestionIndex,
    setSelectedQuestionIndex,
    handleClickQuestion,
  }
}

export default useHandleQuestion
