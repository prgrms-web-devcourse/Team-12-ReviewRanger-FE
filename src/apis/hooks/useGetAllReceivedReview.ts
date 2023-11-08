import { useQuery } from '@tanstack/react-query'
import apiClient from '../apiClient'

interface Review {
  id: number
  title: string
  createdAt: string
}

interface Response {
  data: Review[]
}

const useGetAllReceivedReview = () => {
  const getAllReceivedReview = async () => {
    const response = await apiClient.get<Response>('/received-reviews')

    return response.data
  }

  return useQuery({
    queryKey: ['/received-reviews'],
    queryFn: getAllReceivedReview,
  })
}

export default useGetAllReceivedReview
