interface Reply {
  // id: number
  questionId: number
  isRequired: boolean
  answerChoice: number | null
  answerText: string | null
  answerRating: number | null
  answerHexa: number | null
}

interface ReplyTarget {
  id: number
  receiverId: number
  responserId: number
  replies: Reply[]
}

interface User {
  receiverId: number
  name: string
  path: string
}

interface ReplyComplete {
  receiverId: number
  complete: boolean[]
}

export interface ReviewReplyEditType {
  id: number
  replyTargets: ReplyTarget[]
  receiverList: User[]
  replyComplete: ReplyComplete[]
}
