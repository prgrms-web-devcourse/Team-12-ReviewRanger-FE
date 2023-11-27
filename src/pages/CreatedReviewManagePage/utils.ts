import { DEFAULT_VALUE } from './constants'

interface Data {
  id: string
  receiver: Receiver
  responser: Receiver
  participationId: string
  replies: Reply[]
}

interface Receiver {
  id: string
  name: string
  email: string
  createdAt: string
  updatedAt: string
}

interface QuestionOption {
  optionId: string
  optionName: string
}

interface Reply {
  id: string
  questionId: string
  //TODO - 몇명의 피어가 답변했는지를 이 responser로 판별해야함
  //TODO - 모든 replies의 responser를 뽑아와야 함
  responser: Receiver

  //TODO - 실제 대답한 객관식 답변의 ID,내용
  answerChoice: QuestionOption | null
  answerText: string | null
  answerRating: number | null
  answerHexa: number | null
}

//NOTE - 주관식 질문일떄, 질문과 답변 매핑
const getTextAnswer = (questionId: string, reply: Data[]) => {
  const res = reply
    ?.map(
      (data) =>
        data?.replies
          ?.filter(
            (reply) =>
              reply && reply?.questionId === questionId && reply?.answerText,
          )
          ?.map((reply) => {
            return {
              value: reply?.answerText,
              userName: data?.responser?.name,
            }
          })
          ?.filter((value) => value?.value !== DEFAULT_VALUE.TEXT),
    )
    .flat()

  return res
}

//NOTE - 별점 질문과 답변들 매핑
const getRatingAnswer = (questionId: string, reply: Data[]) => {
  const res = reply
    ?.map(
      (data) =>
        data?.replies
          ?.filter(
            (reply) =>
              reply && reply?.questionId === questionId && reply?.answerRating,
          )
          ?.map((reply) => {
            return {
              value: reply?.answerRating,
              userName: data?.responser?.name,
            }
          })
          ?.filter((value) => value?.value !== DEFAULT_VALUE.VALUE),
    )

    ?.flat()

  return res
}

const getRemainAnswer = (questionId: string, reply: Data[]) => {
  return reply
    ?.map(
      (value) =>
        value?.replies
          ?.filter((reply) => reply && reply.questionId === questionId)
          ?.map((reply) => {
            //NOTE - 육각형 스텟일떄
            if (
              reply?.answerChoice?.optionId &&
              reply?.answerChoice?.optionName &&
              reply?.answerHexa
            ) {
              return {
                name: reply?.answerChoice?.optionName,
                value: reply?.answerHexa,
                userName: value?.responser?.name,
              }
            }
            //NOTE - 그 외의 질문 유형일떄 처리
            {
              return {
                value: reply?.answerChoice?.optionName ?? null,
                userName: value?.responser?.name,
              }
            }
          })
          ?.filter((value) => value?.value !== DEFAULT_VALUE.VALUE),
    )
    ?.flat()
    ?.filter((value) => value.value !== null)
}

export const getAnswer = (
  questionType:
    | 'SINGLE_CHOICE'
    | 'MULTIPLE_CHOICE'
    | 'DROPDOWN'
    | 'SUBJECTIVE'
    | 'RATING'
    | 'HEXASTAT',
  questionId: string,
  reply: Data[],
) => {
  if (questionType === 'RATING') {
    return getRatingAnswer(questionId, reply)
  }

  if (questionType === 'SUBJECTIVE') {
    return getTextAnswer(questionId, reply)
  }

  return getRemainAnswer(questionId, reply)
}
