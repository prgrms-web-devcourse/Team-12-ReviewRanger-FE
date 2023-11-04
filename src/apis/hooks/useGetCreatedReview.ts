import { useSuspenseQuery } from '@tanstack/react-query'
import { CreatedReview } from '@/types'
import apiClient from '../apiClient'

const useGetCreatedReview = () => {
  const getCreatedReview = async () => {
    const response = await apiClient.get<CreatedReview[]>('/created-surveys')

    return response.data
  }

  return useSuspenseQuery({
    queryKey: ['/created-surveys'],
    queryFn: getCreatedReview,
  })
}

export default useGetCreatedReview
