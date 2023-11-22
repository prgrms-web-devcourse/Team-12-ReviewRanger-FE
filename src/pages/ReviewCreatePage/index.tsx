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

  const validateResponserIdList = (
    responserIdList: Review['responserIdList'],
  ) => {
    if (!responserIdList.length) {
      methods.setError('responserIdList', {
        type: 'required',
        message: '응답자를 선택해주세요.',
      })

      return false
    }

    return true
  }

  const handleCreateReview = () => {
    const responserIdList = methods.getValues('responserIdList')

    if (!validateResponserIdList(responserIdList)) {
      return
    }

    const requestData = {
      title: methods.getValues('title'),
      description: methods.getValues('description'),
      type: 'PEER_REVIEW',
      questions: methods.getValues('questions'),
      responserIdList: methods
        .getValues('responserIdList')
        .map(({ receiverId }) => receiverId),
    } as const

    createReview(requestData, {
      onSuccess: ({ data }) => {
        console.log(data)
        if (data.success) {
          navigate('/')

          return
        }

        // TODO: 리뷰 생성에 실패하였습니다.
        alert('리뷰 생성에 실패하였습니다.')
      },
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <button
        onClick={() => {
          reviewStep > 1 && setReviewStep(reviewStep - 1)
        }}
        type="button"
        className="btn w-fit self-center bg-pink-300"
      >
        이전 (임시 버튼)
      </button>

      <FormProvider {...methods}>
        {(() => {
          switch (reviewStep) {
            case 1:
              return <ReviewEntry setReviewStep={setReviewStep} />

            case 2:
              return <ReviewQuestionAdder setReviewStep={setReviewStep} />

            case 3:
              return <ResponserSelect handleClickButton={handleCreateReview} />

            default:
              return null
          }
        })()}
      </FormProvider>
    </div>
  )
}

export default ReviewCreatePage
