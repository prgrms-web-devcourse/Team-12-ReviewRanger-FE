import { useCreateResponse } from '@/apis/hooks'

const response = {
  id: 2,
  userId: 812,
  results: [
    {
      reviewerId: 12,
      answers: [
        {
          questionId: 98,
          questionType: 'hexa',
          answer: ['바보: 5', '멍청이: 1'],
        },
        {
          questionId: 99,
          questionType: '주관식',
          answer: ['아니 이건 테스트 더미 데이터라고!'],
        },
      ],
    },
  ],
}

const ReviewReplyPage = () => {
  const { mutate: createResponse } = useCreateResponse()

  const handleButtonClick = () => {
    createResponse(response, {
      onSuccess: ({ data }) => console.log(data),
    })
  }

  return (
    <div>
      <div>답변 페이지</div>
      <button className="btn" onClick={handleButtonClick}>
        답변 페이지 api 테스트
      </button>
    </div>
  )
}

export default ReviewReplyPage
