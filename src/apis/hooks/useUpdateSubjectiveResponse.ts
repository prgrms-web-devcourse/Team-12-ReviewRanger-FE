import { useMutation } from '@tanstack/react-query'
import apiClient from '@/apis/apiClient'

const updateSubjectiveResponse = async ({
  userId,
  reviewId,
  answer,
  questionId,
}: {
  userId: string
  reviewId: string
  answer: string
  questionId: string
}) => {
  const response = await apiClient.patch<{ data: boolean }>('/final-results', {
    userId,
    reviewId,
    answer,
    questionId,
  })

  return response.data
}
const useUpdateSubjectiveResponse = () => {
  return useMutation({
    mutationFn: updateSubjectiveResponse,
  })
}

export default useUpdateSubjectiveResponse
