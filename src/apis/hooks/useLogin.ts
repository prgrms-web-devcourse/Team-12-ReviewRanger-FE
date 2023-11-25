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
  errorCode?: string
  message?: string
}

const useLogin = () => {
  const login = async (user: loginProps) => {
    return await apiClient.post<Response>('/login', user)
  }

  return useMutation({
    mutationFn: login,
    onSuccess: ({ data }) => {
      if (
        data.errorCode &&
        data.message &&
        data.message === 'Bad credentials'
      ) {
        throw new Error('아이디 또는 비밀번호가 잘못되었습니다')
      }
      if (data.errorCode) {
        throw new Error(data?.message)
      }
      localStorage.setItem(TOKEN_KEY, data.data.accessToken)
    },
  })
}

export default useLogin
