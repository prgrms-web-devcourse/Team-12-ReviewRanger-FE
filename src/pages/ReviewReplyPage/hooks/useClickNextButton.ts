import { Dispatch, SetStateAction } from 'react'
import { Question, Receiver } from '@/apis/hooks/useGetReviewFirst'

interface UseClickNextButtonProps {
  questions: Question[]
  receivers: Receiver[]
  selectedQuestionIndex: number
  selectedReceiverIndex: number
  setSelectedReceiver: Dispatch<SetStateAction<Receiver>>
  setSelectedQuestionIndex: Dispatch<SetStateAction<number>>
  setSelectedReceiverIndex: Dispatch<SetStateAction<number>>
}

const useClickNextButton = ({
  questions,
  receivers,
  selectedQuestionIndex,
  selectedReceiverIndex,
  setSelectedQuestionIndex,
  setSelectedReceiver,
  setSelectedReceiverIndex,
}: UseClickNextButtonProps) => {
  const handleClickNextButton = () => {
    if (selectedQuestionIndex < questions.length - 1) {
      setSelectedQuestionIndex((prevQuestion) => prevQuestion + 1)

      return
    }

    if (selectedReceiverIndex < receivers.length - 1) {
      const nextReceiver = receivers.find(
        (_, index) => index === selectedReceiverIndex + 1,
      )

      if (!nextReceiver) {
        return
      }

      setSelectedReceiver(nextReceiver)
      setSelectedReceiverIndex((prevReceiver) => prevReceiver + 1)
    } else {
      const firstReceiver = receivers[0]

      setSelectedReceiver(firstReceiver)
      setSelectedReceiverIndex(0)
    }
    setSelectedQuestionIndex(0)
  }

  return { handleClickNextButton }
}

export default useClickNextButton
