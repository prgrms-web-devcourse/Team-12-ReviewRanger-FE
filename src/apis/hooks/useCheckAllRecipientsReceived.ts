import { useQuery } from '@tanstack/react-query'
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

  return useQuery({
    queryKey: [`/final-results/${reviewId}/status`],
    queryFn: getCheckAllRecipientReceived,
    enabled: true,
    refetchOnMount: false,
    refetchInterval: false,
    refetchOnReconnect: false,
  })
}

export default useCheckAllRecipientReceived
