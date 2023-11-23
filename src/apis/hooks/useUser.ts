import { useQuery } from '@tanstack/react-query'
import apiClient from '@/apis/apiClient'
import { TOKEN_KEY } from '@/constants'

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

    return user.data.data
  }

  return useQuery({
    queryKey: ['/user'],
    queryFn: getUser,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    enabled: !!localStorage.getItem(TOKEN_KEY),
  })
}

export default useUser
