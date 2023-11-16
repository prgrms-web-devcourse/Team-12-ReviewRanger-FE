import { nanoid } from 'nanoid'
import { useRef, useEffect } from 'react'
import { StarRatingList } from '@/components'
import { CloseDropDown, BasicProfileIcon } from '@/assets/icons'
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
        <h2>{value?.name}</h2>
        {filteredAnswers.map((value) => (
          <>
            <h3 className="flex">
              <BasicProfileIcon />
              {value.userName}
            </h3>
            <p>{value.value}</p>
          </>
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
      <p>{value?.value}</p>
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
          <CloseDropDown className="fill-black stroke-black text-black dark:fill-white dark:stroke-white dark:text-white" />
        </div>
      </label>

      {answers.map((value) => {
        return (
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
            </div>
          </article>
        )
      })}
    </section>
  )
}

export default QuestionGroup
