import { useMutation } from '@tanstack/react-query'
import apiClient from '../apiClient'

interface EditImage {
  success: boolean
}

const useEditImage = () => {
  const editPassword = async ({ image }: { image: File }) => {
    return await apiClient.put<EditImage>(
      '/members/profile-image',
      {
        image,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )
  }

  return useMutation({ mutationFn: editPassword })
}

export default useEditImage
