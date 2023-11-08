export const SINGLE_RECIPIENT_QUESTION = {
  //NOTE - 수신자별 응답 결과 단일 조회-질문 조회

  questions: [
    {
      id: '1',
      title: '가장 좋아하는 동물은?',
    },
    {
      id: '2',
      title: '가장 좋아하는 음식은?',
    },
    {
      id: '3',
      title: '가장 좋아하는 나라는?',
    },
    {
      id: '4',
      title: '영화 A의 평점?',
    },
  ],
}

export const SINGLE_RECIPIENT_ANSWER = {
  //NOTE - 수신자별 응답결과 단일조회- 답변 결과 조회
  reply: [
    {
      subject_id: '123',
      question_id: '1',
      replies: [
        {
          id: '1',
          responser_id: 'user1',
          questionId: 'question1',
          objectOptionId: '돼지',
          answerText: null,
          rating: null,
        },
        {
          id: '2',
          responser_id: 'user2',
          questionId: 'question2',
          objectOptionId: '기린',
          answerText: null,
          rating: null,
        },
        {
          id: '3',
          responser_id: 'user3',
          questionId: 'question3',
          objectOptionId: '호랑이',
          answerText: null,
          rating: null,
        },
      ],
    },
    {
      subject_id: '123',
      question_id: '2',
      replies: [
        {
          id: '4',
          responser_id: 'user4',
          questionId: 'question4',
          objectOptionsId: null,
          answerText: '연어',
          rating: null,
        },
        {
          id: '5',
          responser_id: 'user1',
          questionId: 'question4', //일단 보류
          objectOptionsId: null,
          answerText: '초밥',
          rating: null,
        },
        {
          id: '6',
          responser_id: 'user2',
          questionId: 'question4',
          objectOptionsId: null,
          answerText: '피자',
          rating: null,
        },
      ],
    },
    {
      subject_id: '123123',
      question_id: '3',
      replies: [
        {
          id: '7',
          responser_id: 'user1',
          questionId: 'question5',
          objectOptionsId: '한국',
          answerText: null,
          rating: null,
        },
        {
          id: '8',
          responser_id: 'user2',
          questionId: 'question5',
          objectOptionsId: '일본',
          answerText: null,
          rating: null,
        },
        {
          id: '9',
          responser_id: 'user3',
          questionId: 'question6',
          objectOptionsId: '중국',
          answerText: null,
          rating: null,
        },
      ],
    },
    {
      subject_id: '123123123',
      question_id: '4',
      replies: [
        {
          id: '10',
          responser_id: 'user3',
          objectOptionId: null,
          questionId: null,
          answerText: null,
          rating: 3,
        },
        {
          id: '11',
          responser_id: 'user2',
          objectOptionId: null,
          questionId: null,
          rating: 4,
        },
        {
          id: '12',
          responser_id: 'user1',
          objectOptionId: null,
          questionId: null,
          rating: 1,
        },
      ],
    },
  ],
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
