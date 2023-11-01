//NOTE - 작성자별 응답 결과 단일 조회
interface Question {
  responserName: string
  title: string
  results: QuestionResult[]
}

interface QuestionResult {
  questionId: number
  questionTitle: string
  questionType:
    | 'multipleChoice'
    | 'singleChoice'
    | 'subjective'
    | 'dropdown'
    | 'starRating'
    | 'hexagon'
  questionSequence: number
  answer: number | string | string[] | Record<string, number>
}
