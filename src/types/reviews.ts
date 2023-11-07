export interface InvitedReview {
  id: number
  title: string
  status: '진행중' | '마감' | '종료'
  type: string
  isCompleted: boolean
  createdAt: string | null
}

export interface CreatedReview {
  id: number
  title: string
  status: '진행중' | '마감' | '종료'
  responserCount: number
  type: string
  createdAt: string
}

export interface ReceivedReview {
  id: number
  title: string
  createdAt: string
}
