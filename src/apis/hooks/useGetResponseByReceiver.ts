import { useQuery } from '@tanstack/react-query'
import apiClient from '@/apis/apiClient'

//NOTE - 수신자별 응답 결과 단일 조회

//NOTE - 응답에 관한 필드
interface AllQuestion {
  sucess: boolean
  data: {
    reviewId: string
    title: string
    //TODO - 타입 유니온으로 받기
    status: string
    questions: Question[]
  }
}

interface Question {
  questionId: string
  title: string
  //TODO - 타입 유니온으로 받기
  type: string
  isRequired: boolean

  questionOptions: QuestionOptions[]
}

interface QuestionOptions {
  questionOptionId: number
  optionName: string
}
/*
interface AllReply {
  subject_id: string
  question_id: string
  replies: Reply[]
}

interface Reply {
  id: string
  responser_id: string
  questionId: string
  objectOptionId: null | string
  answerText: null | string
  rating: null | number
}
*/
const useGetResponseByReceiver = ({
  surveyResultId,
}: {
  surveyResultId: string
}) => {
  const getAllQuestion = async () => {
    const response = await apiClient.get<AllQuestion>(
      `/reviews/${surveyResultId}`,
    )

    return response.data
  }

  return useQuery({
    queryKey: [`/reviews/${surveyResultId}`],
    queryFn: getAllQuestion,
  })
}

export default useGetResponseByReceiver
