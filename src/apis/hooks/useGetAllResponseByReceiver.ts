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

const useGetAllResponseByReceiver = ({ surveyId }: { surveyId: string }) => {
  const getResponseByRecipient = async () => {
    const response = await apiClient.get<Response>(
      `/reviews/${surveyId}/receiver`,
    )

    return response.data
  }

  return useSuspenseQuery({
    queryKey: [`/reviews/${surveyId}/receiver`],
    queryFn: getResponseByRecipient,
  })
}

export default useGetAllResponseByReceiver
