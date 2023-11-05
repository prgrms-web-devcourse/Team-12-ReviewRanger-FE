import { useQuery } from '@tanstack/react-query'
import apiClient from '@/apis/apiClient'

//NOTE - 수신자별 응답 결과 단일 조회

//NOTE - 응답에 관한 필드
interface ReplyAnswer {
  responserId: number
  responserName: string
  responseId: string
  answer: number | string | string[] | Record<string, number>
}

interface ReplyResult {
  questionType:
    | 'subjective'
    | 'objective_unique'
    | 'objective_duplicate'
    | 'rating'
    | 'dropdown'
    | 'hexastat'
  questionTitle: string
  questionId: string
  answers: ReplyAnswer[]
}

export interface Response {
  subjectName: string
  surveyTitle: string
  subjectResults: ReplyResult
}

const useGetSingleRecipientResponse = ({
  surveyResultId,
  recipientId,
}: {
  surveyResultId: string
  recipientId: string
}) => {
  const getSingleRecipient = async () => {
    const response = await apiClient.get<Response>(
      `/surveys/${surveyResultId}/recipient/${recipientId}`,
    )

    return response.data
  }

  return useQuery({
    queryKey: [`/surveys/${surveyResultId}/recipient/${recipientId}`],
    queryFn: getSingleRecipient,
  })
}

export default useGetSingleRecipientResponse
