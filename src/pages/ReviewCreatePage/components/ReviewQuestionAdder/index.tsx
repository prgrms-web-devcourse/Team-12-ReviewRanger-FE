import { Dispatch, SetStateAction } from 'react'
import { SubmitHandler, useFormContext, useFieldArray } from 'react-hook-form'
import { PlusIcon } from '@/assets/icons'
import { QuestionItem, QuestionTypeModal } from '..'
import { Review } from '../../types'

interface ReviewQuestionAdderProps {
  setReviewStep: Dispatch<SetStateAction<number>>
}

const ReviewQuestionAdder = ({ setReviewStep }: ReviewQuestionAdderProps) => {
  const {
    getValues,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useFormContext<Review>()

  const {
    fields: questions,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'questions',
  })

  const onSubmit: SubmitHandler<Review> = () => {
    if (!questions.length) {
      setError('questions', {
        type: 'required',
        message: '질문을 추가해주세요.',
      })

      return
    }

    setReviewStep(3)
  }

  const title = getValues('title')
  const description = getValues('description')

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex h-full w-full max-w-[37.5rem] grow flex-col justify-between px-5 pb-10 pt-[1.87rem]"
    >
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-xl text-black dark:text-white md:text-2xl">
            {title}
          </h1>
          <p className="mt-[0.63rem] whitespace-pre-line text-sm text-black dark:text-white md:text-base">
            {description}
          </p>
        </div>

        {/* 질문 리스트 */}
        {questions.length !== 0 && (
          <ul className="flex flex-col gap-7">
            {questions.map((question, index) => (
              <QuestionItem
                key={question.id}
                question={question}
                index={index}
                {...{ remove, append }}
              />
            ))}
          </ul>
        )}

        <div>
          <label
            className="btn relative w-full rounded-md border border-gray-200 bg-main-hover-yellow text-lg text-black dark:border-gray-100 dark:bg-main-red-200 dark:text-white md:text-xl"
            htmlFor="modal-2"
          >
            <PlusIcon className="fill:black absolute left-2.5 dark:fill-white" />
            <p>질문 추가하기</p>
          </label>
          <input className="modal-state" id="modal-2" type="checkbox" />
          <QuestionTypeModal append={append} />

          {errors.questions && (
            <p className="mt-1 text-xs text-sub-red-200 dark:text-sub-yellow md:text-sm">
              {errors.questions.message}
            </p>
          )}
        </div>
      </div>

      <div className="sticky bottom-10 flex gap-x-5 self-end">
        <button
          className="h-10 w-24 rounded-md bg-active-orange text-lg text-white dark:text-black"
          type="button"
        >
          미리보기
        </button>
        <button className="h-10 w-24 rounded-md bg-active-orange text-lg text-white dark:text-black">
          다음
        </button>
      </div>
    </form>
  )
}

export default ReviewQuestionAdder
