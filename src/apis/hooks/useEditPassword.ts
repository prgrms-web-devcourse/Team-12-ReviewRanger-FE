import { useMutation } from '@tanstack/react-query'
import apiClient from '../apiClient'

interface EditPasswordSuccess {
  success: boolean
}

interface EditPasswordFail {
  status: string
  errorCode: string
  message: string
}

const useEditPassword = () => {
  const editPassword = async ({ password }: { password: string }) => {
    return await apiClient.patch<EditPasswordSuccess | EditPasswordFail>(
      '/members/profile-password',
      { password },
    )
  }

  return useMutation({ mutationFn: editPassword })
}

export default useEditPassword
