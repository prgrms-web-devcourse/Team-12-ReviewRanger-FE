import { useMutation } from '@tanstack/react-query'
import apiClient from '../apiClient'

interface Question {
  title: string
  type: string
  options: string
  sequence: number
  isDuplicated: boolean
  isRequired: boolean
}

interface Survey {
  title: string
  description: string
  type: string
  questions: Question[]
  responserIdList: number[]
}

const useCreateSurvey = () => {
  const createSurvey = async (survey: Survey) => {
    return await apiClient.post('/surveys', survey)
  }

  return useMutation({ mutationFn: createSurvey })
}

export default useCreateSurvey
