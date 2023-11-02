//NOTE - 작성자별 응답 결과 단일 조회
import { useQuery } from '@tanstack/react-query'
import { get } from '@/apis/apiClient'

//FIXME - 타입 수정 될 여지 있음
interface Question {
  responserName: string
  title: string
  results: QuestionResult[]
}

interface QuestionResult {
  questionId: string
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
    queryKey: [`/surveys/${surveyResultId}/responser/${responserId}`],
    queryFn: () => getSingleAuthorResponse({ surveyResultId, responserId }),
  })
}
