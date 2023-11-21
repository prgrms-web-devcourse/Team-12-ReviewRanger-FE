import { useSuspenseQueries } from '@tanstack/react-query'
import { CreatedReview, InvitedReview, ReceivedReview } from '@/types'
import apiClient from '../apiClient'

interface InvitedReviewResponse {
  success: boolean
  data: {
    content: InvitedReview[]
    last: boolean
  }
}

interface CreatedReviewResponse {
  success: boolean
  data: {
    content: CreatedReview[]
    last: boolean
  }
}

interface ReceivedReviewResponse {
  success: boolean
  data: {
    content: ReceivedReview[]
    last: boolean
  }
}

const useGetAllReviews = () => {
  const getInvitedReview = async () => {
    const response =
      await apiClient.get<InvitedReviewResponse>('/participations')

    return response.data.data
  }

  const getCreatedReview = async () => {
    const response = await apiClient.get<CreatedReviewResponse>('/reviews')

    return response.data.data
  }

  const getReceivedReview = async () => {
    const response =
      await apiClient.get<ReceivedReviewResponse>('/final-results')

    return response.data.data
  }

  return useSuspenseQueries({
    queries: [
      { queryKey: ['/participations'], queryFn: getInvitedReview },
      { queryKey: ['/reviews'], queryFn: getCreatedReview },
      { queryKey: ['/final-results'], queryFn: getReceivedReview },
    ],
  })
}

export default useGetAllReviews
