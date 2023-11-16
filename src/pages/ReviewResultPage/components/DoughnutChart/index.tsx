import type { ChartData, ChartOptions } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

interface DoughnutChartProps {
  answers: string[]
}

const DoughnutChart = ({ answers }: DoughnutChartProps) => {
  const answerMap = new Map<string, number>()

  answers.forEach((answer) => {
    answerMap.set(answer, (answerMap.get(answer) || 0) + 1)
  })

  const labels = Array.from(answerMap.keys())
  const data = Array.from(answerMap.values())

  const doughnutData: ChartData<'doughnut'> = {
    labels,
    datasets: [
      {
        label: '응답자',
        data,
        borderWidth: 1,
      },
    ],
  }

  const DoughnutOptions: ChartOptions<'doughnut'> = {
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context: { raw: unknown }) => {
            return `${context.raw}명`
          },
        },
        displayColors: false,
      },
      colors: {
        enabled: true,
      },
      legend: {
        position: 'right',
        display: true,
        labels: {
          padding: 20,
          font: {
            size: 14,
          },
          usePointStyle: true,
        },
      },
    },
  }

  return (
    <div className="mx-auto w-fit max-w-full">
      <Doughnut data={doughnutData} options={DoughnutOptions} />
    </div>
  )
}

export default DoughnutChart
