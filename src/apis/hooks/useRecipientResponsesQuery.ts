//NOTE - 수신자별 응답 결과 전체 조회
import { useQuery } from '@tanstack/react-query'
import { get } from '@/apis/apiClient'

interface RecipientList {
  recipientList: Recipient[]
}

interface Recipient {
  surveyResultId: number
  id: number
  name: string
  responserCount: number
}

export const getResponseByRecipient = async ({
  surveyId,
}: {
  surveyId: string
}) => {
  const response = await get<RecipientList>(`/surveys/${surveyId}/recipient`)

  return response.data
}

export const useRecipientResponse = ({ surveyId }: { surveyId: string }) => {
  return useQuery({
    queryKey: ['수신자별응답전체조회', surveyId],
    queryFn: () => getResponseByRecipient({ surveyId }),
  })
}
