import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  PointElement,
  LineElement,
  Filler,
  RadialLinearScale,
  ChartOptions,
} from 'chart.js'
import { Doughnut, Radar } from 'react-chartjs-2'
import { useLocation } from 'react-router-dom'
import { useGetReceivedReview } from '@/apis/hooks'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  ArcElement,
)

//리뷰 결과 페이지
const ReviewResultPage = () => {
  const reviewId = parseInt(useLocation().pathname.split('/')[2])
  const { data: results } = useGetReceivedReview(reviewId)

  console.log(results)

  const mockData = {
    title: '데브코스 1차 피어리뷰',
    name: '김아무개',
    createdAt: '어쩌구2023년날짜',
    results: [
      {
        questionTitle: '첫 포켓몬 고르면?',
        questionType: 'MULTIPLE_CHOICE',
        answers: [
          '파이리',
          '파이리',
          '꼬부기',
          '이상해씨',
          '이상해씨',
          '이상해씨',
          '피카츄',
          '이브이',
          '이브이',
        ],
      },
      {
        questionTitle: '육각형 스탯은?',
        questionType: 'HEXASTAT',
        answers: [
          '파이리',
          '파이리',
          '꼬부기',
          '이상해씨',
          '이상해씨',
          '이상해씨',
          '피카츄',
          '이브이',
          '이브이',
        ],
      },
      {
        questionTitle: '첫 포켓몬 고르면?',
        questionType: '객관식어쩌구중복허용',
        answers: [
          '파이리',
          '파이리',
          '꼬부기',
          '이상해씨',
          '이상해씨',
          '이상해씨',
          '피카츄',
          '이브이',
          '이브이',
        ],
      },
    ],
  }

  const doughnutData = {
    labels: results?.results[0].answers,
    datasets: [
      {
        label: '응답자',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const radarData = {
    labels: ['Thing 1', 'Thing 2', 'Thing 3', 'Thing 4', 'Thing 5', 'Thing 6'],
    datasets: [
      {
        label: '점수',
        data: [2, 9, 3, 5, 2, 3],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  }

  const DoughnutOptions: ChartOptions<'doughnut'> = {
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => {
            return `${context.raw}명`
          },
        },
        displayColors: false,
      },
    },
  }

  const radarOptions: ChartOptions<'radar'> = {
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        ticks: {
          stepSize: 10,
          count: 4,
          display: false,
        },
        pointLabels: {
          font: {
            size: 14,
          },
          callback: (context, index) => {
            return `${context}/${radarData.datasets[0].data[index]}점`
          },
        },
        // backgroundColor: 'white',
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => {
            return `${context.raw}점`
          },
        },
        displayColors: false,
      },
    },
  }

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl text-black dark:text-white">
          데브코스 피어리뷰
        </h1>
        <button className="btn">pdf로 저장</button>
      </div>
      <p className="text-lg text-black dark:text-white">
        데브코스 단위기간 어쩌구 6월 어쩌구 8월 1차 팀에 대한 리뷰입니다.
        성실하게 답변에 임해주세요
      </p>
      {/* 객관식, 드롭다운 */}
      <h2 className="text-xl text-black dark:text-white">
        1. 첫 스타팅 포켓몬을 고르자면?
      </h2>
      <div className="w-48">
        <Doughnut data={doughnutData} options={DoughnutOptions} />
      </div>

      {/* 주관식 */}
      <h2 className="text-xl text-black dark:text-white">
        최강민수님의 피어리뷰는?
      </h2>
      <p className="text-xl text-black dark:text-white">
        민수님은 팀 프로젝트를 위해 솔선수범하는 모습을 자주 보여줍니다. 하지만
        PR리뷰를 대충 작성하시고, 강한 자기주장으로 인해 팀원간에 마찰이 자주
        발생하였습니다. 가끔은 좋은 자료들을 많이 공유해주셔서 팀원들의 역량을
        늘리는데 기여하기도 합니다. 조금 더 팀원 입장에서 생각해주시면 훨씬 좋은
        개발자가 되실 것 같습니다!
      </p>

      {/* 육각형 스탯 */}
      <h2 className="text-xl text-black dark:text-white">
        최강민수님의 육각형 스탯은?
      </h2>
      <div className="w-80">
        <Radar data={radarData} options={radarOptions} />
      </div>

      {/* 별점 */}
    </>
  )
}

export default ReviewResultPage
