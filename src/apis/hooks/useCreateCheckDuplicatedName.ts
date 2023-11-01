import { useMutation } from '@tanstack/react-query'
import apiClient from '../apiClient'

interface createCheckDuplicatedNameProps {
  name: string
}

const useCreateCheckDuplicatedName = () => {
  const createCheckDuplicatedName = async (
    name: createCheckDuplicatedNameProps,
  ) => {
    return await apiClient.post('/members/check-name', name)
  }

  return useMutation({
    mutationFn: createCheckDuplicatedName,
  })
}

export default useCreateCheckDuplicatedName
