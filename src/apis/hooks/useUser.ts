import { useQuery } from '@tanstack/react-query'
import apiClient from '@/apis/apiClient'

interface User {
  success: boolean
  data: {
    id: string
    name: string
    email: string
  }
}

const useUser = () => {
  const getUser = async () => {
    const user = await apiClient.get<User>('/user')

    return user.data
  }

  return useQuery({
    queryKey: ['/user'],
    queryFn: getUser,
  })
}

export default useUser
