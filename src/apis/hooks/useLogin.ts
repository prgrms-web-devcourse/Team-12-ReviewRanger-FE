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

  return useMutation({ mutationFn: login })
}

export default useLogin
