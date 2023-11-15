import { Dispatch, SetStateAction } from 'react'
import { SubmitHandler, useFormContext } from 'react-hook-form'
import { Review } from '../../types'

interface ReviewEntryProps {
  setReviewStep: Dispatch<SetStateAction<number>>
}

const ReviewEntry = ({ setReviewStep }: ReviewEntryProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<Review>()

  const TITLE_STYLE = 'text-lg text-black dark:text-white md:text-xl'
  const INPUT_STYLE =
    'border-gray-200 w-full rounded-md border bg-white p-3 text-sm text-black outline-none dark:bg-main-gray dark:text-white mt-2.5 placeholder:text-gray-100 md:text-base'

  const onSubmit: SubmitHandler<Review> = () => {
    setReviewStep(2)
  }

  return (
    <form
      className="mx-auto flex h-full w-full max-w-[880px] grow flex-col justify-between px-5 pb-10 pt-[1.87rem]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-[1.88rem]">
        <div>
          <label htmlFor="title" className={TITLE_STYLE}>
            설문 제목
          </label>
          <input
            placeholder="설문 제목을 입력해주세요."
            type="text"
            className={`${INPUT_STYLE}`}
            {...register('title', {
              required: '제목을 입력해주세요.',
              maxLength: {
                value: 30,
                message: '30자 이내로 작성해주세요.',
              },
              setValueAs: (value) => value.trim(),
            })}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
              }
            }}
          />
          {errors.title && (
            <p className="mt-1 text-xs text-sub-red-200 dark:text-sub-yellow md:text-sm">
              {errors.title.message}
            </p>
          )}
        </div>

        <div>
          <label className={TITLE_STYLE}>설문 내용</label>
          <textarea
            placeholder="설문 설명을 입력해주세요."
            className={`h-[12.5rem] ${INPUT_STYLE} resize-none`}
            {...register('description', {
              required: '내용을 입력해주세요.',
              maxLength: {
                value: 300,
                message: '300자 이내로 작성해주세요.',
              },
              setValueAs: (value) => value.trim(),
            })}
          ></textarea>
          {errors.description && (
            <p className="text-xs text-sub-red-200 dark:text-sub-yellow md:text-sm">
              {errors.description.message}
            </p>
          )}
        </div>
      </div>

      <button className="font-lg btn sticky bottom-10 w-full self-end rounded-md bg-active-orange text-white dark:text-black md:w-fit md:px-8">
        다음
      </button>
    </form>
  )
}

export default ReviewEntry
