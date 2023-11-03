import { useMutation } from '@tanstack/react-query'
import apiClient from '../apiClient'

interface Profile {
  name: string
}

const useEditProfile = () => {
  const editProfile = async (name: Profile) => {
    return await apiClient.patch('/members/profile', name)
  }

  return useMutation({ mutationFn: editProfile })
}

export default useEditProfile
