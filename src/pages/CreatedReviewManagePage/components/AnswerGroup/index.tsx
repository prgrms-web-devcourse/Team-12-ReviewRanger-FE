import { nanoid } from 'nanoid'
import { useState } from 'react'
import { StarRatingList } from '@/components'
import { CloseDropDownIcon, BasicProfileIcon } from '@/assets/icons'
import { QUESTION_TYPE } from '../../constants'
import RenderRefinedSubjective from './RenderRefinedSubjective'

interface QuestionGroupProps {
  questionType:
    | 'SINGLE_CHOICE'
    | 'MULTIPLE_CHOICE'
    | 'DROPDOWN'
    | 'SUBJECTIVE'
    | 'RATING'
    | 'HEXASTAT'
  questionTitle: string
  questionDescription?: string
  answers: Answer[]
  role?: 'responser' | 'receiver'
  onClickCleanButton?: (answer: string) => void
}

interface Answer {
  name?: string
  value: string | number | null
  userName: string
}

const renderStarRating = (value: Answer) => (
  <div>
    <h3 className="flex items-center">
      <BasicProfileIcon className="avatar h-[1.25rem] w-[1.25rem] border dark:bg-white dark:fill-white" />
      <p className="ml-[1.31rem] text-sm">{value.userName}</p>
    </h3>
    <div className="ml-[42.96px] mt-[0.5rem] text-base leading-5 md:mt-[0.62rem]">
      <StarRatingList rate={Number(value.value)} fixed={true} />
    </div>
  </div>
)

const renderHexaStat = (value: Answer, answers: Answer[]) => {
  const filteredAnswers = answers.filter((answer) => answer.name === value.name)

  return (
    <>
      <div>
        <h2 className="mb-[0.81rem] flex h-[1.375rem] w-[3rem] items-center justify-center bg-gray-300 text-sm text-white">
          {value?.name}
        </h2>
      </div>
      <div className="flex">
        {filteredAnswers.map((value) => (
          <div className="flex w-3/6 flex-wrap gap-[0.31rem]" key={nanoid()}>
            <BasicProfileIcon className="avatar h-[1.25rem] w-[1.25rem] border dark:bg-white dark:fill-white" />
            <p className="text-sm">{value?.userName}</p>
            <p className="text-sm text-sub-wine">{value?.value}</p>
          </div>
        ))}
      </div>
    </>
  )
}

const renderDefault = (value: Answer) => (
  <>
    <h3 className="flex items-center ">
      <BasicProfileIcon className="avatar h-[1.25rem] w-[1.25rem] border dark:bg-white dark:fill-white" />
      <p className="ml-[1.31rem] text-sm">{value?.userName}</p>
    </h3>
    <p className="ml-[42.96px] mt-[0.5rem] break-all  text-base leading-5 md:mt-[0.62rem]">
      {value?.value}
    </p>
  </>
)

const renderResponseByQuestion = (
  value: Answer,
  answers: Answer[],
  questionType: string,
  index?: number,
  role?: 'responser' | 'receiver',
) => (
  <article
    className="accordion-content w-full border-x border-gray-200 text-black dark:text-white"
    key={nanoid()}
  >
    <div className="accordion-content border-none px-2.5">
      {(() => {
        switch (questionType) {
          case 'RATING':
            return renderStarRating(value)
          case 'HEXASTAT':
            return renderHexaStat(value, answers)
          default:
            return renderDefault(value)
        }
      })()}
      {role !== 'responser' &&
        questionType === 'SUBJECTIVE' &&
        answers.length - 1 === index && (
          <RenderRefinedSubjective
            text={answers.map(({ value }) => value).join('\n')}
          />
        )}
    </div>
  </article>
)

const QuestionAnswerRenderer = ({
  answers,
  questionType,
  questionTitle,
  role,
}: QuestionGroupProps) => {
  const [inputId] = useState(nanoid())

  return (
    <div
      className={`${
        role === 'responser' ? 'accordion accordion-open' : 'accordion'
      } bg-white dark:bg-main-gray`}
    >
      <input type="checkbox" id={inputId} className="accordion-toggle" />
      <label
        htmlFor={inputId}
        className="accordion-title flex h-10 justify-center border border-gray-200 bg-white px-2.5 text-lg dark:border-gray-400 dark:bg-main-gray"
      >
        <div className="flex h-11 items-center text-lg md:text-xl">
          {QUESTION_TYPE[questionType]}
          <span className="ml-[0.63rem] text-lg md:text-xl">
            {questionTitle}
          </span>
        </div>

        <span className="accordion-icon absolute top-1/2 flex -translate-y-1/2 items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
          </svg>
        </span>
      </label>

      {questionType !== 'HEXASTAT' &&
        answers?.map((value, index) =>
          renderResponseByQuestion(value, answers, questionType, index, role),
        )}

      {questionType === 'HEXASTAT' &&
        answers
          ?.filter(
            (answer, index, self) =>
              index === self?.findIndex((a) => a.name === answer.name),
          )
          ?.map((value) =>
            renderResponseByQuestion(value, answers, questionType),
          )}
    </div>
  )
}

export default QuestionAnswerRenderer
