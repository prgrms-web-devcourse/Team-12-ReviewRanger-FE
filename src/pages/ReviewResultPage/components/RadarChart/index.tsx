import type { ChartData, ChartOptions } from 'chart.js'
import { Radar } from 'react-chartjs-2'

interface RadarChartProps {
  answers: {
    statName: string
    statScore: number
  }[]
}

const RadarChart = ({ answers }: RadarChartProps) => {
  const labels = answers.map((answer) => answer.statName)
  const data = answers.map((answer) => answer.statScore)

  const radarData: ChartData<'radar'> = {
    labels,
    datasets: [
      {
        label: '점수',
        data,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  }

  const radarOptions: ChartOptions<'radar'> = {
    scales: {
      r: {
        // NOTE: 거미줄 일직선
        // angleLines: {
        //   display: false,
        //   color: 'rgba(0, 0, 0, 0.5)',
        // },
        ticks: {
          stepSize: 10,
          count: 4,
          display: false,
        },
        pointLabels: {
          font: {
            size: 14,
          },
        },
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context: { raw: unknown }) => {
            return `${context.raw}점`
          },
        },
        displayColors: false,
      },
      legend: {
        display: false,
      },
    },
  }

  return (
    <>
      <div className="mx-auto w-fit max-w-full">
        <Radar data={radarData} options={radarOptions} />
      </div>
    </>
  )
}

export default RadarChart
