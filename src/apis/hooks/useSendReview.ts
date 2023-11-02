import { useMutation } from '@tanstack/react-query'
import apiClient from '@/apis/apiClient'

interface Response {
  success: boolean
}

//NOTE - 대상자별 조합된 리뷰 결과를 저장
const useSendReview = () => {
  const sendReview = async ({
    surveyId,
    subjectIdList,
  }: {
    surveyId: number
    subjectIdList: number[]
  }) => {
    return await apiClient.post<Response>('/responses/combination', {
      surveyId,
      subjectIdList,
    })
  }

  return useMutation({ mutationFn: sendReview })
}
export default useSendReview
