import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Header } from '@/components'
import { useCreateReview, useGetAllUser } from '@/apis/hooks'
import { ResponserSelect, ReviewEntry, ReviewQuestionAdder } from './components'
import { Review } from './types'

export const ReviewCreatePage = () => {
  const navigate = useNavigate()

  const { data: allUsers } = useGetAllUser()
  const { mutate: createReview } = useCreateReview()

  const [reviewStep, setReviewStep] = useState(1)

  const methods = useForm<Review>({
    defaultValues: {
      nonResponserIdList: allUsers,
    },
  })

  const handleCreateReview = () => {
    const responserIdList = methods.getValues('responserIdList')

    if (!responserIdList.length) {
      methods.setError('responserIdList', {
        type: 'required',
        message: '응답자를 선택해주세요.',
      })

      return
    }

    const requestData = {
      title: methods.getValues('title'),
      description: methods.getValues('description'),
      type: 'PEER_REVIEW',
      questions: methods.getValues('questions'),
      responserIdList: methods.getValues('responserIdList').map(({ id }) => id),
    } as const

    createReview(requestData, {
      onSuccess: ({ data }) => {
        console.log(data)
        navigate('/')
      },
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <button
        onClick={(e) => {
          e.preventDefault()

          if (reviewStep === 1) return
          setReviewStep(reviewStep - 1)
        }}
        className="btn w-fit self-center bg-pink-300"
      >
        이전 (임시 버튼)
      </button>

      <FormProvider {...methods}>
        {reviewStep === 1 && <ReviewEntry setReviewStep={setReviewStep} />}

        {reviewStep === 2 && (
          <ReviewQuestionAdder setReviewStep={setReviewStep} />
        )}

        {reviewStep === 3 && (
          <ResponserSelect handleClickButton={handleCreateReview} />
        )}
      </FormProvider>
    </div>
  )
}

export default ReviewCreatePage
