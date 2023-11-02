//NOTE - 수신자별 응답 결과 전체 조회
import { useQuery } from '@tanstack/react-query'
import { get } from '@/apis/apiClient'

interface RecipientList {
  recipientList: Recipient[]
}

export interface Recipient {
  surveyResultId: number
  //통일 필요함
  id: number
  name: string
  recipientId: number
  recipientName: string
  responserCount: number
}

const useGetRecipientResponse = ({ surveyId }: { surveyId: string }) => {
  const getResponseByRecipient = async ({ surveyId }: { surveyId: string }) => {
    const response = await get<RecipientList>(`/surveys/${surveyId}/recipient`)

    return response.data
  }

  return useQuery({
    queryKey: [`/surveys/${surveyId}/recipient`],
    queryFn: () => getResponseByRecipient({ surveyId }),
  })
}

export default useGetRecipientResponse
