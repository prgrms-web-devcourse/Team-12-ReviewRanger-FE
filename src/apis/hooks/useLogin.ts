import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TOKEN_KEY } from '@/constants'
import apiClient from '../apiClient'

interface loginProps {
  email: string
  password: string
}

interface Response {
  success: boolean
  data: {
    accessToken: string
  }
  errorCode?: string
  message?: string
}

const login = async (user: loginProps) => {
  return await apiClient.post<Response>('/login', user)
}

const useLogin = () => {
  const queryClient = useQueryClient()

  if (queryClient.getQueryData(['/user'])) {
    queryClient.removeQueries({ queryKey: ['/user'] })
  }

  if (queryClient.getQueryData(['reviews'])) {
    queryClient.removeQueries({ queryKey: ['reviews'] })
  }

  return useMutation({
    mutationFn: login,
    onSuccess: ({ data }) => {
      if (data.errorCode) {
        throw new Error(data?.message)
      }
      localStorage.setItem(TOKEN_KEY, data.data.accessToken)
    },
  })
}

export default useLogin
