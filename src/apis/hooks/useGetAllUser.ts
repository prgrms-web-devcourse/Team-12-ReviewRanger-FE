import { useQuery } from '@tanstack/react-query'
import apiClient from '../apiClient'

interface User {
  id: number
  name: string
}

interface Response {
  data: User[]
}

const useGetAllUser = () => {
  const getAllUser = async () => {
    const response = await apiClient.get<Response>('/members')

    return response.data
  }

  return useQuery({
    queryKey: ['/members'],
    queryFn: getAllUser,
  })
}

export default useGetAllUser
