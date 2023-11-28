import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { InvitedReview } from '@/types'
import apiClient from '../apiClient'

interface InvitedReviewResponse {
  success: boolean
  data: {
    content: InvitedReview[]
    last: boolean
  }
}

interface PageParam {
  pageParam: number | null
}

const getInvitedReview = async ({ pageParam }: PageParam) => {
  const response = await apiClient.get<InvitedReviewResponse>(
    '/participation',
    {
      params: { cursorId: pageParam, size: 12 },
    },
  )

  return response.data.data
}

const useGetInvitedReviews = () => {
  return useSuspenseInfiniteQuery({
    queryKey: ['reviews', '/participation'],
    queryFn: ({ pageParam }) => getInvitedReview({ pageParam }),
    initialPageParam: null as number | null,
    getNextPageParam: (lastPage) => {
      const { last, content } = lastPage

      if (last || content.length === 0) {
        return undefined
      }

      return content[content.length - 1].participationId
    },
    refetchOnWindowFocus: false,
    refetchInterval: 5000,
    refetchIntervalInBackground: false,
  })
}

export default useGetInvitedReviews
