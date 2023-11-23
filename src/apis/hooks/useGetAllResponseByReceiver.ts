//NOTE - 수신자별 응답 결과 전체 조회
import { useSuspenseQuery } from '@tanstack/react-query'
import apiClient from '@/apis/apiClient'

export interface Response {
  success?: boolean
  data: Receiver[]
}

interface Receiver {
  receiverId: string
  receiverName: string
  responserCount: number
}

const useGetAllResponseByReceiver = ({ reviewId }: { reviewId: string }) => {
  const getResponseByRecipient = async () => {
    const response = await apiClient.get<Response>(
      `/reviews/${reviewId}/receiver`,
    )

    return response.data
  }

  return useSuspenseQuery({
    queryKey: [`/reviews/${reviewId}/receiver`],
    queryFn: getResponseByRecipient,
  })
}

export default useGetAllResponseByReceiver
