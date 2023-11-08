import { useMutation } from '@tanstack/react-query'
import apiClient from '../apiClient'

interface Password {
  password: string
}

interface Response {
  success: boolean
}

const useEditPassword = () => {
  const editPassword = async (password: Password) => {
    return await apiClient.patch<Response>(
      '/members/profile-password',
      password,
    )
  }

  return useMutation({ mutationFn: editPassword })
}

export default useEditPassword
