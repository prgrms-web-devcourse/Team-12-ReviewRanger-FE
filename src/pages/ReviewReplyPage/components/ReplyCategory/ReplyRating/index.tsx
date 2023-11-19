import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useStarRate } from '@/hooks/useStarRate/useStarRate'
import { ReviewReplyType } from '@/pages/ReviewReplyPage/types'
import StarRatingList from './StarRatingList'

interface ReplyRatingProps {
  registerPath: `replyTargets.${number}.replies.${number}`
}

const ReplyRating = ({ registerPath }: ReplyRatingProps) => {
  const { changeStar, rates, setRates, score } = useStarRate()
  const { setValue, getValues } = useFormContext<ReviewReplyType>()

  useEffect(() => {
    const prevScore = getValues(`${registerPath}.answerRating`)
    setRates(
      prevScore
        ? Array.from({ length: 5 }, (_, index) => index < prevScore)
        : Array(5).fill(false),
    )
  }, [registerPath, getValues, setRates])

  useEffect(() => {
    score && setValue(`${registerPath}.answerRating`, score)
  }, [score, registerPath, setValue])

  return (
    <div>
      <StarRatingList handleClickStar={changeStar} rates={rates} />
    </div>
  )
}

export default ReplyRating
