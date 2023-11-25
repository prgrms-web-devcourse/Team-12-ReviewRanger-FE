import { useSuspenseQuery } from '@tanstack/react-query'
import apiClient from '@/apis/apiClient'

//NOTE - 수신자별 응답 결과 단일 조회

export interface Response {
  success: boolean
  data: Data[]
}

interface Data {
  id: string
  receiver: Receiver
  responser: Receiver
  participationId: string
  replies: Reply[]
}

interface Receiver {
  id: string
  name: string
  email: string
  createdAt: string
  updatedAt: string
}

interface Reply {
  id: string
  questionId: string
  //TODO - 몇명의 피어가 답변했는지를 이 responser로 판별해야함
  //TODO - 모든 replies의 responser를 뽑아와야 함
  responser: Receiver

  //TODO - 실제 대답한 객관식 답변의 ID,내용
  answerChoice: QuestionOption | null
  answerText: string | null
  answerRating: number | null
  answerHexa: number | null
}

//NOTE - 객관식 대답에 대한 필드
interface QuestionOption {
  optionId: string
  optionName: string
}

const useGetResponseByReceiver = ({
  receiverId,
  reviewId,
}: {
  reviewId: string
  receiverId: string
}) => {
  const getAllQuestion = async () => {
    const response = await apiClient.get<Response>(
      `/reviews/${reviewId}/receiver/${receiverId}`,
    )

    return response.data
  }

  return useSuspenseQuery({
    queryKey: [`/reviews/${reviewId}/receiver/${receiverId}`],
    queryFn: getAllQuestion,
  })
}

export default useGetResponseByReceiver
