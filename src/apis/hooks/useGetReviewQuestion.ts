import { useSuspenseQuery } from '@tanstack/react-query'
import apiClient from '@/apis/apiClient'

interface Response {
  success: boolean
  data: Review
}

interface Review {
  id: string
  title: string
  description: string
  status: string
  questions: Question[]
}

interface Question {
  id: string
  title: string
  type:
    | 'MULTIPLE_CHOICE'
    | 'SINGLE_CHOICE'
    | 'SUBJECTIVE'
    | 'RATING'
    | 'DROPDOWN'
    | 'HEXASTAT'
  isRequired: boolean
  questionOptions: QuestionOption[]
}

interface QuestionOption {
  optionId: string
  optionName: string
}

const useGetReviewQuestion = ({ id }: { id: string }) => {
  const getReviewQuestion = async () => {
    const response = await apiClient.get<Response>(`/reviews/${id}`)

    return response.data
  }

  return useSuspenseQuery({
    queryKey: [`/reviews/${id}`],
    queryFn: getReviewQuestion,
  })
}

export default useGetReviewQuestion
