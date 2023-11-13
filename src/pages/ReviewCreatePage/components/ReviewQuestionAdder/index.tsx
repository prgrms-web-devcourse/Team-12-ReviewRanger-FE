import { Dispatch, SetStateAction } from 'react'
import { PlusIcon } from '@/assets/icons'
import { QuestionItem } from '..'

interface ReviewQuestionAdderProps {
  title: string
  description: string
  setReviewStep: Dispatch<SetStateAction<number>>
}

const ReviewQuestionAdder = ({
  title,
  description,
  setReviewStep,
}: ReviewQuestionAdderProps) => {
  return (
    <>
      <h1 className="text-xl text-black dark:text-white">{title}</h1>
      <p className="mt-[0.63rem] text-sm text-black dark:text-white">
        {description}
      </p>

      {/* 질문 리스트 */}
      <QuestionItem />

      <button
        className="btn relative mt-9 w-full rounded-md border border-gray-200 bg-main-yellow text-black dark:border-gray-100 dark:bg-main-red-200 dark:text-white"
        onClick={() => console.log('질문 추가하기')}
      >
        <PlusIcon className="fill:black absolute left-2.5 dark:fill-white" />{' '}
        질문 추가하기
      </button>
    </>
  )
}

export default ReviewQuestionAdder
