import { useMutation } from '@tanstack/react-query'
import apiClient from '@/apis/apiClient'

const cleanSubjectiveResponse = async ({
  responseList,
}: {
  responseList: string[]
}) => {
  const response = await apiClient.post<{ afterResponse: string }>(
    '/replies/clean',
    {
      replies: responseList,
    },
  )

  return response
}

const useCleanSubjectiveResponse = () => {
  return useMutation({
    mutationFn: cleanSubjectiveResponse,
  })
}

export default useCleanSubjectiveResponse
