import { useMutation } from '@tanstack/react-query'
import { del } from '@/apis/apiClient'

const useDeleteSurvey = ({ surveyId }: { surveyId: string }) => {
  const deleteSurvey = async () => {
    const response = await del(`/surveys/${surveyId}`)

    return response.data
  }

  return useMutation({
    mutationKey: [`/surveys/${surveyId}`],
    mutationFn: deleteSurvey,
  })
}

export default useDeleteSurvey
