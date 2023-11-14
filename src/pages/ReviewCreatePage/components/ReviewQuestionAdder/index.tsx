import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { v4 as getRandomId } from 'uuid'
import { PlusIcon } from '@/assets/icons'
import { QuestionItem, QuestionTypeSelect } from '..'
import { Question } from '../../types'

interface ReviewQuestionAdderProps {
  title: string
  description: string
  setReviewStep: Dispatch<SetStateAction<number>>
}

type Inputs = {
  title: string
  description: string
}

const ReviewQuestionAdder = ({
  title,
  description,
  setReviewStep,
}: ReviewQuestionAdderProps) => {
  const [questions, setQuestions] = useState<Question[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  useEffect(() => console.log(questions), [questions])

  return (
    <form
      onSubmit={handleSubmit(() => console.log('등,,록,,하기,,'))}
      className="flex h-full flex-col gap-8"
    >
      <div>
        <h1 className="text-xl text-black dark:text-white">{title}</h1>
        <p className="mt-[0.63rem] text-sm text-black dark:text-white">
          {description}
        </p>
      </div>

      {/* 질문 리스트 */}
      <div>
        {questions.map((question, index) => (
          <QuestionItem
            key={getRandomId()}
            question={question}
            setQuestions={setQuestions}
            register={register}
            errors={errors}
          />
        ))}
        <QuestionItem register={register} errors={errors} />
      </div>

      <div>
        <label
          className="btn relative w-full rounded-md border border-gray-200 bg-main-yellow text-black dark:border-gray-100 dark:bg-main-red-200 dark:text-white"
          htmlFor="modal-2"
        >
          <PlusIcon className="fill:black absolute left-2.5 dark:fill-white" />
          질문 추가하기
        </label>
        <input className="modal-state" id="modal-2" type="checkbox" />
        <QuestionTypeSelect setQuestions={setQuestions} />
      </div>

      <div className="relative flex grow justify-end">
        <div className="absolute bottom-0 flex gap-x-5">
          <button
            className="h-10 w-24 rounded-md bg-active-orange text-lg text-white dark:text-black"
            onClick={(e) => e.preventDefault()}
          >
            미리보기
          </button>
          <button
            onClick={() => setReviewStep(3)}
            className="h-10 w-24 rounded-md bg-active-orange text-lg text-white dark:text-black"
          >
            다음
          </button>
        </div>
      </div>
    </form>
  )
}

export default ReviewQuestionAdder
