import { useMutation } from '@tanstack/react-query'
import apiClient from '@/apis/apiClient'

interface Response {
  success: boolean
}

const useCloseSurvey = () => {
  const closeSurvey = async ({ id }: { id: string }) => {
    return await apiClient.post<Response>(`/reviews/${id}/close`)
  }

  return useMutation({ mutationFn: closeSurvey })
}
export default useCloseSurvey
