interface Reply {
  questionId: number
  answerChoice: number
  answerText: string
  answerRating: number
  answerHexa: number
}

interface ReplyTarget {
  receiverId: number
  responserId: number
  replies: Reply[]
}

export interface ReplyType {
  id: number
  replyTargets: ReplyTarget[]
}
