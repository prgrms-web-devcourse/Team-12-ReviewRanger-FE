//NOTE - 작성자별 응답 결과 단일 조회
import { useSuspenseQuery } from '@tanstack/react-query'
import apiClient from '@/apis/apiClient'
import { Response } from './useGetResponseByReceiver'

//NOTE - 참여 ID
const useGetResponseByResponser = ({ id }: { id: string }) => {
  const getSingleAuthorResponse = async () => {
    const singleAuthorResponse = await apiClient.get<Response>(
      `/reviewed-targets/${id}/responser`,
    )

    return singleAuthorResponse.data
  }

  return useSuspenseQuery({
    queryKey: [`/reviewed-targets/${id}/responser`],
    queryFn: getSingleAuthorResponse,
  })
}
export default useGetResponseByResponser
