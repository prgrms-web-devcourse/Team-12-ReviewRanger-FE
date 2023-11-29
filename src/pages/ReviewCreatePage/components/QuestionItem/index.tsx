import { Fragment } from 'react'
import {
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  useFormContext,
  useFieldArray,
} from 'react-hook-form'
import { Dropdown } from '@/components'
import { CloseIcon, MenuIcon } from '@/assets/icons'
import { Review } from '../../types'
import { QUESTION_TYPES } from './constants'

interface QuestionItemProps {
  index: number
  question: FieldArrayWithId<Review, 'questions', 'id'>
  remove: UseFieldArrayRemove
  append: UseFieldArrayAppend<Review, 'questions'>
}

const QuestionItem = ({
  index,
  question,
  remove,
  append,
}: QuestionItemProps) => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<Review>()

  const {
    fields: questionOptions,
    append: appendOption,
    remove: removeOption,
  } = useFieldArray({
    control,
    name: `questions.${index}.questionOptions`,
  })

  const { type } = question
  const { label, Icon, iconStyle } = QUESTION_TYPES[type]

  return (
    <li className="flex flex-col gap-y-5 rounded-md border border-gray-200 bg-white p-2.5 dark:border-gray-100 dark:bg-main-gray">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <i
            className={`${
              iconStyle === 'fill'
                ? 'fill-black dark:fill-white'
                : 'stroke-black dark:stroke-white'
            }`}
          >
            {Icon}
          </i>
          <p className="text-lg text-black dark:text-white md:text-xl">
            {label}
          </p>
        </div>

        <Dropdown>
          <Dropdown.Toggle>
            <MenuIcon className="cursor-pointer stroke-black dark:stroke-white" />
          </Dropdown.Toggle>
          <Dropdown.Menu className="w-32 rounded-sm">
            <Dropdown.Item onClick={() => append(question)}>
              <p className="dark:text-white">질문 복제</p>
            </Dropdown.Item>
            <Dropdown.Item onClick={() => remove(index)}>
              <p className="dark:text-white">질문 삭제</p>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div>
        <input
          placeholder="질문 제목을 입력해주세요."
          className="w-full border border-gray-200 bg-white p-2.5 text-sm text-black outline-none placeholder:text-gray-100 dark:bg-main-gray dark:text-white md:text-base"
          {...register(`questions.${index}.title`, {
            required: '제목을 입력해주세요.',
            maxLength: {
              value: 30,
              message: '30자 이내로 작성해주세요.',
            },
            setValueAs: (value: string) => value.trim(),
          })}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
            }
          }}
        />
        {errors.questions?.[index]?.title && (
          <p className="mt-1 text-xs text-sub-red-200 dark:text-sub-yellow md:text-sm">
            {errors.questions?.[index]?.title?.message}
          </p>
        )}

        <textarea
          placeholder="질문에 대한 설명을 입력해주세요."
          className="mt-4 h-24 w-full border border-gray-200 bg-white p-2.5 text-sm text-black outline-none placeholder:text-gray-100 dark:bg-main-gray dark:text-white md:text-base"
          {...register(`questions.${index}.description`, {
            maxLength: {
              value: 200,
              message: '200자 이내로 작성해주세요.',
            },
            setValueAs: (value: string) => value.trim(),
          })}
        />
        {errors.questions?.[index]?.description && (
          <p className="mt-1 text-xs text-sub-red-200 dark:text-sub-yellow md:text-sm">
            {errors.questions?.[index]?.description?.message}
          </p>
        )}
      </div>

      {(type === 'SINGLE_CHOICE' ||
        type === 'MULTIPLE_CHOICE' ||
        type === 'DROPDOWN') && (
        <ul className="border-t border-t-gray-100 pt-5">
          {questionOptions.map((questionOption, optionIndex) => (
            <Fragment key={questionOption.id}>
              <li className="mb-2.5 w-full border border-gray-200 last:mb-0 dark:border-gray-100">
                <div className="flex items-center pr-2.5">
                  <input
                    className="grow bg-white p-2.5 text-sm text-black outline-none placeholder:text-gray-100 dark:bg-main-gray dark:text-white md:text-base"
                    placeholder={`옵션 ${optionIndex + 1}`}
                    {...register(
                      `questions.${index}.questionOptions.${optionIndex}.optionName`,
                      {
                        required: '옵션을 입력해주세요.',
                        maxLength: {
                          value: 30,
                          message: '30자 이내로 작성해주세요.',
                        },
                        setValueAs: (value: string) => value.trim(),
                      },
                    )}
                  />
                  <CloseIcon
                    className="cursor-pointer fill-black dark:fill-white"
                    onClick={() => {
                      if (questionOptions.length <= 2) {
                        return
                      }
                      removeOption(optionIndex)
                    }}
                  />
                </div>
              </li>
              {errors.questions?.[index]?.questionOptions?.[optionIndex] && (
                <p className="mb-2.5 mt-1 text-xs text-sub-red-200 dark:text-sub-yellow md:text-sm">
                  {
                    errors.questions?.[index]?.questionOptions?.[optionIndex]
                      ?.optionName?.message
                  }
                </p>
              )}
            </Fragment>
          ))}
          <li
            className="btn mt-2.5 w-full cursor-pointer rounded-md border border-gray-200 bg-main-yellow p-2.5 text-center text-sm text-black dark:border-gray-100 dark:bg-gray-300 dark:text-white md:text-base"
            onClick={() => appendOption({ optionName: '' })}
          >
            옵션 추가
          </li>
        </ul>
      )}

      {type === 'HEXASTAT' && (
        <ul className="grid grid-cols-3 gap-4">
          {questionOptions.map((questionOption, optionIndex) => (
            <Fragment key={questionOption.id}>
              <li>
                <input
                  className="w-full border border-gray-200 bg-white p-2.5 text-sm text-black outline-none placeholder:text-gray-100 dark:bg-main-gray dark:text-white md:text-base"
                  placeholder={`스탯 ${optionIndex + 1}`}
                  {...register(
                    `questions.${index}.questionOptions.${optionIndex}.optionName`,
                    {
                      required: '스탯을 입력해주세요.',
                      maxLength: {
                        value: 10,
                        message: '10자 이내로 작성해주세요.',
                      },
                      setValueAs: (value: string) => value.trim(),
                    },
                  )}
                />
                {errors.questions?.[index]?.questionOptions?.[optionIndex] && (
                  <p className="mb-2.5 mt-1 text-xs text-sub-red-200 dark:text-sub-yellow md:text-sm">
                    {
                      errors.questions?.[index]?.questionOptions?.[optionIndex]
                        ?.optionName?.message
                    }
                  </p>
                )}
              </li>
            </Fragment>
          ))}
        </ul>
      )}

      <div className="flex justify-end gap-2.5">
        <input
          type="checkbox"
          defaultChecked={question.isRequired}
          {...register(`questions.${index}.isRequired`)}
        />
        <p className="text-sm dark:text-white md:text-base">필수 질문 여부</p>
      </div>
    </li>
  )
}

export default QuestionItem
