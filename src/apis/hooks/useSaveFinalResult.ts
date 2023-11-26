import { useQueryClient, useMutation } from '@tanstack/react-query'
import apiClient from '@/apis/apiClient'

interface ReviewId {
  reviewId: string
  userId: string
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
      const userId = finalResult.userId

      const prevSnapShot = queryClient.getQueryData<{
        success: boolean
        data: number[]
      }>([`/final-results/${reviewId}/status`])

      if (prevSnapShot?.success && prevSnapShot?.data) {
        queryClient.setQueryData([`/final-results/${reviewId}/status`], {
          success: prevSnapShot?.success,
          data: [...new Set([...prevSnapShot.data, Number(userId)])],
        })
      }
    },
    onSuccess: async () => {
      const reviewId = finalResult.reviewId
      queryClient.invalidateQueries({
        queryKey: [`/final-results/${reviewId}/status`],
      })
    },
  })
}

export default useSaveFinalResult
