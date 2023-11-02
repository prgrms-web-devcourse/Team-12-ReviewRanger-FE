import { useMutation } from '@tanstack/react-query'
import apiClient from '../apiClient'

interface createLoginProps {
  email: string
  password: string
}

const useCreateLogin = () => {
  const createLogin = async (user: createLoginProps) => {
    return await apiClient.post('/login', user)
  }

  return useMutation({
    mutationFn: createLogin,
    onSuccess: () => console.log('로그인 성공'),
  })
}

export default useCreateLogin
