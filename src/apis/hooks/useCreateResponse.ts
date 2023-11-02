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

interface Response {
  id: number
  userId: number
  results: Result[]
}

const useCreateResponse = () => {
  const createResponse = async (response: Response) => {
    return await apiClient.post('/invited-surveys', response)
  }

  return useMutation({ mutationFn: createResponse })
}

export default useCreateResponse
