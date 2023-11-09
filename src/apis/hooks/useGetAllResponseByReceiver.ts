//NOTE - 수신자별 응답 결과 전체 조회
import { useQuery } from '@tanstack/react-query'
import apiClient from '@/apis/apiClient'

export interface ResponseByReceiver {
  success?: boolean
  data: {
    receiverResponses: Receiver[]
  }
}

interface Receiver {
  id: number
  name: string
  receiverId: string
  receiverName: string
  responserCount: number
  responserIds: string[]
}

const useGetAllResponseByReceiver = ({ surveyId }: { surveyId: string }) => {
  const getResponseByRecipient = async () => {
    const response = await apiClient.get<ResponseByReceiver>(
      `/reviews/${surveyId}/receiver`,
    )

    return response.data
  }

  return useQuery({
    queryKey: [`/reviews/${surveyId}/receiver`],
    queryFn: getResponseByRecipient,
  })
}

export default useGetAllResponseByReceiver
