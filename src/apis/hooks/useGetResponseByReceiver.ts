import { useQuery } from '@tanstack/react-query'
import apiClient from '@/apis/apiClient'

//NOTE - 수신자별 응답 결과 단일 조회

//NOTE - 응답에 관한 필드
interface Question {
  id: string
  title: string
}

interface AllReply {
  subject_id: string
  question_id: string
  replies: Reply[]
}

interface Reply {
  id: string
  responser_id: string
  questionId: string
  objectOptionId: null | string
  answerText: null | string
  rating: null | number
}
const useGetResponseByReceiver = ({
  surveyResultId,
  recipientId,
}: {
  surveyResultId: string
  recipientId: string
}) => {
  const getAllQuestion = async () => {
    const response = await apiClient.get<Question>(
      `/created-surveys/${surveyResultId}/recipient/${recipientId}`,
    )

    return response.data
  }

  const getAllReply = 

  return useQuery({
    queryKey: [`/created-surveys/${surveyResultId}/recipient/${recipientId}`],
    queryFn: getSingleRecipient,
  })
}

export default useGetResponseByReceiver
