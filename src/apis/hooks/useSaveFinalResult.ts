import { useMutation } from '@tanstack/react-query'
import apiClient from '@/apis/apiClient'

const useSaveFinalResult = <T>(finalResult: T) => {
  const saveFinalResult = async () => {
    const response = await apiClient.post('/final-results', finalResult)

    return response.data
  }

  return useMutation({
    mutationFn: saveFinalResult,
  })
}

export default useSaveFinalResult
