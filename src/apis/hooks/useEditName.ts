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

const useEditName = () => {
  const editName = async ({ name }: { name: string }) => {
    return await apiClient.patch<ResponseSuccess | ResponseFail>(
      '/members/profile-name',
      { name },
    )
  }

  return useMutation({ mutationFn: editName })
}

export default useEditName
