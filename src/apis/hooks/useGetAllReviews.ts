import { useSuspenseQueries } from '@tanstack/react-query'
import { CreatedReview, InvitedReview, ReceivedReview } from '@/types'
import apiClient from '../apiClient'

const useGetAllReviews = () => {
  const getInvitedReview = async () => {
    const response = await apiClient.get<InvitedReview[]>('/invited-surveys')

    return response.data
  }

  const getCreatedReview = async () => {
    const response = await apiClient.get<CreatedReview[]>('/created-surveys')

    return response.data
  }

  const getReceivedReview = async () => {
    const response = await apiClient.get<ReceivedReview[]>('/received-reviews')

    return response.data
  }

  return useSuspenseQueries({
    queries: [
      { queryKey: ['/created-surveys'], queryFn: getInvitedReview },
      { queryKey: ['/received-reviews'], queryFn: getCreatedReview },
      { queryKey: ['/invited-surveys'], queryFn: getReceivedReview },
    ],
  })
}

export default useGetAllReviews
