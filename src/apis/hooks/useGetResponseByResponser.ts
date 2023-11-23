//NOTE - 작성자별 응답 결과 단일 조회
import { useSuspenseQuery } from '@tanstack/react-query'
import apiClient from '@/apis/apiClient'

interface AnswerChoice {
  optionId: number
  optionName: string
}

interface Reply {
  id: number
  questionId: number
  answerText: string | null
  answerRating: number | null
  answerHexa: number | null
  answerChoice: AnswerChoice | null
}

interface User {
  id: number
  email: string
  name: string
}
interface Data {
  id: number
  participationId: number
  replies: Reply[]
  receiver: User
  responser: User
}

interface Response {
  success: boolean
  data: Data[]
}

const useGetResponseByResponser = ({
  reviewId,
  responserId,
}: {
  reviewId: number
  responserId: number
}) => {
  const getSingleAuthorResponse = async () => {
    const singleAuthorResponse = await apiClient.get<Response>(
      `/reviews/${reviewId}/responser/${responserId}`,
    )

    return singleAuthorResponse.data.data
  }

  return useSuspenseQuery({
    queryKey: [`/reviews/${reviewId}/responser/${responserId}`],
    queryFn: getSingleAuthorResponse,
  })
}
export default useGetResponseByResponser
