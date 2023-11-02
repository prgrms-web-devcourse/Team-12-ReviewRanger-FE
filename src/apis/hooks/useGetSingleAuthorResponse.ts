//NOTE - 작성자별 응답 결과 단일 조회
import { useQuery } from '@tanstack/react-query'
import { get } from '@/apis/apiClient'

interface Review {
  title: string
  description: string
  responserId: number
  responserName: string
  questions: ReviewQuestion[]
  results: ReviewResult[]
}

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

interface ReviewResult {
  subjectId: number
  subjectName: string
  answers: ReviewAnswer[]
}

interface ReviewAnswer {
  answerId: number
  questionId: number
  answer: number | string
}

const useGetSingleAuthorResponse = ({
  surveyResultId,
  responserId,
}: {
  surveyResultId: string
  responserId: string
}) => {
  const getSingleAuthorResponse = async ({
    surveyResultId,
    responserId,
  }: {
    surveyResultId: string
    responserId: string
  }) => {
    const singleAuthorResponse = await get<Review>(
      `/surveys/${surveyResultId}/reonponser/${responserId}`,
    )

    return singleAuthorResponse.data
  }

  return useQuery({
    queryKey: [`/surveys/${surveyResultId}/responser/${responserId}`],
    queryFn: () => getSingleAuthorResponse({ surveyResultId, responserId }),
  })
}
export default useGetSingleAuthorResponse
