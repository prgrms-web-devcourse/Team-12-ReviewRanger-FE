import { STAR } from './constant'

interface StarChartProps {
  answer: number[]
}

const StarChart = ({ answer }: StarChartProps) => {
  const { ID_LIST, PATH_DATA, SIZE } = STAR

  const calculateFillWidthList = (average: number): number[] => {
    let totalScore = average

    return Array.from({ length: 5 }, () => {
      const point = Math.min(totalScore, 1)
      totalScore = Math.max(0, totalScore - 1)

      return SIZE * point
    })
  }

  const average = answer.reduce((acc, cur) => acc + cur, 0) / answer.length
  const fillWidthList = calculateFillWidthList(average)

  return (
    <div className="mx-auto flex items-center gap-2 md:gap-4">
      {ID_LIST.map((id, index) => {
        return (
          <svg
            key={id}
            width={SIZE}
            height={SIZE}
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            xmlns="http://www.w3.org/2000/svg"
            className="transform fill-gray-400 stroke-gray-200 transition-transform duration-300 ease-in-out hover:scale-110 dark:stroke-gray-400"
          >
            <clipPath id={`${id}Clip`}>
              <rect width={fillWidthList[index]} height={SIZE} />
            </clipPath>
            <path id={id} d={PATH_DATA} transform="translate(3 0)" />
            <use
              clipPath={`url(#${id}Clip)`}
              href={`#${id}`}
              className="fill-sub-yellow"
            />
          </svg>
        )
      })}
      <p className="text-sm text-gray-200 md:text-lg">
        {average.toFixed(2)} 점
      </p>
    </div>
  )
}

export default StarChart
