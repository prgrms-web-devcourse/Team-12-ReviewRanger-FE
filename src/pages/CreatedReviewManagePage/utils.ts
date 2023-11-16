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
  questionOption: QuestionOption | null
  answerText: string | null
  rating: number | null
  hexastat: number | null
}

const getTextAnswer = (questionId: string, reply: Data[]) => {
  const res = reply
    .map(
      (data) =>
        data?.replies
          ?.filter(
            (reply) =>
              reply &&
              reply.questionId.trim() === questionId.trim() &&
              reply.answerText,
          )
          ?.map((reply) => {
            return {
              value: reply?.answerText,
              userName: data?.responser?.name,
            }
          }),
    )
    .flat()

  return res
}

const getRatingAnswer = (questionId: string, reply: Data[]) => {
  return reply
    .map(
      (data) =>
        data?.replies
          ?.filter(
            (reply) => reply && reply.questionId === questionId && reply.rating,
          )
          ?.map((reply) => {
            return {
              value: reply?.rating,
              userName: data?.responser?.name,
            }
          }),
    )
    .flat()
}

//NOTE - 육각스텟일 떄 항목별로 뺴야함
const getRemainAnswer = (questionId: string, reply: Data[]) => {
  return reply
    ?.map(
      (value) =>
        value?.replies
          ?.filter((reply) => reply && reply.questionId === questionId)
          ?.map((reply) => {
            if (
              reply.questionOption?.optionId &&
              reply.questionOption?.optionName &&
              reply.hexastat
            ) {
              return {
                name: reply?.questionOption?.optionName,
                value: reply?.hexastat,
                userName: value?.responser?.name,
              }
            } else {
              return {
                value: reply.questionOption?.optionName ?? null,
                userName: value?.responser?.name,
              }
            }
          }),
    )
    .flat()
}

export const getAnswer = (
  questionType:
    | 'SINGLE_CHOICE'
    | 'MULTIPLE_CHOICE'
    | 'DROPDOWN'
    | 'SUBJECTIVE'
    | 'STAR_RATING'
    | 'HEXASTAT',
  questionId: string,
  reply: Data[],
) => {
  if (questionType === 'STAR_RATING') {
    return getRatingAnswer(questionId, reply)
  }

  if (questionType === 'SUBJECTIVE') {
    return getTextAnswer(questionId, reply)
  }

  return getRemainAnswer(questionId, reply)
}
