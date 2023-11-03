import { useMutation } from '@tanstack/react-query'
import apiClient from '../apiClient'

interface loginProps {
  email: string
  password: string
}

interface Response {
  token: string
}

const useLogin = () => {
  const login = async (user: loginProps) => {
    return await apiClient.post<Response>('/login', user)
  }

  return useMutation({ mutationFn: login })
}

export default useLogin
