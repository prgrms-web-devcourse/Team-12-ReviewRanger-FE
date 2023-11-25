import { useMutation } from '@tanstack/react-query'
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
  return useMutation({
    mutationFn: updateFinalReviewResult,
  })
}

export default useUpdateFinalReviewAnswer
