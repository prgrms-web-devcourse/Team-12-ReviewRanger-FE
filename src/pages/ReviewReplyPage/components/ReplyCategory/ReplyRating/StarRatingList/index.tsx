import { StarIcon } from '@/assets/icons'

interface StarRatingListProps {
  handleClickStar: (index: number) => void
  rates: boolean[]
}

const StarRatingList = ({ handleClickStar, rates }: StarRatingListProps) => {
  return (
    <div className="flex gap-2">
      {rates.map((rate, index) => (
        <StarIcon
          className={`${
            rate ? 'fill-sub-yellow' : 'fill-gray-100'
          } stroke-gray-200`}
          onClick={() => handleClickStar(index)}
          key={index}
        />
      ))}
    </div>
  )
}

export default StarRatingList
