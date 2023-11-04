import { useSuspenseQuery } from '@tanstack/react-query'
import { ReceivedReview } from '@/types'
import apiClient from '../apiClient'

const useGetReceivedReview = () => {
  const getReceivedReview = async () => {
    const response = await apiClient.get<ReceivedReview[]>('/received-reviews')

    return response.data
  }

  return useSuspenseQuery({
    queryKey: ['/received-reviews'],
    queryFn: getReceivedReview,
  })
}

export default useGetReceivedReview
