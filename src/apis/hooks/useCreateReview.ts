import { useMutation } from '@tanstack/react-query'
import apiClient from '../apiClient'

interface Option {
  optionName: string
}

interface Question {
  title: string
  type:
    | 'MULTIPLE_CHOICE'
    | 'SINGLE_CHOICE'
    | 'SUBJECTIVE'
    | 'RATING'
    | 'DROPDOWN'
    | 'HEXASTAT'
  questionOptions: Option[]
  isRequired: boolean
}

export interface Survey {
  title: string
  description: string
  type: 'PEER_REVIEW'
  questions: Question[]
  responserIdList: number[]
}

interface Response {
  success: boolean
}

const useCreateReview = () => {
  const createSurvey = async (survey: Survey) => {
    return await apiClient.post<Response>('/reviews', survey)
  }

  return useMutation({ mutationFn: createSurvey })
}

export default useCreateReview
