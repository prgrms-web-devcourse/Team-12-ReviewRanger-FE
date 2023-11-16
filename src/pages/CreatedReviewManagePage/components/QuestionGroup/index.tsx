import { nanoid } from 'nanoid'
import { useRef, useEffect } from 'react'
import { StarRatingList } from '@/components'
import { CloseDropDown } from '@/assets/icons'
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
    <span>
      {value.userName}
      <StarRatingList rate={Number(value.value)} fixed={true} />
    </span>
  )

  const renderHexaStat = (value: Answer) => {
    const filteredAnswers = answers.filter(
      (answer) => answer?.name === value.name,
    )

    return (
      <>
        <p>{value?.name}</p>
        {filteredAnswers.map((value) => (
          <>
            <span>{value.userName}</span>
            <span>{value.value}</span>
          </>
        ))}
      </>
    )
  }

  const renderDefault = (value: Answer) => (
    <>
      <span>{value?.userName}</span>
      <span>{value?.value}</span>
    </>
  )

  return (
    <div className="border-b-0 border-l-[1px] border-r-[1px] border-t border-gray-200 bg-white dark:bg-black">
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
          <span className="flex items-center pl-[0.63rem]">
            {QUESTION_TYPE[questionType]}
            <span className="ml-[0.63rem]"> {questionTitle}</span>
          </span>
          <CloseDropDown className="fill-black stroke-black text-black dark:fill-white dark:stroke-white dark:text-white" />
        </div>
      </label>

      {answers.map((value) => {
        return (
          <div
            className="m-t-[1.25rem] accordion-content border-gray-200 text-black dark:text-white"
            key={nanoid()}
          >
            <div className="accordion-content">
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
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default QuestionGroup
