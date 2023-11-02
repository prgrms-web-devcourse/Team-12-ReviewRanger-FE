//NOTE - 수신자별 응답 결과 전체 조회
import { useQuery } from '@tanstack/react-query'
import apiClient from '@/apis/apiClient'

interface Response {
  recipientList: Recipient[]
}

export interface Recipient {
  surveyResultId: number
  // TODO: 통일 필요함
  id: number
  name: string
  recipientId: number
  recipientName: string
  responserCount: number
}

const useGetRecipientResponse = ({ surveyId }: { surveyId: string }) => {
  const getResponseByRecipient = async () => {
    const response = await apiClient.get<Response>(
      `/surveys/${surveyId}/recipient`,
    )

    return response.data
  }

  return useQuery({
    queryKey: [`/surveys/${surveyId}/recipient`],
    queryFn: getResponseByRecipient,
  })
}

export default useGetRecipientResponse
