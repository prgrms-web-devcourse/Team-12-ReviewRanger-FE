import { useMutation } from '@tanstack/react-query'
import apiClient from '../apiClient'

interface checkDuplicatedNameProps {
  name: string
}

const useCheckDuplicatedName = () => {
  const checkDuplicatedName = async (name: checkDuplicatedNameProps) => {
    return await apiClient.post('/members/check-name', name)
  }

  return useMutation({ mutationFn: checkDuplicatedName })
}

export default useCheckDuplicatedName
