import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { CreatedReview } from '@/types'
import apiClient from '../apiClient'

interface CreatedReviewResponse {
  success: boolean
  data: {
    content: CreatedReview[]
    last: boolean
  }
}

interface PageParam {
  pageParam: number | null
}

const getCreatedReview = async ({ pageParam }: PageParam) => {
  const response = await apiClient.get<CreatedReviewResponse>('/reviews', {
    params: { cursorId: pageParam, size: 12 },
  })

  return response.data.data
}

const useGetCreatedReviews = () => {
  return useSuspenseInfiniteQuery({
    queryKey: ['reviews', '/reviews'],
    queryFn: ({ pageParam }) => getCreatedReview({ pageParam }),
    initialPageParam: null as number | null,
    getNextPageParam: (lastPage) => {
      const { last, content } = lastPage

      if (last || content.length === 0) {
        return undefined
      }

      return content[content.length - 1].reviewId
    },
    refetchOnWindowFocus: false,
    refetchInterval: 5000,
    refetchIntervalInBackground: false,
  })
}

export default useGetCreatedReviews
