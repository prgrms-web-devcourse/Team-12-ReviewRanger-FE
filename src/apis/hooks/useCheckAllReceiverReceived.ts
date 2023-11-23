//NOTE -  모든 수신자가 결과를 받았는지 검증하는 훅
import { useSuspenseQuery } from '@tanstack/react-query'
import apiClient from '@/apis/apiClient'

interface Response {
  success: boolean
  data: number[]
}

const useCheckAllReceiverReceived = ({ id }: { id: string }) => {
  const getCheckAllReceiverReceived = async () => {
    const response = await apiClient.get<Response>(
      `/final-results/${id}/status`,
    )

    return response.data
  }

  return useSuspenseQuery({
    queryKey: [`/final-results/${id}/status`],
    queryFn: getCheckAllReceiverReceived,
  })
}

export default useCheckAllReceiverReceived
