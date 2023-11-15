import { useQuery } from '@tanstack/react-query'
import apiClient from '../apiClient'

export interface QuestionOption {
  optionId: number
  optionName: string
}

export interface Question {
  id: number
  title: string
  description: string
  type: string
  isRequired: boolean
  questionOptions: QuestionOption[]
}

export interface Receiver {
  id: number
  name: string
}

export interface Data {
  id: number
  title: string
  receivers: Receiver[]
  description: string
  status: string
  questions: Question[]
}

interface Response {
  success: boolean
  data: Data
}

const useGetReviewFirst = ({ id }: { id: number }) => {
  const getReviewFirst = async () => {
    const response = await apiClient.get<Response>(`/reviews/${id}/first`)

    return response.data
  }

  return useQuery({
    queryKey: [`/reviews/${id}/first`],
    queryFn: getReviewFirst,
  })
}

export default useGetReviewFirst
