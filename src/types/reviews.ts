export interface InvitedReview {
  id: number
  title: string
  deadline_status: '진행중' | '마감' | '종료'
  survey_type: string
  is_completed: boolean
  created_at: string
}

export interface CreatedReview {
  id: number
  title: string
  deadline_status: '진행중' | '마감' | '종료'
  responser_count: number
  survey_type: string
  created_at: string
}

export interface ReceivedReview {
  id: number
  title: string
  created_at: string
}
