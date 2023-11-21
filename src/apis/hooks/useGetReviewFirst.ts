import { useSuspenseQuery } from '@tanstack/react-query'
import apiClient from '../apiClient'

export type QuestionType =
  | 'SINGLE_CHOICE'
  | 'MULTIPLE_CHOICE'
  | 'RATING'
  | 'SUBJECTIVE'
  | 'DROPDOWN'
  | 'HEXASTAT'

export interface QuestionOption {
  optionId: number
  optionName: string
}

export interface Question {
  id: number
  title: string
  description: string
  type: QuestionType
  isRequired: boolean
  questionOptions: QuestionOption[]
}

export interface Receiver {
  receiverId: number
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

    return response.data.data
  }

  return useSuspenseQuery({
    queryKey: [`/reviews/${id}/first`],
    queryFn: getReviewFirst,
  })
}

export default useGetReviewFirst
