import { useMutation } from '@tanstack/react-query'
import apiClient from '@/apis/apiClient'

const cleanSubjectiveResponse = async ({
  responserList,
}: {
  responserList: string[]
}) => {
  const response = await apiClient.post<{ afterResponse: string }>(
    '/replies/clean',
    {
      replies: responserList,
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
