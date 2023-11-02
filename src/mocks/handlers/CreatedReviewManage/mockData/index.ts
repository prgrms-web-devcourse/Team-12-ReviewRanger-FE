export const SINGLE_RECIPIENT = {
  //NOTE - 수신자별 응답 결과 단일 조회
  subjectName: '김아무개',
  surveyTitle: '포켓몬을 고르는 설문조사',
  subjectResults: {
    questionType: 'multipleChoice',
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
  //NOTE - 작성자별 응답 결과 단일 조회
  responserName: '홍길동',
  title: '다양한 유형의 질문이 있는 설문조사',
  results: [
    {
      questionId: 1,
      questionTitle: '객관식(중복 허용) 질문',
      questionType: 'multipleChoice',
      questionSequence: 1,
      answer: ['A', 'B', 'C'],
    },
    {
      questionId: 2,
      questionTitle: '객관식(중복 허용X) 질문',
      questionType: 'singleChoice',
      questionSequence: 2,
      answer: 'A',
    },
    {
      questionId: 3,
      questionTitle: '주관식 질문',
      questionType: 'subjective',
      questionSequence: 3,
      answer: 'asdasdasdasdsad',
    },
    {
      questionId: 4,
      questionTitle: '드롭다운 질문',
      questionType: 'dropdown',
      questionSequence: 4,
      answer: 'a',
    },
    {
      questionId: 5,
      questionTitle: '별점 질문',
      questionType: 'starRating',
      questionSequence: 5,
      answer: 3,
    },
    {
      questionId: 6,
      questionTitle: '육각스탯 질문',
      questionType: 'hexagonStat',
      questionSequence: 6,
      maxScore: 10,
      answer: [
        { 선택지A: 4 },
        { 선택지B: 2 },
        { 선택지C: 3 },
        { 선택지4: 5 },
        { 선택지5: 2 },
        { 선택지6: 7 },
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
