import { useGetAllUser, useCreateReview } from '@/apis/hooks'
import { Survey } from '@/apis/hooks/useCreateReview'
import { ReviewEntry, ReviewQuestionAdder } from './components'
import { useState } from 'react'
import { Header } from '@/components'

const surveyDummy: Survey = {
  title: '7, 8월 두 달 간 함께 했던 1차 팀 피어들에 대한 리뷰를 작성해주세요.',
  description: '',
  type: 'PEER_REVIEW',
  questions: [
    {
      title: 'Question 1',
      type: 'MULTIPLE_CHOICE',
      options: [
        {
          optionName: 'Option 1',
        },
        {
          optionName: 'Option 2',
        },
        {
          optionName: 'Option 3',
        },
        {
          optionName: 'Option 4',
        },
        {
          optionName: 'Option 5',
        },
      ],
      isRequired: true,
    },
    {
      title: 'Question 2',
      type: 'SINGLE_CHOICE',
      options: [
        {
          optionName: 'Option 1',
        },
        {
          optionName: 'Option 2',
        },
        {
          optionName: 'Option 3',
        },
        {
          optionName: 'Option 4',
        },
        {
          optionName: 'Option 5',
        },
      ],
      isRequired: true,
    },
    {
      title: 'Question 3',
      type: 'DROPDOWN',
      options: [
        {
          optionName: 'Option 1',
        },
        {
          optionName: 'Option 2',
        },
        {
          optionName: 'Option 3',
        },
        {
          optionName: 'Option 4',
        },
        {
          optionName: 'Option 5',
        },
      ],
      isRequired: true,
    },
    {
      title: 'Question 4',
      type: 'SUBJECTIVE',
      options: [],
      isRequired: true,
    },
    {
      title: 'Question 5',
      type: 'STAR_RATING',
      options: [],
      isRequired: true,
    },
  ],
  responserIdList: [1, 2, 3, 4, 5],
}

const ReviewCreatePage = () => {
  // const { data: allUsers } = useGetAllUser()
  const { mutate: createReview } = useCreateReview()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [reviewStep, setReviewStep] = useState(1)

  const handleButtonClick = () => {
    createReview(surveyDummy, {
      onSuccess: ({ data }) => {
        console.log(data)
      },
    })
  }

  return (
    <div className="flex h-screen flex-col">
      <Header />

      <div className="mx-auto w-full max-w-[1000px] grow px-5 pb-10 pt-[1.87rem]">
        {reviewStep === 1 && (
          <ReviewEntry
            setTitle={setTitle}
            setDescription={setDescription}
            setReviewStep={setReviewStep}
          />
        )}

        {reviewStep === 2 && (
          <ReviewQuestionAdder
            title={title}
            description={description}
            setReviewStep={setReviewStep}
          />
        )}

        {/* <button className="btn" onClick={handleButtonClick}>
      리뷰 생성
    </button> */}
      </div>
    </div>
  )
}

export default ReviewCreatePage
