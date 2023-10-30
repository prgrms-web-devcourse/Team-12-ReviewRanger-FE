import { v4 } from 'uuid'
import { StarRatingItem } from '@/components'
import { useStarRate } from '@/hooks/useStarRate/useStarRate'

const StarRatingList = () => {
  const { changeStar, rates } = useStarRate()

  return (
    <>
      {rates.map((rate, index) => (
        <StarRatingItem
          initFill={rate}
          handleChangeStar={() => changeStar(index)}
          key={v4()}
        />
      ))}
    </>
  )
}

export default StarRatingList
