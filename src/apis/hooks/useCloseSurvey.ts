import { useMutation } from '@tanstack/react-query'
import apiClient from '@/apis/apiClient'

interface Response {
  success: boolean
}

const useCloseSurvey = () => {
  const closeSurvey = async ({ surveyId }: { surveyId: string }) => {
    return await apiClient.post<Response>(`/surveys/${surveyId}/closed`, {
      surveyId,
    })
  }

  return useMutation({ mutationFn: closeSurvey })
}
export default useCloseSurvey
