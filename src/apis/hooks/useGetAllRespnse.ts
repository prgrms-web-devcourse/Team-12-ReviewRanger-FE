//작성자별 응답결과 전체조회와 수신자별 응답결과 전체 조회 모두 가져오기
//TODO - API 호출 실패 시 대응하기(구현 다 하고)
import { useSuspenseQueries } from '@tanstack/react-query'
import apiClient from '@/apis/apiClient'

export interface AllReceiverResponse {
  recipientList: Receiver[]
}

export interface Receiver {
  surveyResultId: number
  // TODO: 통일 필요함
  id: number
  name: string
  recipientId: number
  recipientName: string
  responserCount: number
}

export interface AllResponserResponse {
  surveyId: string
  title: string
  responserCount: number
  surveyType:
    | 'subjective'
    | 'objective_unique'
    | 'objective_duplicate'
    | 'rating'
    | 'dropdown'
    | 'hexastat'

  responsers: Responser[]
}

export interface Responser {
  surveyResultId: number
  // TODO: 통일 필요함
  id: number
  name: string
  responserId: number
  responserName: string
  updatedAt: string
}

const useGetAllResponse = ({ reviewId }: { reviewId: string }) => {
  const getAllResponseByResponser = async () => {
    const response = await apiClient.get<AllResponserResponse>(
      `/surveys/${reviewId}/responser`,
    )

    return response.data
  }
  const getResponseByReceiver = async () => {
    const response = await apiClient.get<AllReceiverResponse>(
      `/surveys/${reviewId}/recipient`,
    )

    return response.data
  }

  return useSuspenseQueries({
    queries: [
      {
        queryKey: [`/surveys/${reviewId}/responser`],
        queryFn: getAllResponseByResponser,
      },
      {
        queryKey: [`/surveys/${reviewId}/recipient`],
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
