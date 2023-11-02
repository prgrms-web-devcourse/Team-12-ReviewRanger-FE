import { useQuery } from '@tanstack/react-query'
import apiClient from '../apiClient'

const useGetAllUser = () => {
  const getAllUser = async () => {
    const response = await apiClient.get('/members')

    return response.data
  }

  return useQuery({
    queryKey: ['/members'],
    queryFn: getAllUser,
  })
}

export default useGetAllUser
