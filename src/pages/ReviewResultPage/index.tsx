import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  PointElement,
  LineElement,
  Filler,
  RadialLinearScale,
  Colors,
  Legend,
  Title,
  SubTitle,
} from 'chart.js'
import dayjs from 'dayjs'
import { useLocation } from 'react-router-dom'
import { useToast } from '@/hooks'
import { Header, ReviewInfo } from '@/components'
import { useGetReceivedReview } from '@/apis/hooks'
import { DoughnutChart, RadarChart, StarChart } from './components'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  ArcElement,
  Colors,
  Legend,
  Title,
  SubTitle,
)

const ReviewResultPage = () => {
  const reviewId = parseInt(useLocation().pathname.split('/').at(-1) || '1')
  const [{ data: review }, { data: results }] = useGetReceivedReview(reviewId)

  const { title, description, updatedAt, userName } = review

  const { addToast } = useToast()

  return (
    <div className="h-full">
      <Header />

      <div className="mx-auto flex max-w-[37.5rem] flex-col px-5 py-7">
        <div className="flex flex-col gap-5">
          <div className="justify-between md:flex">
            <p className="text-base dark:text-white md:text-lg">
              수신자: {userName}
            </p>

            <p className="text-base text-sub-blue dark:text-sub-skyblue md:text-lg">
              {dayjs(updatedAt).format('YYYY. MM. DD, HH:mm')} 에 최종 저장된
              결과예요!
            </p>
          </div>

          <ReviewInfo {...{ title, description }} />
        </div>

        <ul className="mt-8 flex flex-col border border-gray-300 bg-white dark:border-gray-100 dark:bg-main-gray">
          {results.map(
            (
              { questionId, questionTitle, finalQuestionType, answers },
              index,
            ) => (
              <li
                key={questionId}
                className="flex flex-col gap-5 border-t border-t-gray-400 px-5 py-7"
              >
                <h2 className="text-xl text-black dark:text-white md:text-2xl">
                  {index + 1}. {questionTitle}
                </h2>
                {(() => {
                  switch (finalQuestionType) {
                    case 'DROPDOWN':
                    case 'MULTIPLE_CHOICE':
                    case 'SINGLE_CHOICE':
                      return <DoughnutChart answers={answers} />

                    case 'RATING':
                      return <StarChart answer={answers} />

                    case 'HEXASTAT':
                      return <RadarChart answers={answers} />

                    case 'SUBJECTIVE':
                      return (
                        <p className="whitespace-pre-wrap text-justify text-sm text-black dark:text-white md:text-xl ">
                          {answers[0]}
                        </p>
                      )

                    default:
                      return null
                  }
                })()}
              </li>
            ),
          )}
        </ul>
        <button
          className="btn mt-5 self-end rounded-md border border-gray-200 bg-main-hover-yellow text-base dark:border-gray-200 dark:bg-gray-300 dark:text-white md:text-lg"
          onClick={() =>
            addToast({ message: '아직 준비중인 기능이에요 😥', type: 'info' })
          }
        >
          pdf로 저장
        </button>
      </div>
    </div>
  )
}

export default ReviewResultPage
