import { useSuspenseQuery } from '@tanstack/react-query'
import apiClient from '@/apis/apiClient'

interface Response {
  success: boolean
  data: number[]
}
const useCheckAllRecipientReceived = ({ reviewId }: { reviewId: string }) => {
  const getCheckAllRecipientReceived = async () => {
    const response = await apiClient.get<Response>(
      `/final-results/${reviewId}/status`,
    )

    return response.data
  }

  return useSuspenseQuery({
    queryKey: [`/final-results/${reviewId}/status`],
    queryFn: getCheckAllRecipientReceived,
  })
}

export default useCheckAllRecipientReceived
