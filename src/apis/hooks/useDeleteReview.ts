import { useMutation } from '@tanstack/react-query'
import apiClient from '@/apis/apiClient'

const useDeleteSurvey = () => {
  const deleteSurvey = async ({ surveyId }: { surveyId: string }) => {
    return await apiClient.delete(`/surveys/${surveyId}`)
  }

  return useMutation({ mutationFn: deleteSurvey })
}

export default useDeleteSurvey
