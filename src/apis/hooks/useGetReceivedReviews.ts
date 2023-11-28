import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { ReceivedReview } from '@/types'
import apiClient from '../apiClient'

interface ReceivedReviewResponse {
  success: boolean
  data: {
    content: ReceivedReview[]
    last: boolean
  }
}

interface PageParam {
  pageParam: number | null
}

const getReceivedReview = async ({ pageParam }: PageParam) => {
  const response = await apiClient.get<ReceivedReviewResponse>(
    '/final-results',
    {
      params: { cursorId: pageParam, size: 12 },
    },
  )

  return response.data.data
}

const useGetReceivedReviews = () => {
  return useSuspenseInfiniteQuery({
    queryKey: ['reviews', '/final-results'],
    queryFn: ({ pageParam }) => getReceivedReview({ pageParam }),
    initialPageParam: null as number | null,
    getNextPageParam: (lastPage) => {
      const { last, content } = lastPage

      if (last || content.length === 0) {
        return undefined
      }

      return content[content.length - 1].id
    },
    refetchOnWindowFocus: false,
    refetchInterval: 5000,
    refetchIntervalInBackground: false,
  })
}

export default useGetReceivedReviews
