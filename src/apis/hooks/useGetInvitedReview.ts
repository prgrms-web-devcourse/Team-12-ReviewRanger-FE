import { useQuery } from '@tanstack/react-query'
import apiClient from '../apiClient'

const useGetInvitedReview = () => {
  const getInvitedReview = async () => {
    const response = await apiClient.get('/invited-surveys')

    return response.data
  }

  return useQuery({
    queryKey: ['/invited-surveys'],
    queryFn: getInvitedReview,
  })
}

export default useGetInvitedReview
