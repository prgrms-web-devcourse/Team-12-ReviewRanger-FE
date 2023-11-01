//NOTE - 수신자별 응답 결과 단일 조회
//NOTE - 전체 응답
export interface Reply {
  subjectName: string
  surveyTitle: string
  subjectResults: ReplyResult[]
}

interface ReplyResult extends ReplyQuestion {
  answer: ReplyAnswer
}

//NOTE - 질문에 관한 필드
interface ReplyQuestion {
  questionType:
    | 'multipleChoice'
    | 'singleChoice'
    | 'subjective'
    | 'dropdown'
    | 'starRating'
    | 'hexagon'
  questionTitle: string
  questionId: string
}

//NOTE - 응답에 관한 필드
interface ReplyAnswer {
  responserId: number
  responserName: string
  responseId: string
  answer: number | string | string[] | Record<string, number>
}
