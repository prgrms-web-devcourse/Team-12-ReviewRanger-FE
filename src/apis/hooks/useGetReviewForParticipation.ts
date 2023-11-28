import { useSuspenseQuery } from '@tanstack/react-query'
import { ReviewDetailed } from '@/types/reviewDetailed'
import apiClient from '../apiClient'

const useGetReviewForParticipation = ({ id }: { id: number }) => {
  const getReview = async () => {
    const response = await apiClient.get<ReviewDetailed>(
      `/reviews/${id}/participation`,
    )

    return response.data.data
  }

  return useSuspenseQuery({
    queryKey: [`/reviews/${id}/participation`],
    queryFn: getReview,
  })
}

export default useGetReviewForParticipation
