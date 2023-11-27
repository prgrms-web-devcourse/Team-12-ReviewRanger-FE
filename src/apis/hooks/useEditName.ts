import { useMutation } from '@tanstack/react-query'
import apiClient from '../apiClient'

interface EditName {
  success: boolean
}

const useEditName = () => {
  const editName = async ({ name }: { name: string }) => {
    return await apiClient.patch<EditName>('/members/profile-name', {
      name,
    })
  }

  return useMutation({ mutationFn: editName })
}

export default useEditName
