import { useSuspenseQueries } from '@tanstack/react-query'
import apiClient from '../apiClient'

interface FinalResult {
  userId: number
  userName: string
  reviewId: number
  title: string
  description: string
  status: 'SENT' | 'NOT_SENT'
  createdAt: string
  updatedAt: string
}

interface FinalResultQna {
  questionId: number
  questionTitle: string
  answerIdList: number[]
}

interface TextResult extends FinalResultQna {
  finalQuestionType:
    | 'SINGLE_CHOICE'
    | 'MULTIPLE_CHOICE'
    | 'SUBJECTIVE'
    | 'DROPDOWN'
  answers: string[]
}

interface RatingResult extends FinalResultQna {
  finalQuestionType: 'RATING'
  answers: number[]
}

interface StatResult extends FinalResultQna {
  finalQuestionType: 'HEXASTAT'
  answers: {
    statName: string
    statScore: number
  }[]
}

interface Response {
  success: boolean
  data: FinalResult
}

interface ResponseQna {
  success: boolean
  data: TextResult[] | RatingResult[] | StatResult[]
}

const useGetReceivedReview = (reviewId: number) => {
  const getReviewResult = async () => {
    const response = await apiClient.get<Response>(`/final-results/${reviewId}`)

    return response.data.data
  }

  const getReviewQna = async () => {
    const response = await apiClient.get<ResponseQna>(
      `/final-results/${reviewId}/qna`,
    )

    return response.data.data
  }

  return useSuspenseQueries({
    queries: [
      { queryKey: ['/final-results/${reviewId}'], queryFn: getReviewResult },
      { queryKey: ['/final-results/${reviewId}/qna'], queryFn: getReviewQna },
    ],
  })
}

export default useGetReceivedReview
