import { useQuery } from '@tanstack/react-query'
import apiClient from '@/apis/apiClient'

interface User {
  id: string
  email: string
  name: string
}

const useUser = () => {
  const getUser = async () => {
    const user = await apiClient.get<User>('/user')

    return user.data
  }

  return useQuery({
    queryKey: ['/user'],
    queryFn: getUser,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  })
}

export default useUser
