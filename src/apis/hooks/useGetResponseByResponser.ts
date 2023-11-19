//NOTE - 작성자별 응답 결과 단일 조회
import { useQuery } from '@tanstack/react-query'
import apiClient from '@/apis/apiClient'

interface Response {
  success: boolean
  data: Receiver[]
}

interface Receiver {
  receiverId: string
  receiverName: string
  replies: Reply[]
}

interface Reply {
  id: string
  questionId: string
  responser: object
  objectOptionId: string | null
  answerText: string | null
  rating: string | null
  hexastat: string | null
}
//NOTE - 참여 ID
const useGetResponseByResponser = ({ id }: { id: string }) => {
  const getSingleAuthorResponse = async () => {
    const singleAuthorResponse = await apiClient.get<Response>(
      `/participations/${id}/written-replies`,
    )

    return singleAuthorResponse.data
  }

  return useQuery({
    queryKey: [`/participations/${id}/written-replies`],
    queryFn: getSingleAuthorResponse,
  })
}
export default useGetResponseByResponser
