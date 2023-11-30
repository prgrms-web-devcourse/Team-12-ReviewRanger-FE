import { useSuspenseQuery } from '@tanstack/react-query'
import apiClient from '../apiClient'

interface User {
  id: number
  name: string
}

interface Response {
  success: boolean
  data: User[]
}

const useGetAllUser = () => {
  const getAllUser = async () => {
    const response = await apiClient.get<Response>('/members')

    return response.data.data
  }

  return useSuspenseQuery({
    queryKey: ['/members'],
    queryFn: getAllUser,
    select: (response) => response.filter((user) => user.name !== 'admin'),
  })
}

export default useGetAllUser
