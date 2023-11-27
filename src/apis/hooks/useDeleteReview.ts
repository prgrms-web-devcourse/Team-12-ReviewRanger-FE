import { useMutation, useQueryClient } from '@tanstack/react-query'
import apiClient from '@/apis/apiClient'

const deleteReview = async ({ reviewId }: { reviewId: number }) => {
  return await apiClient.delete(`/reviews/${reviewId}`)
}

const useDeleteReview = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/reviews'] })
    },
  })
}

export default useDeleteReview
