import { useQuery } from '@tanstack/react-query'
import apiClient from '../apiClient'

const useGetReviewResult = (reviewId: number) => {
  const getReviewResult = async () => {
    const response = await apiClient.get(`/received-reviews/${reviewId}`)

    return response.data
  }

  return useQuery({
    queryKey: ['/received-reviews/${reviewId}'],
    queryFn: getReviewResult,
  })
}

export default useGetReviewResult
