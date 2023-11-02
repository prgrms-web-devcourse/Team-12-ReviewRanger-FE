import { useMutation } from '@tanstack/react-query'
import { post } from '@/apis/apiClient'

interface SurveyCloseResponse {
  success: boolean
}

const usePostSurveyClose = ({ surveyId }: { surveyId: string }) => {
  const postSurveyClose = async () => {
    const surveyCloseResponse = await post<SurveyCloseResponse>(
      `/surveys/${surveyId}/closed`,
      {
        surveyId,
      },
    )

    return surveyCloseResponse.data
  }

  return useMutation({
    mutationKey: [`/surveys/${surveyId}/closed`],
    mutationFn: postSurveyClose,
  })
}
export default usePostSurveyClose
