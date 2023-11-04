import { useSuspenseQuery } from '@tanstack/react-query'
import { InvitedReview } from '@/types'
import apiClient from '../apiClient'

const useGetInvitedReview = () => {
  const getInvitedReview = async () => {
    const response = await apiClient.get<InvitedReview[]>('/invited-surveys')

    return response.data
  }

  return useSuspenseQuery({
    queryKey: ['/invited-surveys'],
    queryFn: getInvitedReview,
  })
}

export default useGetInvitedReview
