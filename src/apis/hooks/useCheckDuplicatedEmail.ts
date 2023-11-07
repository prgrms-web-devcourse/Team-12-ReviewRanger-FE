import { useMutation } from '@tanstack/react-query'
import apiClient from '../apiClient'

interface Email {
  email: string
}

interface Response {
  success: boolean
}

const useCheckDuplicatedEmail = () => {
  const checkDuplicatedEmail = async (email: Email) => {
    return await apiClient.post<Response>('/members/check-email', email)
  }

  return useMutation({ mutationFn: checkDuplicatedEmail })
}

export default useCheckDuplicatedEmail
