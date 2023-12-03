import { useMutation } from '@tanstack/react-query'
import apiClient from '../apiClient'

interface User {
  email: string
  name: string
  password: string
}

interface SignUp {
  success: boolean
}

const useSignUp = () => {
  const signUp = async (user: User) => {
    return await apiClient.post<SignUp>('/sign-up', user)
  }

  return useMutation({ mutationFn: signUp })
}

export default useSignUp
