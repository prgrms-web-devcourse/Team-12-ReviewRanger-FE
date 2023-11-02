import { useMutation } from '@tanstack/react-query'
import apiClient from '../apiClient'

interface Answer {
  questionId: number
  questionType: string
  answer: string[]
}

interface Result {
  reviewerId: number
  answers: Answer[]
}

interface ResponseType {
  responseId: number
  results: Result[]
}

interface Response {
  success: boolean
}

const useEditResponse = () => {
  const editResponse = async (data: ResponseType) => {
    return await apiClient.put<Response>('/invited-surveys', data)
  }

  return useMutation({ mutationFn: editResponse })
}

export default useEditResponse
