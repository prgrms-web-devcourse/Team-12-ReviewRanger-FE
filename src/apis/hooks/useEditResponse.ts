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
  responseId: number
  results: Result[]
}

const useEditResponse = () => {
  const editResponse = async (data: Response) => {
    return await apiClient.put('/invited-surveys', data)
  }

  return useMutation({ mutationFn: editResponse })
}

export default useEditResponse
