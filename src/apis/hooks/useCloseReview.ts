import { useMutation, useQueryClient } from '@tanstack/react-query'
import apiClient from '@/apis/apiClient'

interface Response {
  success: boolean
}
const useCloseSurvey = ({ id }: { id: string }) => {
  const queryClient = useQueryClient()
  const closeSurvey = async () => {
    return await apiClient.post<Response>(`/reviews/${id}/close`)
  }

  return useMutation({
    mutationFn: closeSurvey,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`/reviews/${id}/creator`],
      })
    },
  })
}
export default useCloseSurvey
