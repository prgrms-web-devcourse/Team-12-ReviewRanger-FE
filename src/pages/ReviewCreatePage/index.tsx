import { useGetAllUser, useCreateReview } from '@/apis/hooks'

const surveyDummy = {
  title: 'Survey 1',
  description: 'Description 1',
  type: 'Type 1',
  questions: [
    {
      title: 'Question 1',
      type: 'Question Type 1',
      options: 'Option 1, Option 2, Option 3',
      sequence: 1,
      isDuplicated: true,
      isRequired: true,
    },
  ],
  responserIdList: [1, 2, 3, 4, 5],
}

const ReviewCreatePage = () => {
  const { data: allUsers } = useGetAllUser()
  const { mutate: createReview } = useCreateReview()

  const handleButtonClick = () => {
    createReview(surveyDummy, {
      onSuccess: ({ data }) => {
        console.log(data)
      },
    })
  }

  console.log(allUsers)

  return (
    <div>
      <h1>리뷰 생성 페이지</h1>
      <button className="btn" onClick={handleButtonClick}>
        리뷰 생성
      </button>
    </div>
  )
}

export default ReviewCreatePage
