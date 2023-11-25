import { useMutation } from '@tanstack/react-query'
import { useToast } from '@/hooks'
import apiClient from '@/apis/apiClient'

interface updatedReviewAnswer {
  userId: string
  reviewId: string
  questionId: string
  answer: string
}

const updateFinalReviewResult = async ({
  userId,
  reviewId,
  questionId,
  answer,
}: updatedReviewAnswer) => {
  const response = await apiClient.patch<{ success: boolean }>(
    '/final-results',
    {
      userId,
      reviewId,
      questionId,
      answer,
    },
  )

  return response.data
}

const useUpdateFinalReviewAnswer = () => {
  const { addToast } = useToast()

  return useMutation({
    mutationFn: updateFinalReviewResult,
    onSuccess: ({ success }) => {
      if (success) {
        addToast({ message: '성공적으로 저장되었습니다!', type: 'success' })
      }
    },
  })
}

export default useUpdateFinalReviewAnswer
