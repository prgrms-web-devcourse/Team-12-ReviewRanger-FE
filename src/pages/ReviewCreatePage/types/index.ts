export type QuestionType =
  | 'SINGLE_CHOICE'
  | 'MULTIPLE_CHOICE'
  | 'RATING'
  | 'SUBJECTIVE'
  | 'DROPDOWN'
  | 'HEXASTAT'

export interface Question {
  title: string
  type: QuestionType
  isRequired: boolean
  questionOptions: { optionName: string }[]
  description: string
}

export interface User {
  id: number
  receiverId: number
  name: string
}

export interface Review {
  title: string
  description: string
  questions: Question[]
  responserIdList: User[]
  nonResponserIdList: User[]
  filteredResponserIdList: User[]
  filteredNonResponserIdList: User[]
}
