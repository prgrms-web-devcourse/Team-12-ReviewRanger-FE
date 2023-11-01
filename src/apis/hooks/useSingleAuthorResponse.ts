import { useQuery } from '@tanstack/react-query'
import { get } from '@/apis/apiClient'
//NOTE - 작성자별 응답 결과 단일 조회
interface Question {
  responserName: string
  title: string
  results: QuestionResult[]
}

interface QuestionResult {
  questionId: number
  questionTitle: string
  questionType:
    | 'multipleChoice'
    | 'singleChoice'
    | 'subjective'
    | 'dropdown'
    | 'starRating'
    | 'hexagon'
  questionSequence: number
  answer: number | string | string[] | Record<string, number>
}

export const getSingleAuthorResponse = async ({
  surveyResultId,
  responserId,
}: {
  surveyResultId: string
  responserId: string
}) => {
  const singleAuthorResponse = await get<Question>(
    `/surveys/${surveyResultId}/reonponser/${responserId}`,
  )

  return singleAuthorResponse.data
}

export const useSingleAuthorResponse = ({
  surveyResultId,
  responserId,
}: {
  surveyResultId: string
  responserId: string
}) => {
  return useQuery({
    queryKey: ['작성자별응답결과단일조회', responserId, surveyResultId],
    queryFn: () => getSingleAuthorResponse({ surveyResultId, responserId }),
  })
}
