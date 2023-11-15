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
import { Header } from '@/components'
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

//리뷰 결과 페이지
const ReviewResultPage = () => {
  const reviewId = parseInt(useLocation().pathname.split('/').at(-1) || '1')
  const [{ data: review }, { data: results }] = useGetReceivedReview(reviewId)

  const { title, description, updatedAt, userName } = review

  return (
    <div className="h-full">
      <Header />

      <div className="mx-auto flex max-w-[800px] flex-col px-5 py-7">
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

          <div className="flex justify-between">
            <h1 className="text-xl text-black dark:text-white md:text-2xl">
              {title}
            </h1>
          </div>
          <p className="whitespace-pre-line text-sm text-gray-300 dark:text-gray-400 md:text-lg">
            {description}
          </p>
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
                {(finalQuestionType === 'DROPDOWN' ||
                  finalQuestionType === 'MULTIPLE_CHOICE' ||
                  finalQuestionType === 'SINGLE_CHOICE') && (
                  <DoughnutChart answers={answers} />
                )}
                {finalQuestionType === 'SUBJECTIVE' && (
                  <p className="text-justify text-sm text-black dark:text-white md:text-lg ">
                    {answers[0]}
                  </p>
                )}
                {finalQuestionType === 'RATING' && (
                  <StarChart answer={answers} />
                )}
                {finalQuestionType === 'HEXASTAT' && (
                  <RadarChart answers={answers} />
                )}
              </li>
            ),
          )}
        </ul>
        <button className="btn mt-5 self-end rounded-md border border-gray-200 bg-main-yellow text-base dark:border-gray-200 dark:bg-gray-300 dark:text-white md:text-lg">
          pdf로 저장
        </button>
      </div>
    </div>
  )
}

export default ReviewResultPage
