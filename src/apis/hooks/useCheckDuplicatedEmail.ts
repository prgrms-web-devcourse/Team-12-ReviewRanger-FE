import { useMutation } from '@tanstack/react-query'
import apiClient from '../apiClient'

interface checkDuplicatedEmailProps {
  email: string
}

const useCheckDuplicatedEmail = () => {
  const checkDuplicatedEmail = async (email: checkDuplicatedEmailProps) => {
    return await apiClient.post('/members/check-email', email)
  }

  return useMutation({ mutationFn: checkDuplicatedEmail })
}

export default useCheckDuplicatedEmail
