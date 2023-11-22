export type ReviewStatus = 'DEADLINE' | 'PROCEEDING' | 'END'

export type QuestionType =
  | 'SINGLE_CHOICE'
  | 'MULTIPLE_CHOICE'
  | 'RATING'
  | 'SUBJECTIVE'
  | 'DROPDOWN'
  | 'HEXASTAT'

export interface InvitedReview {
  reviewId: number
  status: ReviewStatus
  title: string
  createAt: string
  submitAt: string
}

export interface CreatedReview {
  reviewId: number
  status: ReviewStatus
  title: string
  responserCount: number
  createdAt: string
}

export interface ReceivedReview {
  id: number
  title: string
  createdAt: string
}
