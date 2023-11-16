import { nanoid } from 'nanoid'
import { useRef, useEffect } from 'react'
import { IconButton, StarRatingList } from '@/components'
import {
  CloseDropDownIcon,
  BasicProfileIcon,
  FilterReplyIcon,
} from '@/assets/icons'
import { QUESTION_TYPE } from '../../constants'

interface QuestionGroupProps {
  questionType:
    | 'SINGLE_CHOICE'
    | 'MULTIPLE_CHOICE'
    | 'DROPDOWN'
    | 'SUBJECTIVE'
    | 'STAR_RATING'
    | 'HEXASTAT'
  questionTitle: string
  questionDescription?: string
  answers: Answer[]
}

interface Answer {
  name?: string
  value: string | number | null
  userName: string
}

const QuestionGroup = ({
  answers,
  questionType,
  questionTitle,
}: QuestionGroupProps) => {
  const dropDownRef = useRef<HTMLInputElement | null>(null)
  const inputId = useRef<string>(nanoid())

  useEffect(() => {
    inputId.current = nanoid()
  }, [])

  const renderStarRating = (value: Answer) => (
    <div>
      <h3 className="flex">
        <BasicProfileIcon /> {value.userName}
      </h3>
      <StarRatingList rate={Number(value.value)} fixed={true} />
    </div>
  )

  const renderHexaStat = (value: Answer) => {
    const filteredAnswers = answers.filter(
      (answer) => answer?.name === value.name,
    )

    return (
      <>
        <h2 className="flex h-[1.375rem] w-[3rem] items-center justify-center bg-gray-300 text-sm text-white">
          {value?.name}
        </h2>
        {filteredAnswers.map((value) => (
          <div className="flex" key={nanoid()}>
            <BasicProfileIcon />
            <p>{value.userName}</p>
            <p>{value.value}</p>
          </div>
        ))}
      </>
    )
  }

  const renderDefault = (value: Answer) => (
    <>
      <h3 className="flex">
        <BasicProfileIcon />
        {value?.userName}
      </h3>
      <p className="leading-5">{value?.value}</p>
    </>
  )

  return (
    <section className="border-b-0 border-l-[1px] border-r-[1px] border-t border-gray-200 bg-white dark:bg-black">
      <input
        type="checkbox"
        id={inputId.current}
        ref={dropDownRef}
        className="accordion-toggle"
      />
      <label
        htmlFor={inputId.current}
        className="accordion-title ml-[0.62px] flex h-[2.5rem] justify-center bg-white text-lg dark:bg-black"
      >
        <div className="flex items-center justify-between">
          <h1 className="flex items-center pl-[0.63rem]">
            {QUESTION_TYPE[questionType]}
            <span className="ml-[0.63rem]"> {questionTitle}</span>
          </h1>
          <CloseDropDownIcon className="fill-black stroke-black text-black dark:fill-white dark:stroke-white dark:text-white" />
        </div>
      </label>

      {answers.map((value, index) => (
        <article
          className="m-t-[1.25rem] accordion-content border-gray-200 text-black dark:text-white"
          key={nanoid()}
        >
          <div className="accordion-content ml-[0.63rem]">
            {(() => {
              switch (questionType) {
                case 'STAR_RATING':
                  return renderStarRating(value)
                case 'HEXASTAT':
                  return renderHexaStat(value)
                default:
                  return renderDefault(value)
              }
            })()}
            {questionType === 'SUBJECTIVE' && answers.length - 1 === index && (
              <div className="mr-[0.62rem] flex items-end justify-end">
                <IconButton
                  disabled
                  className=" m-0 h-[1.875rem] w-[5rem] rounded-md bg-gray-400 text-sm"
                  text="정제"
                >
                  <FilterReplyIcon className="h-[1rem] w-[1rem] fill-white stroke-black dark:fill-black dark:stroke-white" />
                </IconButton>
              </div>
            )}
          </div>
        </article>
      ))}
    </section>
  )
}

export default QuestionGroup
