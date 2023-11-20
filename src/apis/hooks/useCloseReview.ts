import { useMutation } from '@tanstack/react-query'
import apiClient from '@/apis/apiClient'

interface Response {
  success: boolean
}

const useCloseSurvey = ({ id }: { id: string }) => {
  const closeSurvey = async () => {
    return await apiClient.post<Response>(`/reviews/${id}/close`)
  }

  return useMutation({ mutationFn: closeSurvey })
}
export default useCloseSurvey
