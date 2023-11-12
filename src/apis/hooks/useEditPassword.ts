import { useMutation } from '@tanstack/react-query'
import apiClient from '../apiClient'

interface ResponseSuccess {
  success: boolean
}

interface ResponseFail {
  status: string
  errorCode: string
  message: string
}

const useEditPassword = () => {
  const editPassword = async ({ password }: { password: string }) => {
    return await apiClient.patch<ResponseSuccess | ResponseFail>(
      '/members/profile-password',
      password,
    )
  }

  return useMutation({ mutationFn: editPassword })
}

export default useEditPassword