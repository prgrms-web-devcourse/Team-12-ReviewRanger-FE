interface Reply {
  id: number
  questionId: number
  isRequired: boolean
  answerChoice: number | null
  answerText: string | null
  answerRating: number | null
  answerHexa: number | null
}

interface ReplyTarget {
  receiverId: number
  responserId: number
  replies: Reply[]
}

interface User {
  receiverId: number
  name: string
}

export interface ReviewReplyEndType {
  id: number
  replyTargets: ReplyTarget[]
  receiverList: User[]
}
