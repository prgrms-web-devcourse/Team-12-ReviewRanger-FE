import { useMutation } from '@tanstack/react-query'
import apiClient from '../apiClient'

interface Reply {
  // id: number
  questionId: number
  isRequired: boolean
  answerChoice: number | null
  answerText: string | null
  answerRating: number | null
  answerHexa: number | null
}

interface ReplyTarget {
  id: number
  receiverId: number
  responserId: number
  replies: Reply[]
}

interface Response {
  id: number
  replyTargets: ReplyTarget[]
}

const useEditResponse = () => {
  const editResponse = async (data: Response) => {
    return await apiClient.put('/participation', data)
  }

  return useMutation({ mutationFn: editResponse })
}

export default useEditResponse
