import type { ChartData, ChartOptions } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { useDarkMode } from '@/hooks'

interface DoughnutChartProps {
  answers: string[]
}

const splitStrings = (input: string[]): string[][] | string[] => {
  const result: string[][] = []

  for (const str of input) {
    if (str.length <= 7) {
      result.push([str])
      continue
    }

    const chunks: string[] = []

    for (let i = 0; i < str.length; i += 7) {
      chunks.push(str.substring(i, i + 7).trim())
    }
    result.push(chunks)
  }

  return result
}

const DoughnutChart = ({ answers }: DoughnutChartProps) => {
  const { darkMode } = useDarkMode()

  const answerMap = new Map<string, number>()

  answers.forEach((answer) => {
    answerMap.set(answer, (answerMap.get(answer) || 0) + 1)
  })

  const labels = splitStrings(Array.from(answerMap.keys()))
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
          font: {
            size: 13,
            lineHeight: 1.5,
          },
          color: darkMode ? '#fff' : '#000',
          usePointStyle: true,
        },
      },
    },
  }

  return (
    <div className="mx-auto w-full max-w-full md:w-4/6">
      <Doughnut data={doughnutData} options={DoughnutOptions} />
    </div>
  )
}

export default DoughnutChart
