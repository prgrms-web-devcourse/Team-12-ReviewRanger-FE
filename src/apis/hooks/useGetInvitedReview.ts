import { useQuery } from '@tanstack/react-query'
import apiClient from '../apiClient'

interface Responser {
  responserId: number
  responserName: string
}

interface Question {
  questionId: number
  questionTitle: string
  questionType: string
  isRequired: boolean
  options: string[]
}

interface Response {
  title: string
  description: string
  responsers: Responser[]
  questions: Question[]
}

const useGetInvitedReview = (reviewId: number) => {
  const getInvitedReview = async () => {
    const response = await apiClient.get<Response>(
      `/invited-surveys/${reviewId}`,
    )

    return response.data
  }

  return useQuery({
    queryKey: ['/invited-surveys/${reviewId}'],
    queryFn: getInvitedReview,
  })
}

export default useGetInvitedReview
