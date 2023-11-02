import { useQuery } from '@tanstack/react-query'
import { get } from '@/apis/apiClient'
//NOTE - 수신자별 응답 결과 단일 조회

export interface Reply {
  subjectName: string
  surveyTitle: string
  subjectResults: ReplyResult
}

interface ReplyResult {
  questionType:
    | 'multipleChoice'
    | 'singleChoice'
    | 'subjective'
    | 'dropdown'
    | 'starRating'
    | 'hexagon'
  questionTitle: string
  questionId: string
  answers: ReplyAnswer[]
}

//NOTE - 응답에 관한 필드
interface ReplyAnswer {
  responserId: number
  responserName: string
  responseId: string
  answer: number | string | string[] | Record<string, number>
}

const useGetSingleRecipientResponse = ({
  surveyResultId,
  recipientId,
}: {
  surveyResultId: string
  recipientId: string
}) => {
  const getSingleRecipient = async ({
    surveyResultId,
    recipientId,
  }: {
    surveyResultId: string
    recipientId: string
  }) => {
    const response = await get<Reply>(
      `/surveys/${surveyResultId}/recipient/${recipientId}`,
    )

    return response.data
  }

  return useQuery({
    queryKey: [`/surveys/${surveyResultId}/recipient/${recipientId}`],
    queryFn: () => getSingleRecipient({ surveyResultId, recipientId }),
  })
}

export default useGetSingleRecipientResponse
