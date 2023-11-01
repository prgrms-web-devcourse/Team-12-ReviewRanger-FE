//NOTE - 작성자별 응답 결과 전체조회
import { useQuery } from '@tanstack/react-query'
import { get } from '@/apis/apiClient'

interface AuthorResponse {
  surveyId: string
  title: string
  responserCount: number
  surveyType: string
  responsers: Responser[]
}

export interface Responser {
  surveyResultId: number
  //통일 필요함
  id: number
  name: string
  responserId: number
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
    queryKey: [`/surveys/${surveyId}/responser`],
    queryFn: () => getResponseByAuthor({ surveyId }),
  })
}
