import { useQuery } from '@tanstack/react-query'
import apiClient from '../apiClient'

interface Review {
  id: number
  title: string
  status: '진행중' | '마감' | '종료'
  type: string
  isCompleted: boolean
  createdAt: string | null
}

interface Response {
  data: Review[]
}

const useGetAllInvitedReview = () => {
  const getAllInvitedReview = async () => {
    const response = await apiClient.get<Response>('/invited-surveys')

    return response.data
  }

  return useQuery({
    queryKey: ['/invited-surveys'],
    queryFn: getAllInvitedReview,
  })
}

export default useGetAllInvitedReview
