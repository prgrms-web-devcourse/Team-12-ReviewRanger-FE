export const SINGLE_RECIPIENT_QUESTION = {
  success: true,
  data: {
    id: 1,
    receivers: [
      {
        id: 1,
        name: '김빡빡',
      },
      {
        id: 2,
        name: '김하게',
      },
      {
        id: 3,
        name: '김효중', // 현재 유저(현재 유저도 다른 사람한테는 대상자가 됨)
      },
    ],
    title: '데브코스 1차 피어리뷰',
    description:
      '데브코스 단위기간 어쩌구 6월 어쩌구 8월 1차 팀에 대한 리뷰입니다. 성실하게 답변에 임해주세요',
    status: 'ONGOING',
    questions: [
      {
        id: '1',
        title: '중복선택을 하는 문항',
        description: '',
        type: 'MULTIPLE_CHOICE',
        isRequired: true,
        options: [
          {
            optionId: '1',
            optionName: '옵션A',
          },
          {
            optionId: '2',
            optionName: '옵션B',
          },
          {
            optionId: '3',
            optionName: '옵션C',
          },
        ],
      },
      {
        id: '2',
        title: '단일 선택을 하는 문항',
        description:
          '[예시] 해결하지 못하는 부분은 스스로 찾아보고, 정의하고, 해결하려고 하는 자기 주도 학습 태도가 우수합니다. 협업에 필요한 문서화 능력이 뛰어나 함께 작업하는 팀원으로 많은 도움을 받고 있습니다. 상당한 개발 실력뿐만 아니라 새로운 기술과 관련 트렌드를 공유하고 지식 나눔해 주는 팀원입니다.',
        type: 'SINGLE_CHOICE',
        isRequired: true,
        options: [
          {
            optionId: '1',
            optionName: '옵션A',
          },
          {
            optionId: '2',
            optionName: '옵션B',
          },
          {
            optionId: '3',
            optionName: '옵션D',
          },
        ],
      },
      {
        id: '3',
        title: '별점을 주는 문항',
        description: '',
        type: 'STAR_RATING',
        isRequired: true,
        options: null,
      },
      {
        id: '4',
        title: '드롭다운문항',
        description: '',
        type: 'DROPDOWN',
        isRequired: true,
        options: null,
      },
      {
        id: '5',
        title: '주관식 길게 입력하는 문항',
        description: '',
        type: 'SUBJECTIVE',
        isRequired: false,
        options: null,
      },
      {
        id: '6',
        title: '육각형 스텟 점수를 입력하는 문항',
        description: '',
        type: 'HEXASTAT',
        isRequired: false,
        options: [
          {
            optionId: '1',
            optionName: '섬세함',
          },
          {
            optionId: '2',
            optionName: '친절함',
          },
          {
            optionId: '3',
            optionName: '리더십',
          },

          {
            optionId: '4',
            optionName: '조용함',
          },

          {
            optionId: '5',
            optionName: '신중함',
          },

          {
            optionId: '6',
            optionName: '강함',
          },
        ],
      },
    ],
  },
}

export const SINGLE_RECIPIENT_ANSWER =
  //NOTE - 수신자별 응답결과 단일조회- 답변 결과 조회
  {
    success: true,
    data: [
      {
        id: '2',
        receiver: {
          id: '3',
          email: 'pnk5306@naver.com',
          name: '김잼민',
          createdAt: '2023-11-15T04:46:42.432646',
          updatedAt: '2023-11-15T04:46:42.432646',
        },
        responser: {
          id: '1',
          email: '김빡빡@naver.com',
          name: '김빡빡',
          createdAt: '2023-11-15T04:46:42.432646',
          updatedAt: '2023-11-15T04:46:42.432646',
        },
        participationId: '1',
        replies: [
          {
            id: '1',
            questionId: '1',
            questionOption: {
              optionId: '1',
              optionName: '옵션A',
              createdAt: '2023-11-15T04:47:09.689931',
              updatedAt: '2023-11-15T04:47:09.689931',
            },
            answerText: null,
            rating: null,
            hexastat: null,
            reviewTargetId: '1',
            createdAt: '2023-11-15T04:47:09.689931',
            updatedAt: '2023-11-15T04:47:09.689931',
          },
          {
            id: '2',
            questionId: '2',
            questionOption: {
              optionId: '1',
              optionName: '옵션A',
              createdAt: '2023-11-15T04:47:09.689931',
              updatedAt: '2023-11-15T04:47:09.689931',
            },
            answerText: null,
            rating: null,
            hexastat: null,
            reviewTargetId: '1',
            createdAt: '2023-11-15T04:47:09.689931',
            updatedAt: '2023-11-15T04:47:09.689931',
          },
          {
            id: '3',
            questionId: '3',
            questionOption: null,
            answerText: null,
            rating: 1,
            hexastat: null,
            reviewTargetId: '1',
            createdAt: '2023-11-15T04:47:09.689931',
            updatedAt: '2023-11-15T04:47:09.689931',
          },
          {
            id: '4',
            questionId: '4',
            questionOption: {
              optionId: '1',
              optionName: '여자',
            },
            answerText: null,
            rating: null,
            hexastat: null,
            createdAt: '2023-11-15T04:47:09.689931',
            updatedAt: '2023-11-15T04:47:09.689931',
          },
          {
            id: '5',
            questionId: '5',
            questionOption: null,
            answerText:
              ' 피카츄피카츄피카츄피카츄피카츄피카츄피카츄피카츄피카츄피카츄피카츄피카츄피카츄피카츄피카츄피카츄피카츄피카츄피카츄피카츄피카츄피카츄피카츄피카츄',
            rating: null,
            hexastat: null,
            createdAt: '2023-11-15T04:47:09.689931',
            updatedAt: '2023-11-15T04:47:09.689931',
          },
          {
            id: '6',
            questionId: '6',
            questionOption: {
              optionId: '1',
              optionName: '섬세함',
            },
            answerText: null,
            rating: null,
            hexastat: 3,
            createdAt: '2023-11-15T04:47:09.689931',
            updatedAt: '2023-11-15T04:47:09.689931',
          },
          {
            id: '7',
            questionId: '6',
            questionOption: {
              optionId: '2',
              optionName: '친절함',
            },
            answerText: null,
            rating: null,
            hexastat: 9,
            createdAt: '2023-11-15T04:47:09.689931',
            updatedAt: '2023-11-15T04:47:09.689931',
          },
          {
            id: '8',
            questionId: '6',
            questionOption: {
              optionId: '3',
              optionName: '리더십',
            },
            answerText: null,
            rating: null,
            hexastat: 1,
            createdAt: '2023-11-15T04:47:09.689931',
            updatedAt: '2023-11-15T04:47:09.689931',
          },
        ],
      },
      {
        id: '3',
        receiver: {
          id: '3',
          email: 'pnk5306@naver.com',
          name: '김잼민',
          createdAt: '2023-11-15T04:46:42.432646',
          updatedAt: '2023-11-15T04:46:42.432646',
        },
        responser: {
          id: '2',
          email: '김하게@naver.com',
          name: '김하게',
          createdAt: '2023-11-15T04:46:42.432646',
          updatedAt: '2023-11-15T04:46:42.432646',
        },
        participationId: '2',
        replies: [
          {
            id: '9',
            questionId: '1',
            questionOption: {
              optionId: '2',
              optionName: '옵션B',
            },
            answerText: null,
            rating: null,
            hexastat: null,
            createdAt: '2023-11-15T04:47:09.689931',
            updatedAt: '2023-11-15T04:47:09.689931',
          },
          {
            id: '10',
            questionId: '2',
            questionOption: {
              optionId: '1',
              optionName: '옵션A',
            },
            answerText: null,
            rating: null,
            hexastat: null,
            createdAt: '2023-11-15T04:47:09.689931',
            updatedAt: '2023-11-15T04:47:09.689931',
          },
          {
            id: '11',
            questionId: '3',
            questionOption: null,
            answerText: null,
            rating: 5,
            hexastat: null,
            createdAt: '2023-11-15T04:47:09.689931',
            updatedAt: '2023-11-15T04:47:09.689931',
          },
          {
            id: '12',
            questionId: '4',
            questionOption: {
              optionId: '1',
              optionName: '여자',
            },
            answerText: null,
            rating: null,
            hexastat: null,
            createdAt: '2023-11-15T04:47:09.689931',
            updatedAt: '2023-11-15T04:47:09.689931',
          },
          {
            id: '13',
            questionId: '5',
            questionOption: null,
            answerText: '약간 이렇게 짧고 짧아요 이러쿵 저러쿵 한 줄',
            rating: null,
            hexastat: null,
            createdAt: '2023-11-15T04:47:09.689931',
            updatedAt: '2023-11-15T04:47:09.689931',
          },
          {
            id: '14',
            questionId: '6',
            questionOption: {
              optionId: '1',
              optionName: '섬세함',
            },
            answerText: null,
            rating: null,
            hexastat: 1,
            createdAt: '2023-11-15T04:47:09.689931',
            updatedAt: '2023-11-15T04:47:09.689931',
          },
          {
            id: '15',
            questionId: '6',
            questionOption: {
              optionId: '2',
              optionName: '친절함',
            },
            answerText: null,
            rating: null,
            hexastat: 8,
            createdAt: '2023-11-15T04:47:09.689931',
            updatedAt: '2023-11-15T04:47:09.689931',
          },
          {
            id: '16',
            questionId: '6',
            questionOption: {
              optionId: '3',
              optionName: '리더십',
            },
            answerText: null,
            rating: null,
            hexastat: 2,
            createdAt: '2023-11-15T04:47:09.689931',
            updatedAt: '2023-11-15T04:47:09.689931',
          },
        ],
      },
    ],
  }

export const SINGLE_RESPONSER = {
  success: true,
  data: [
    {
      id: '2',
      title: 'Review Title',
      description: 'Review Title',
      status: 'PROCEEDING',
      questions: [
        {
          id: '1',
          title: '객관식 단일 선택질문입니다',
          type: 'SINGLE_CHOICE',
          isRequired: true,
          questionOptions: [
            {
              optionId: '1',
              optionName: 'Option 1',
            },
            {
              optionId: '2',
              optionName: 'Option 2',
            },
          ],
        },
        {
          id: '2',
          title: '주관식 질문 입니다.',
          type: 'SUBJECTIVE',
          isRequired: false,
          questionOptions: [],
        },
        {
          id: '3',
          title: '별점을 남겨줘요',
          type: 'RATING',
          isRequired: false,
          questionOptions: [],
        },
        {
          id: '4',
          title: '육각형 스텟 질문입니당',
          type: 'HEXA_STAT',
          isRequired: true,
          questionOptions: [
            {
              optionId: '1',
              optionName: '바보',
            },
            {
              optionId: '2',
              optionName: '해삼',
            },
            {
              optionId: '3',
              optionName: '바보멍청',
            },
            {
              optionId: '4',
              optionName: '똥개',
            },
            {
              optionId: '5',
              optionName: '그루트',
            },
            {
              optionId: '6',
              optionName: '말미잘',
            },
          ],
        },
      ],
      receiver: {
        id: 3,
        email: 'pnk53063@naver.com',
        name: '효리',
        createdAt: '2023-11-15T04:46:42.432646',
        updatedAt: '2023-11-15T04:46:42.432646',
      },
      responser: [
        {
          id: '2',
          email: 'pnk53062@naver.com',
          name: '주하',
          createdAt: '2023-11-15T04:46:38.187621',
          updatedAt: '2023-11-15T04:46:38.187621',
        },
        {
          id: '3',
          email: 'kkkk@naver.com',
          name: '효중',
          createdAt: '2023-11-15T04:46:38.187621',
          updatedAt: '2023-11-15T04:46:38.187621',
        },
      ],
    },
  ],
}

export const RESPONSE = {
  success: true,
  data: Array(50)
    .fill(0)
    .map((_, index) => ({
      id: `${Math.random().toString(36).substring(2, 10)}${Date.now()}`,
      user: {
        id: `${Math.random().toString(36).substring(2, 10)}${Date.now()}`,
        email: `user${index}@devcourse.com`,
        name: `김효중${index}`,
      },
      ReviewStatus: '진행중',
      isAnswered: index % 2 === 0, // 홀수 인덱스는 false로 설정
      submitAt: index % 2 === 1 ? new Date().toUTCString() : null,
      createdAt: new Date().toUTCString(),
      updateAt: new Date().toUTCString(),
    })),
}

export const RECIPIENT = {
  success: true,
  data: {
    receiverResponses: Array(50)
      .fill(0)
      .map((_, index) => ({
        user: {
          id: `${Math.random().toString(36).substring(2, 10)}${Date.now()}`,
          email: `kimbbang${index}@example.com`,
          name: `김빡빡${index}`,
        },
        responserCount: index,
        responserIds: Array(index)
          .fill(0)
          .map(
            () => `${Math.random().toString(36).substring(2, 10)}${Date.now()}`,
          ),
      })),
  },
}
