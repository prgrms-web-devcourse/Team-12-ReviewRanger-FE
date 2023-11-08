import { useMutation } from '@tanstack/react-query'
import apiClient from '../apiClient'

interface Name {
  name: string
}

interface Response {
  status?: string
  errorCode?: string
  message?: string
  success?: boolean
}

const useEditName = () => {
  const editName = async (name: Name) => {
    return await apiClient.patch<Response>('/members/profile-name', name)
  }

  return useMutation({ mutationFn: editName })
}

export default useEditName
