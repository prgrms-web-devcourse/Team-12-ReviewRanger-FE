//NOTE - 작성자별 응답 결과 단일 조회
import { useSuspenseQuery } from '@tanstack/react-query'
import apiClient from '@/apis/apiClient'
import { Response } from './useGetResponseByReceiver'

//NOTE - 참여 ID
const useGetResponseByResponser = ({
  responserId,
  reviewId,
}: {
  responserId: string
  reviewId: string
}) => {
  const getSingleAuthorResponse = async () => {
    const singleAuthorResponse = await apiClient.get<Response>(
      `/reviews/${reviewId}/responser/${responserId}/creator`,
    )

    return singleAuthorResponse.data
  }

  return useSuspenseQuery({
    queryKey: [`/reviews/${reviewId}/responser/${responserId}/creator`],
    queryFn: getSingleAuthorResponse,
  })
}
export default useGetResponseByResponser
