export interface Inputs {
  title: string
  description: string
  options: string[]
  optionName: string
  stats: string[]
  statName: string
}

export interface Question {
  title: string
  type:
    | 'SINGLE_CHOICE'
    | 'MULTIPLE_CHOICE'
    | 'STAR_RATING'
    | 'SUBJECTIVE'
    | 'DROPDOWN'
    | 'HEXASTAT'
    | ''
  isRequired: boolean
  questionOptions: { optionName: string }[]
}
