import { useQuery } from '@tanstack/react-query'
import apiClient from '../apiClient'

const useGetReceivedReview = () => {
  const getReceivedReview = async () => {
    const response = await apiClient.get('/received-reviews')

    return response.data
  }

  return useQuery({
    queryKey: ['/received-reviews'],
    queryFn: getReceivedReview,
  })
}

export default useGetReceivedReview
