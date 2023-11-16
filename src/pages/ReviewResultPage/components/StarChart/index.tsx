import { StarIcon } from '@/assets/icons'

interface StarChartProps {
  answer: number[]
}

const StarChart = ({ answer }: StarChartProps) => {
  // TODO: 별점 소수점 처리
  // const average = answer.reduce((acc, cur) => acc + cur, 0) / answer.length
  console.log(answer)

  return (
    <div className="mx-auto flex gap-4">
      <StarIcon className="fill-sub-yellow stroke-gray-200 dark:stroke-gray-400" />
      <StarIcon className="fill-sub-yellow stroke-gray-200 dark:stroke-gray-400" />
      <StarIcon className="fill-sub-yellow stroke-gray-200 dark:stroke-gray-400" />
      <StarIcon className="fill-sub-yellow stroke-gray-200 dark:stroke-gray-400" />
      <StarIcon className="fill-gray-400 stroke-gray-200 dark:stroke-gray-400" />
    </div>
  )
}

export default StarChart
