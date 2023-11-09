//NOTE - 작성자별 응답 결과 전체조회
import { useQuery } from '@tanstack/react-query'
import apiClient from '@/apis/apiClient'

export interface ResponseByResponser {
  success?: true
  data: {
    reviewId: string
    title: string
    responserCount: number
    responsers: Responser[]
  }
}

export interface Responser {
  participationId: string
  id: number
  name: string
  submitAt: string
}

const useGetAllResponseByResponser = ({ surveyId }: { surveyId: string }) => {
  const getResponseByAuthor = async () => {
    const response = await apiClient.get<ResponseByResponser>(
      `/reviews/${surveyId}/responser`,
    )

    return response.data
  }

  return useQuery({
    queryKey: [`/reviews/${surveyId}/responser`],
    queryFn: getResponseByAuthor,
  })
}

export default useGetAllResponseByResponser
