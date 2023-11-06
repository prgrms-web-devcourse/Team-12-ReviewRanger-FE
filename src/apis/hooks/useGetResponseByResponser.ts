//NOTE - 작성자별 응답 결과 단일 조회
import { useQuery } from '@tanstack/react-query'
import apiClient from '@/apis/apiClient'

interface ReviewQuestion {
  questionId: number
  questionTitle: string
  questionType:
    | 'subjective'
    | 'objective_unique'
    | 'objective_duplicate'
    | 'rating'
    | 'dropdown'
    | 'hexastat'
  questionSequence: number
  isRequired: boolean
}

interface ReviewAnswer {
  answerId: number
  questionId: number
  answer: number | string
}

interface ReviewResult {
  subjectId: number
  subjectName: string
  answers: ReviewAnswer[]
}

interface Response {
  title: string
  description: string
  responserId: number
  responserName: string
  questions: ReviewQuestion[]
  results: ReviewResult[]
}

const useGetResponseByResponser = ({
  surveyResultId,
  responserId,
}: {
  surveyResultId: string
  responserId: string
}) => {
  const getSingleAuthorResponse = async () => {
    const singleAuthorResponse = await apiClient.get<Response>(
      `/surveys/${surveyResultId}/responser/${responserId}`,
    )

    return singleAuthorResponse.data
  }

  return useQuery({
    queryKey: [`/surveys/${surveyResultId}/responser/${responserId}`],
    queryFn: getSingleAuthorResponse,
  })
}
export default useGetResponseByResponser
