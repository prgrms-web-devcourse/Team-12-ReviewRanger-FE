interface Reply {
  questionId: number
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

interface ReplyComplete {
  receiverId: number
  complete: boolean[]
}

export interface ReviewReplyType {
  id: number
  replyTargets: ReplyTarget[]
  receiverList: User[]
  nonReceiverList: User[]
  replyComplete: ReplyComplete[]
}
