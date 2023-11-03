import { useMutation } from '@tanstack/react-query'
import apiClient from '../apiClient'

interface Profile {
  name: string
}

interface Response {
  success: boolean
}

const useEditProfile = () => {
  const editProfile = async (name: Profile) => {
    return await apiClient.put<Response>('/members/profile', name)
  }

  return useMutation({ mutationFn: editProfile })
}

export default useEditProfile
