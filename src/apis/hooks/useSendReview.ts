import { useMutation, useQueryClient } from '@tanstack/react-query'
import apiClient from '@/apis/apiClient'

interface Response {
  success: boolean
  errorCode?: string
  message?: string
}

//NOTE - 대상자별 조합된 리뷰 결과를 저장
const useSendReview = ({ reviewId }: { reviewId: string }) => {
  const queryClient = useQueryClient()

  const prevSendResultData = queryClient.getQueryData<{
    success: boolean
    data: number[]
  }>([`/final-results/${reviewId}/status`])

  const sendReview = async () => {
    return await apiClient.post<Response>(`/final-results/${reviewId}`)
  }

  return useMutation({
    mutationFn: sendReview,
    onSuccess: () => {
      queryClient.setQueryData([`/final-results/${reviewId}/status`], {
        ...prevSendResultData,
      })
    },
  })
}
export default useSendReview
