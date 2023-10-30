import { v4 } from 'uuid'
import { StarRatingItem } from '@/components'
import { useStarRate } from '@/hooks/useStarRate/useStarRate'

const StarRatingList = () => {
  const { handleClickStar, rates } = useStarRate()

  return (
    <>
      {rates.map((rate, index) => (
        <StarRatingItem
          initFill={rate}
          handleClickStar={() => handleClickStar(index)}
          key={v4()}
        />
      ))}
    </>
  )
}

export default StarRatingList
