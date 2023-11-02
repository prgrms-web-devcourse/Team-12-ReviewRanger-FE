import { useQuery } from '@tanstack/react-query'
import apiClient from '../apiClient'

const useGetCreatedReview = () => {
  const getCreatedReview = async () => {
    const response = await apiClient.get('/created-surveys')

    return response.data
  }

  return useQuery({
    queryKey: ['/created-surveys'],
    queryFn: getCreatedReview,
  })
}

export default useGetCreatedReview
