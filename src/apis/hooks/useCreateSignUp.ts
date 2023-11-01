import { useMutation } from '@tanstack/react-query'
import apiClient from '../apiClient'

interface userType {
  email: string
  name: string
  password: string
}

const useCreateSignUp = () => {
  const createSignUp = async (user: userType) => {
    return await apiClient.post('/sign-up', user)
  }

  return useMutation({
    mutationFn: createSignUp,
    onSuccess: () => console.log('회원가입 성공!'),
  })
}

export default useCreateSignUp
