import { useMutation } from '@tanstack/react-query'
import apiClient from '../apiClient'

interface createCheckDuplicatedEmailProps {
  email: string
}

const useCreateCheckDuplicatedEmail = () => {
  const createCheckDuplicatedEmail = async (
    email: createCheckDuplicatedEmailProps,
  ) => {
    return await apiClient.post('/members/check-email', email)
  }

  return useMutation({
    mutationFn: createCheckDuplicatedEmail,
  })
}

export default useCreateCheckDuplicatedEmail
