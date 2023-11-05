import { useQuery } from '@tanstack/react-query'
import apiClient from '../apiClient'

interface Data {
  surveyId: number
  title: string
  deadlineStatus: string
  responserCount: number
  surveyType: string
  createdAt: string
}

interface Response {
  data: Data[]
}

const useGetCreatedReview = () => {
  const getCreatedReview = async () => {
    const response = await apiClient.get<Response>('/created-surveys')

    return response.data
  }

  return useQuery({
    queryKey: ['/created-surveys'],
    queryFn: getCreatedReview,
  })
}

export default useGetCreatedReview
