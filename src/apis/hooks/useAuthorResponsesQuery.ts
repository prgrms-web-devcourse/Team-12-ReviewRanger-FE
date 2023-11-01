import { useQuery } from '@tanstack/react-query'
import { get } from '@/apis/apiClient'

interface AuthorResponse {
  surveyId: string
  title: string
  responserCount: number
  surveyType: string
  responsers: Responser[]
}

interface Responser {
  surveyResultId: string
  responserId: string
  responserName: string
  updatedAt: string
}

export const getResponseByAuthor = async ({
  surveyId,
}: {
  surveyId: string
}) => {
  const response = await get<AuthorResponse>(`/surveys/${surveyId}/responser`)

  return response.data
}

export const useAuthorResponse = ({ surveyId }: { surveyId: string }) => {
  return useQuery({
    queryKey: [surveyId],
    queryFn: () => getResponseByAuthor({ surveyId }),
  })
}
