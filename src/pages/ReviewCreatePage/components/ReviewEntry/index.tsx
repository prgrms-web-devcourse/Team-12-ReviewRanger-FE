import { Dispatch, SetStateAction } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

interface ReviewEntryProps {
  setTitle: Dispatch<SetStateAction<string>>
  setDescription: Dispatch<SetStateAction<string>>
  setReviewStep: Dispatch<SetStateAction<number>>
}

interface Inputs {
  title: string
  description: string
}

const ReviewEntry = ({
  setTitle,
  setDescription,
  setReviewStep,
}: ReviewEntryProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = ({ title, description }) => {
    console.log(title, description)

    setTitle(title)
    setDescription(description)
    setReviewStep(2)
  }

  const TITLE_STYLE = 'text-lg text-black dark:text-white'
  const INPUT_STYLE =
    'broder-gray-200 w-full rounded-md border bg-white p-3 text-sm text-black outline-none dark:bg-main-gray dark:text-white mt-2.5'

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-full flex-col justify-between gap-[1.88rem]"
      >
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
            })}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
              }
            }}
          />
          {errors.title && (
            <p className="mt-1 text-xs text-sub-red-200">
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
            })}
          ></textarea>
          {errors.description && (
            <p className="text-xs text-sub-red-200">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="relative grow">
          <button className="font-lg btn absolute bottom-0 w-full bg-active-orange text-white dark:text-black">
            다음
          </button>
        </div>
      </form>
    </>
  )
}

export default ReviewEntry
