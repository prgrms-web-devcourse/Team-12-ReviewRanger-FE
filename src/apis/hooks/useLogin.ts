import { useMutation } from '@tanstack/react-query'
import apiClient from '../apiClient'

interface loginProps {
  email: string
  password: string
}

const useLogin = () => {
  const login = async (user: loginProps) => {
    return await apiClient.post('/login', user)
  }

  return useMutation({
    mutationFn: login,
    onSuccess: () => console.log('로그인 성공'),
  })
}

export default useLogin
