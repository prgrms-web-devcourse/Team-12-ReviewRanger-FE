//NOTE - 작성자별 응답 결과 전체조회
import { useSuspenseQuery } from '@tanstack/react-query'
import apiClient from '@/apis/apiClient'

export interface Response {
  success?: true
  data: Data[]
}

interface Data {
  id: string
  user: User
  //TODO - review필드 추가하기
  ReviewStatus: string
  isAnswered: boolean
  submitAt: string
  createdAt: string
  updatedAt: string
}

interface User {
  id: string
  name: string
  email: string
}

const useGetAllResponseByResponser = ({ surveyId }: { surveyId: string }) => {
  const getResponseByAuthor = async () => {
    const response = await apiClient.get<Response>(
      `/reviews/${surveyId}/responser`,
    )

    return response.data
  }

  return useSuspenseQuery({
    queryKey: [`/reviews/${surveyId}/responser`],
    queryFn: getResponseByAuthor,
  })
}

export default useGetAllResponseByResponser
