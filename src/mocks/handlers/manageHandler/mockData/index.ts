export const SINGLE_RECIPIENT = {
  //NOTE - 수신자별 응답 결과 단일 조회
  subjectName: '김아무개',
  surveyTitle: '포켓몬을 고르는 설문조사',
  subjectResults: {
    questionType: 'subjective',
    questionTitle: '첫 스타팅 포켓몬을 고르자면?',
    questionId: '1',
    answers: [
      {
        responserId: 10,
        responserName: '김잼민',
        responseId: '100',
        answer: '파이리',
      },
      {
        responserId: 11,
        responserName: '김하게',
        responseId: '101',
        answer: '치코리타',
      },
      {
        responserId: 12,
        responserName: '김빡빡',
        responseId: '102',
        answer: '아르세우스',
      },
    ],
  },
}

export const SINGLE_RESPONSER = {
  title: '포켓몬을 고르는 설문조사',
  description: '',
  responserId: 10,
  responserName: '김잼민',
  questions: [
    {
      questionId: 1,
      questionTitle: '첫 스타팅 포켓몬을 고르자면?',
      questionType: 'multipleChoice',
      questionSequence: 1,
      isRequired: true,
    },
  ],
  results: [
    {
      subjectId: 1,
      subjectName: '김아무개',
      answers: [
        {
          answerId: 100,
          questionId: 1,
          answer: '파이리',
        },
        {
          answerId: 101,
          questionId: 1,
          answer: '치코리타',
        },
        {
          answerId: 102,
          questionId: 1,
          answer: '아르세우스',
        },
      ],
    },
  ],
}

export const RESPONSE = {
  //NOTE - 작성자별 응답 결과 전체조회
  surveyId: `${Math.random().toString(36).substring(2, 10)}${Date.now()}`,
  title: '데브코스 1차 피어리뷰',
  responserCount: 5,
  surveyType: '피어리뷰',
  responsers: Array(5)
    .fill(0)
    .map((_, index) => ({
      surveyResultId: `${Math.random()
        .toString(36)
        .substring(2, 10)}${Date.now()}`,
      responserId: `${Math.random()
        .toString(36)
        .substring(2, 10)}${Date.now()}`,
      id: `${Math.random().toString(36).substring(2, 10)}${Date.now()}`,
      name: `김효중${index}`,
      responserName: `김효중${index}`,
      updatedAt: new Date().toUTCString(),
    })),
}

export const RECIPIENT = {
  //NOTE - 수신자별 응답 결과 전체 조회
  recipientList: Array(5)
    .fill(0)
    .map((_, index) => ({
      surveyResultId: `${Math.random()
        .toString(36)
        .substring(2, 10)}${Date.now()}`,
      recipientId: `${Math.random()
        .toString(36)
        .substring(2, 10)}${Date.now()}`,
      id: `${Math.random().toString(36).substring(2, 10)}${Date.now()}`,
      name: `김빡빡${index}`,
      recipientName: `김빡빡${index}`,
      responserCount: index,
    })),
}
