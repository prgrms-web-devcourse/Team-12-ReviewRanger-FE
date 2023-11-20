//NOTE -  모든 수신자가 결과를 받았는지 검증하는 훅
import { useSuspenseQuery } from '@tanstack/react-query'
import apiClient from '@/apis/apiClient'

const useCheckAllReceiverReceived = ({ id }: { id: string }) => {
  const getCheckAllReceiverReceived = async () => {
    const response = await apiClient.get(`/final-results/${id}`)

    return response.data
  }

  return useSuspenseQuery({
    queryKey: [`/final-results/${id}`],
    queryFn: getCheckAllReceiverReceived,
  })
}

export default useCheckAllReceiverReceived
