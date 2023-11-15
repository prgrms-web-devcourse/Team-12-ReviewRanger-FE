export type QuestionType =
  | 'SINGLE_CHOICE'
  | 'MULTIPLE_CHOICE'
  | 'STAR_RATING'
  | 'SUBJECTIVE'
  | 'DROPDOWN'
  | 'HEXASTAT'

export interface Question {
  title: string
  type: QuestionType
  isRequired: boolean
  questionOptions: { optionName: string }[]
}

interface User {
  id: number
  name: string
}

export interface Review {
  title: string
  description: string
  questions: Question[]
  responserIdList: User[]
  nonResponserIdList: User[]
}
