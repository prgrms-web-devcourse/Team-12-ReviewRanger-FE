import { nanoid } from 'nanoid'
import { useCallback, useState, memo } from 'react'
import { BasicProfile } from '@/assets/images'
import { QUESTION_TYPE } from '../../constants'
import RenderHexaStat from './RenderHexaStat'
import RenderStarRatingAnswer from './RenderStarRatingAnswer'
import RenderSubjectiveAnswer from './RenderSubjectiveAnswer'

interface QuestionGroupProps {
  questionType:
    | 'SINGLE_CHOICE'
    | 'MULTIPLE_CHOICE'
    | 'DROPDOWN'
    | 'SUBJECTIVE'
    | 'RATING'
    | 'HEXASTAT'
  questionTitle: string
  questionId: number
  answers: Answer[]
  reviewId: string
  userId: string
  role?: 'responser' | 'receiver'
  reviewStatus?: 'END' | 'DEADLINE' | 'PROCEEDING'
}

export interface Answer {
  name?: string
  value: string | number | null
  userName: string
}

const renderDefault = (value: Answer) => (
  <>
    <h3 className="flex items-center ">
      <img
        src={BasicProfile}
        className="avatar h-5 w-5 border dark:bg-white dark:fill-white"
      />
      <p className="ml-5 text-sm md:text-lg">{value?.userName}</p>
    </h3>
    <p className="ml-10 mt-2 break-all text-base leading-6 md:mt-2.5 md:text-xl">
      {value?.value}
    </p>
  </>
)

const QuestionAnswerRenderer = memo(
  ({
    answers,
    questionType,
    questionTitle,
    role,
    questionId,
    reviewId,
    userId,
    reviewStatus,
  }: QuestionGroupProps) => {
    const [inputId] = useState(nanoid())
    const renderResponseByQuestion = useCallback(
      (
        questionId: number,
        reviewId: string,
        userId: string,
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
          <div className="accordion-content border-none px-4">
            {(() => {
              switch (questionType) {
                case 'RATING':
                  return (
                    <RenderStarRatingAnswer
                      userName={value.userName}
                      value={value.value}
                    />
                  )
                case 'HEXASTAT':
                  return <RenderHexaStat value={value} answers={answers} />
                case 'SUBJECTIVE':
                  return (
                    <RenderSubjectiveAnswer
                      text={answers.map(({ value }) => value).join('\n')}
                      questionId={questionId}
                      reviewId={Number(reviewId)}
                      userId={userId}
                      value={value}
                      role={role}
                      isLastAnswer={answers.length - 1 === index}
                      reviewStatus={reviewStatus}
                    />
                  )
                default:
                  return renderDefault(value)
              }
            })()}
          </div>
        </article>
      ),
      [],
    )

    return (
      <div
        className={`${
          role === 'responser' ? 'accordion accordion-open' : 'accordion'
        } bg-white dark:bg-main-gray`}
      >
        <input type="checkbox" id={inputId} className="accordion-toggle" />
        <label
          htmlFor={inputId}
          className="accordion-title flex justify-center border border-gray-200 bg-white px-2.5 py-1 text-lg dark:border-gray-400 dark:bg-main-gray md:py-2.5"
        >
          <div className="flex items-center justify-between gap-4 text-lg md:text-xl">
            {QUESTION_TYPE[questionType]}
            <span className="w-full text-lg md:text-2xl">{questionTitle}</span>

            <span className="accordion-icon static">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"
                  className="dark:fill-white"
                ></path>
              </svg>
            </span>
          </div>
        </label>

        {questionType !== 'HEXASTAT' &&
          answers?.map((value, index) =>
            renderResponseByQuestion(
              questionId,
              reviewId,
              userId,
              value,
              answers,
              questionType,
              index,
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
              renderResponseByQuestion(
                questionId,
                reviewId,
                userId,
                value,
                answers,
                questionType,
              ),
            )}
      </div>
    )
  },
)

export default QuestionAnswerRenderer
