import { useStarRate } from '@/hooks/useStarRate/useStarRate'
import StarRatingItem from './StarRatingItem'

const StarRatingList = ({
  rate,
  fixed,
}: {
  rate?: number
  fixed?: boolean
}) => {
  const { changeStar, rates } = useStarRate(rate ?? 5, fixed ?? false)

  return (
    <div className="flex gap-2">
      {rates.map((rate, index) => (
        <StarRatingItem
          initFill={fixed ?? rate}
          handleChangeStar={() => changeStar(index)}
          key={index}
        />
      ))}
    </div>
  )
}

export default StarRatingList
