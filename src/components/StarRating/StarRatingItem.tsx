import { StarIcon } from '@/assets/icons'

interface StarRatingItemProps {
  initFill: boolean
  handleChangeStar: () => void
}

const StarRatingItem = ({
  initFill,
  handleChangeStar,
}: StarRatingItemProps) => {
  return (
    <StarIcon
      fill={initFill ? '#FFC700' : 'black'}
      onClick={handleChangeStar}
      onMouseEnter={handleChangeStar}
    />
  )
}

export default StarRatingItem
