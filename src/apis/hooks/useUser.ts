import { useSuspenseQuery } from '@tanstack/react-query'
import apiClient from '@/apis/apiClient'

export interface User {
  success: boolean
  data: {
    id: number
    email: string
    name: string
  }
}

const useUser = () => {
  const getUser = async () => {
    const user = await apiClient.get<User>('/user')

    return user.data
  }

  return useSuspenseQuery({
    queryKey: ['/user'],
    queryFn: getUser,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  })
}

export default useUser
