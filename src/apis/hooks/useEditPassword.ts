import { useMutation } from '@tanstack/react-query'
import apiClient from '../apiClient'

interface EditPassword {
  success: boolean
}

const useEditPassword = () => {
  const editPassword = async ({ password }: { password: string }) => {
    return await apiClient.patch<EditPassword>('/members/profile-password', {
      password,
    })
  }

  return useMutation({ mutationFn: editPassword })
}

export default useEditPassword
