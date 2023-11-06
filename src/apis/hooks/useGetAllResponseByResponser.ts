//NOTE - 작성자별 응답 결과 전체조회
import { useQuery } from '@tanstack/react-query'
import apiClient from '@/apis/apiClient'

interface Response {
  surveyId: string
  title: string
  responserCount: number
  surveyType:
    | 'subjective'
    | 'objective_unique'
    | 'objective_duplicate'
    | 'rating'
    | 'dropdown'
    | 'hexastat'

  responsers: Responser[]
}

export interface Responser {
  surveyResultId: number
  // TODO: 통일 필요함
  id: number
  name: string
  responserId: number
  responserName: string
  updatedAt: string
}

const useGetAllResponseByResponser = ({ surveyId }: { surveyId: string }) => {
  const getResponseByAuthor = async () => {
    const response = await apiClient.get<Response>(
      `/surveys/${surveyId}/responser`,
    )

    return response.data
  }

  return useQuery({
    queryKey: [`/surveys/${surveyId}/responser`],
    queryFn: getResponseByAuthor,
  })
}

export default useGetAllResponseByResponser
