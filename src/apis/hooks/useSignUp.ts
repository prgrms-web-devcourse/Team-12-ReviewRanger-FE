import { useMutation } from '@tanstack/react-query'
import apiClient from '../apiClient'

interface User {
  email: string
  name: string
  password: string
}

interface SignUpSuccess {
  success: boolean
}

interface SignUpFail {
  status: string
  errorCode: string
  message: string
}

const useSignUp = () => {
  const signUp = async (user: User) => {
    return await apiClient.post<SignUpSuccess | SignUpFail>('/sign-up', user)
  }

  return useMutation({ mutationFn: signUp })
}

export default useSignUp
