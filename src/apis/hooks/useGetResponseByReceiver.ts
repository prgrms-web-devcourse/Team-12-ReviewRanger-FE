import { useSuspenseQuery } from '@tanstack/react-query'
import apiClient from '@/apis/apiClient'

//NOTE - 수신자별 응답 결과 단일 조회

interface Response {
  success: boolean
  data: {
    receiver: Receiver
    replies: Reply[]
  }
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
  objectOptionId: string | null
  answerText: string | null
  rating: number | null
  hexastat: number | null
}

const useGetResponseByReceiver = ({ receiverId }: { receiverId: string }) => {
  const getAllQuestion = async () => {
    const response = await apiClient.get<Response>(
      `/participations/receiver/ ${receiverId}`,
    )

    return response.data
  }

  return useSuspenseQuery({
    queryKey: [`/participations/receiver/ ${receiverId}`],
    queryFn: getAllQuestion,
  })
}

export default useGetResponseByReceiver
