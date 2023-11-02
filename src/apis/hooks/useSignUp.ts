import { useMutation } from '@tanstack/react-query'
import apiClient from '../apiClient'

interface signUpProps {
  email: string
  name: string
  password: string
}

const useSignUp = () => {
  const signUp = async (user: signUpProps) => {
    return await apiClient.post('/sign-up', user)
  }

  return useMutation({ mutationFn: signUp })
}

export default useSignUp
