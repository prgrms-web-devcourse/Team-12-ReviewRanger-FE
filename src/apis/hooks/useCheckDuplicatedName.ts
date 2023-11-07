import { useMutation } from '@tanstack/react-query'
import apiClient from '../apiClient'

interface Name {
  name: string
}

interface Response {
  success: boolean
}

const useCheckDuplicatedName = () => {
  const checkDuplicatedName = async (name: Name) => {
    return await apiClient.post<Response>('/members/check-name', name)
  }

  return useMutation({ mutationFn: checkDuplicatedName })
}

export default useCheckDuplicatedName
