import { useSuspenseQuery } from '@tanstack/react-query'
import { ReviewDetailed } from '@/types/reviewDetailed'
import apiClient from '../apiClient'

const useGetReviewForCreator = ({ id }: { id: number }) => {
  const getReview = async () => {
    const response = await apiClient.get<ReviewDetailed>(
      `/reviews/${id}/creator`,
    )

    return response.data.data
  }

  return useSuspenseQuery({
    queryKey: [`/reviews/${id}/creator`],
    queryFn: getReview,
  })
}

export default useGetReviewForCreator
