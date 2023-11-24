import { nanoid } from 'nanoid'
import { useState, useRef } from 'react'
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
    | 'RATING'
    | 'HEXASTAT'
  questionTitle: string
  questionDescription?: string
  answers: Answer[]
  role?: 'responser' | 'receiver'
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
    <p className="ml-[42.96px] mt-[0.5rem] text-base leading-5 md:mt-[0.62rem]">
      <StarRatingList rate={Number(value.value)} fixed={true} />
    </p>
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
  ref?: React.MutableRefObject<HTMLTextAreaElement | null>,
  role?: 'responser' | 'receiver',
) => (
  <article
    className="m-t-[1.25rem] accordion-content w-full text-black dark:text-white"
    key={nanoid()}
  >
    <div className="accordion-content ml-[0.63rem]">
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
          <div className="flex w-full flex-col p-[0.62rem]">
            <textarea
              ref={ref}
              className=" textarea m-0 h-auto w-full max-w-full overflow-auto  rounded-none border border-gray-200 text-sm"
              defaultValue={answers.map((answer) => answer.value as string)}
            ></textarea>

            <div className="ml-[0.63rem] flex gap-2 p-[0.62rem]">
              <IconButton
                disabled
                className="mt-[0.62rem] h-[1.875rem] rounded-md border-[1px] border-gray-200 bg-gray-400 text-sm text-black "
                text="정제"
              >
                <FilterReplyIcon className="h-[1rem] w-[1rem] " />
              </IconButton>

              <IconButton
                disabled
                className="mt-[0.62rem] h-[1.875rem] rounded-md border-[1px] border-gray-200 bg-gray-400 text-sm text-black "
                text="저장"
                onClick={() => console.log(ref?.current?.value)}
              ></IconButton>
            </div>
          </div>
        )}
    </div>
  </article>
)

const QuestionGroup = ({
  answers,
  questionType,
  questionTitle,
  role,
}: QuestionGroupProps) => {
  const [inputId] = useState(nanoid())
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null)

  return (
    <section className="  border-l-[1px] border-r-[1px] border-gray-200 bg-white dark:bg-black ">
      <input type="checkbox" id={inputId} className="accordion-toggle " />
      <label
        htmlFor={inputId}
        className="accordion-title ml-[0.62px] flex h-[2.5rem] justify-center border-b-[1px] border-r-[1px] border-t border-gray-200 bg-white text-lg dark:bg-black"
      >
        <div className="flex items-center justify-between">
          <h1 className="flex h-[2.75rem] items-center pl-[0.63rem] text-lg md:text-xl">
            {QUESTION_TYPE[questionType]}
            <span className="ml-[0.63rem] text-lg md:text-xl">
              {questionTitle}
            </span>
          </h1>
          <CloseDropDownIcon className="fill-black stroke-black text-black dark:fill-white dark:stroke-white dark:text-white" />
        </div>
      </label>

      {questionType !== 'HEXASTAT' &&
        answers?.map((value, index) =>
          renderResponseByQuestion(
            value,
            answers,
            questionType,
            index,
            textAreaRef,
            role,
          ),
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
    </section>
  )
}

export default QuestionGroup
