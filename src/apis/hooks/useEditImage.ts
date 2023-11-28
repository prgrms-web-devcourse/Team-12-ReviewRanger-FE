import { useMutation } from '@tanstack/react-query'
import apiClient from '../apiClient'

interface EditImage {
  success: boolean
}

const editImage = async ({ image }: { image: FormData }) => {
  return await apiClient.put<EditImage>('/members/profile-image', image, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

const useEditImage = () => useMutation({ mutationFn: editImage })

export default useEditImage
