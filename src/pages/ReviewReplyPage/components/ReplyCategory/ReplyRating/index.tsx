import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useStarRate } from '@/hooks/useStarRate/useStarRate'
import { ReviewReplyType } from '@/pages/ReviewReplyPage/types'
import StarRatingList from './StarRatingList'

interface ReplyRatingProps {
  registerPath: `replyTargets.${number}.replies.${number}`
  handleCheckReply: ({ score }: { score: number }) => void
}

const ReplyRating = ({ registerPath, handleCheckReply }: ReplyRatingProps) => {
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

  useEffect(() => {
    score && handleCheckReply({ score })
  }, [score, handleCheckReply])

  return (
    <div>
      <StarRatingList handleClickStar={changeStar} rates={rates} />
    </div>
  )
}

export default ReplyRating
