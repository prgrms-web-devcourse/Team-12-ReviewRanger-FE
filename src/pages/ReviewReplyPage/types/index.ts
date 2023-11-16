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

interface User {
  receiverId: number
  name: string
}

export interface ReviewReplyType {
  id: number
  replyTargets: ReplyTarget[]
  receiverList: User[]
  nonReceiverList: User[]
}
