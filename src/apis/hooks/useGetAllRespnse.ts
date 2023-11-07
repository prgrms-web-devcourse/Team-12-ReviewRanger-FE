//작성자별 응답결과 전체조회와 수신자별 응답결과 전체 조회 모두 가져오기
import { useSuspenseQueries } from '@tanstack/react-query'
import apiClient from '@/apis/apiClient'

interface AllReceiverResponse {
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

interface AllResponserResponse {
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

    return response
  }
  const getResponseByReceiver = async () => {
    const response = await apiClient.get<AllReceiverResponse>(
      `/surveys/${reviewId}/recipient`,
    )

    return response
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
  })
}

export default useGetAllResponse
