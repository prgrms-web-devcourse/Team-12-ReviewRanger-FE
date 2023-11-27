import { useMutation } from '@tanstack/react-query'
import { useToast } from '@/hooks'
import apiClient from '@/apis/apiClient'

interface Response {
  success: boolean
  errorCode?: string
  message?: string
}

//NOTE - 대상자별 조합된 리뷰 결과를 저장
const useSendReview = () => {
  const { addToast } = useToast()
  const sendReview = async ({ reviewId }: { reviewId: string }) => {
    return await apiClient.post<Response>(`/final-results/${reviewId}`)
  }

  return useMutation({
    mutationFn: sendReview,
    onSuccess: ({ data }) => {
      if (data.errorCode && data.message) {
        addToast({ message: data.message, type: 'error' })

        return
      }

      addToast({
        message: '리뷰가 성공적으로 전송되었어요!',
        type: 'success',
      })
    },
  })
}
export default useSendReview
