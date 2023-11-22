import { useMutation } from '@tanstack/react-query'
import apiClient from '../apiClient'

interface Reply {
  questionId: number
  isRequired: boolean
  answerChoice: number | null
  answerText: string | null
  answerRating: number | null
  answerHexa: number | null
}

interface ReplyTarget {
  receiverId: number
  responserId: number
  replies: Reply[]
}

interface Response {
  id: number
  replyTargets: ReplyTarget[]
}

const useCreateResponse = () => {
  const createResponse = async (response: Response) => {
    return await apiClient.post('/participations', response)
  }

  return useMutation({ mutationFn: createResponse })
}

export default useCreateResponse
