import { QuestionType } from '.'

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

export interface ReviewDetailedData {
  id: number
  title: string
  receivers: Receiver[]
  description: string
  status: string
  questions: Question[]
}

export interface ReviewDetailed {
  success: boolean
  data: ReviewDetailedData
}
