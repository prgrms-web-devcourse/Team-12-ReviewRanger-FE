//작성자별 응답결과 전체조회와 수신자별 응답결과 전체 조회 모두 가져오기
//TODO - API 호출 실패 시 대응하기(구현 다 하고)
import { useSuspenseQueries } from '@tanstack/react-query'
import apiClient from '@/apis/apiClient'
import { ResponseByReceiver } from './useGetAllResponseByReceiver'
import { ResponseByResponser } from './useGetAllResponseByResponser'

const useGetAllResponse = ({ reviewId }: { reviewId: string }) => {
  const getAllResponseByResponser = async () => {
    const response = await apiClient.get<ResponseByResponser>(
      `/reviews/${reviewId}/responser`,
    )

    return response.data
  }
  const getResponseByReceiver = async () => {
    const response = await apiClient.get<ResponseByReceiver>(
      `/reviews/${reviewId}/receiver`,
    )

    return response.data
  }

  return useSuspenseQueries({
    queries: [
      {
        queryKey: [`/reviews/${reviewId}/responser`],
        queryFn: getAllResponseByResponser,
      },
      {
        queryKey: [`/reviews/${reviewId}/receiver`],
        queryFn: getResponseByReceiver,
      },
    ],
    combine: (results) => {
      return {
        allResponseByResponser: results[0],
        allResponseByReceiver: results[1],
      }
    },
  })
}

export default useGetAllResponse
