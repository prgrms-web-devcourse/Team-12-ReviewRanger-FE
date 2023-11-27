import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/hooks'
import apiClient from '@/apis/apiClient'

interface Response {
  success: boolean
}
const useCloseSurvey = ({ id }: { id: string }) => {
  const { addToast } = useToast()
  const queryClient = useQueryClient()
  const closeSurvey = async () => {
    return await apiClient.post<Response>(`/reviews/${id}/close`)
  }

  return useMutation({
    mutationFn: closeSurvey,
    onSuccess: () => {
      addToast({ message: '리뷰가 마감되었습니다!', type: 'success' })
      queryClient.invalidateQueries({
        queryKey: [`/reviews/${id}/creator`],
      })
    },
  })
}
export default useCloseSurvey
