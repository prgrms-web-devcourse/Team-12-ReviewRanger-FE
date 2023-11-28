import { useMutation } from '@tanstack/react-query'
import apiClient from '@/apis/apiClient'

interface Response {
  success: boolean
  errorCode?: string
  message?: string
}

//NOTE - 대상자별 조합된 리뷰 결과를 저장
const useSendReview = () => {
  const sendReview = async ({ reviewId }: { reviewId: string }) => {
    return await apiClient.post<Response>(`/final-results/${reviewId}`)
  }

  return useMutation({
    mutationFn: sendReview,
  })
}
export default useSendReview
