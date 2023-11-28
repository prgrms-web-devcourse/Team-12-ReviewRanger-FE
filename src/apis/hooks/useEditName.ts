import { useMutation } from '@tanstack/react-query'
import apiClient from '../apiClient'

interface EditName {
  success: boolean
}

const editName = async ({ name }: { name: string }) => {
  return await apiClient.patch<EditName>('/members/profile-name', {
    name,
  })
}

const useEditName = () => useMutation({ mutationFn: editName })

export default useEditName
