import { useQuery } from '@tanstack/react-query'
import apiClient from '../apiClient'

const useGetResponseForm = (reviewId: number) => {
  const getResponseForm = async () => {
    const response = await apiClient.get(`/invited-surveys/${reviewId}`)

    return response.data
  }

  return useQuery({
    queryKey: ['/invited-surveys/${reviewId}'],
    queryFn: getResponseForm,
  })
}

export default useGetResponseForm
