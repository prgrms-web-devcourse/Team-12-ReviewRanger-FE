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

export interface User {
  id: number
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
  const getResponse = async () => {
    const singleAuthorResponse = await apiClient.get<Response>(
      `/reviews/${reviewId}/responser/${responserId}/participation`,
    )

    return singleAuthorResponse.data.data
  }

  return useSuspenseQuery({
    queryKey: [`/reviews/${reviewId}/responser/${responserId}/participation`],
    queryFn: getResponse,
  })
}
export default useGetResponseByResponser
