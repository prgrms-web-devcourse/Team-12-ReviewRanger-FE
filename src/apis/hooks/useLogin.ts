import { useMutation } from '@tanstack/react-query'
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
}

const login = async (user: loginProps) => {
  return await apiClient.post<Response>('/login', user)
}

const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: ({ data }) => {
      localStorage.setItem(TOKEN_KEY, data.data.accessToken)
    },
  })
}

export default useLogin
