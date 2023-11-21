import { useMutation } from '@tanstack/react-query'
import apiClient from '../apiClient'

interface EditNameSuccess {
  success: boolean
}

interface EditNameFail {
  status: string
  errorCode: string
  message: string
}

const useEditName = () => {
  const editName = async ({ name }: { name: string }) => {
    return await apiClient.patch<EditNameSuccess | EditNameFail>(
      '/members/profile-name',
      { name },
    )
  }

  return useMutation({ mutationFn: editName })
}

export default useEditName
