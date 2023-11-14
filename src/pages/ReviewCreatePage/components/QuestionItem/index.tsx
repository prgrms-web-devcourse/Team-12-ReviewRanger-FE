import { Dispatch, SetStateAction } from 'react'
import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { MenuIcon, MultipleCheckIcon } from '@/assets/icons'
import { Question } from '../../types'

interface Inputs {
  title: string
  description: string
}

interface QuestionItemProps {
  question: Question
  setQuestions: Dispatch<SetStateAction<Question[]>>
  index: number
  register: UseFormRegister<Inputs>
  errors: FieldErrors<Inputs>
}

const QuestionItem = ({
  question,
  setQuestions,
  index,
  register,
  errors,
}: QuestionItemProps) => {
  return (
    <div className="rounded-md border border-gray-200 bg-white p-2.5 dark:border-gray-100 dark:bg-main-gray">
      <div className="mb-2.5 flex justify-between">
        <div className="flex gap-2">
          <MultipleCheckIcon className="stroke-black dark:stroke-white" />
          <p className="text-lg text-black dark:text-white">
            객관식 (다중 선택)
          </p>
        </div>
        <MenuIcon
          className="cursor-pointer"
          onClick={() => console.log('메뉴 누름')}
        />
      </div>

      <input
        placeholder="질문 제목을 입력해주세요."
        className="w-full border border-gray-200 bg-white p-2.5 text-sm text-black outline-none dark:text-white"
        {...register('title', {
          required: '제목을 입력해주세요.',
          maxLength: {
            value: 30,
            message: '30자 이내로 작성해주세요.',
          },
        })}
        onKeyUp={(e) => {
          if (e.key) {
            e.preventDefault()
          }
        }}
      />
      {errors.title && (
        <p className="mt-1 text-xs text-sub-red-200">{errors.title.message}</p>
      )}
    </div>
  )
}

export default QuestionItem
