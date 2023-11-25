import { QueryClient, useMutation } from '@tanstack/react-query'
import apiClient from '@/apis/apiClient'

interface ReviewId {
  reviewId: string
}

const useSaveFinalResult = <T extends ReviewId>(finalResult: T) => {
  const queryClient = new QueryClient()
  const saveFinalResult = async () => {
    const response = await apiClient.post('/final-results', finalResult)

    return response.data
  }

  return useMutation({
    mutationFn: saveFinalResult,
    onSuccess: () => {
      const reviewId = finalResult.reviewId
      queryClient.invalidateQueries({
        queryKey: [`/final-results/${reviewId}/status`],
      })
    },
  })
}

export default useSaveFinalResult
