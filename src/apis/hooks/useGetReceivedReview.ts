import { useQuery } from '@tanstack/react-query'
import apiClient from '../apiClient'

interface Result {
  questionTitle: string
  questionType: string
  answers: string[]
}

interface Response {
  title: string
  name: string
  createdAt: string
  results: Result[]
}

const useGetReceivedReview = (reviewId: number) => {
  const getReviewResult = async () => {
    const response = await apiClient.get<Response>(`/final-results/${reviewId}`)

    return response.data
  }

  return useQuery({
    queryKey: ['/final-results/${reviewId}'],
    queryFn: getReviewResult,
  })
}

export default useGetReceivedReview
