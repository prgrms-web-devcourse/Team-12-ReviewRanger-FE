import { useQueryClient, useMutation } from '@tanstack/react-query'
import apiClient from '@/apis/apiClient'

interface ReviewId {
  reviewId: string
}

const useSaveFinalResult = <T extends ReviewId>(finalResult: T) => {
  const queryClient = useQueryClient()
  const saveFinalResult = async () => {
    const response = await apiClient.post('/final-results', finalResult)

    return response.data
  }

  return useMutation({
    mutationFn: saveFinalResult,
    onMutate: async () => {
      const reviewId = finalResult.reviewId
      console.log(queryClient.getQueryData([`/final-results/82/status`]))
      console.log(
        queryClient.getQueryState([`/final-results${Number(reviewId)}/status`]),
      )
      queryClient.invalidateQueries({
        queryKey: [`/final-results/${reviewId}/status`],
      })
    },
    onSuccess: async () => {},
  })
}

export default useSaveFinalResult
