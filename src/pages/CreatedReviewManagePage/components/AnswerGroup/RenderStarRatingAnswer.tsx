import { StarRatingList } from '@/components'
import { BasicProfile } from '@/assets/images'

interface StarRatingAnswerProps {
  value?: string | number | null
  userName?: string
}

const RenderStarRatingAnswer = ({ value, userName }: StarRatingAnswerProps) => {
  return (
    <div>
      <h3 className="flex items-center">
        <img
          src={BasicProfile}
          className="avatar h-[1.25rem] w-[1.25rem] border dark:bg-white dark:fill-white"
        />
        <p className="ml-[1.31rem] text-sm">{userName}</p>
      </h3>
      <div className="ml-[42.96px] mt-[0.5rem] text-base leading-5 md:mt-[0.62rem]">
        <StarRatingList rate={Number(value)} fixed={true} />
      </div>
    </div>
  )
}

export default RenderStarRatingAnswer
