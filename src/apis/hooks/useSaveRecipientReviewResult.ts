import { useMutation } from '@tanstack/react-query'
import { post } from '@/apis/apiClient'
//NOTE - 대상자별 조합된 리뷰 결과를 저장
const useSaveRecipientReviewResult = () => {
  const postSaveRecipientReview = async ({
    surveyId,
    subjectIdList,
  }: {
    surveyId: number
    subjectIdList: number[]
  }) => {
    const response = await post<{ success: boolean }>(
      '/responses/combination',
      {
        surveyId,
        subjectIdList,
      },
    )

    return response.data
  }

  return useMutation({
    mutationFn: postSaveRecipientReview,
  })
}
export default useSaveRecipientReviewResult
