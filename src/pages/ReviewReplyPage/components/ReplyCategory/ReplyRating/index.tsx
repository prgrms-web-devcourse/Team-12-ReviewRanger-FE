import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useStarRate } from '@/hooks/useStarRate/useStarRate'
import { ReviewReplyType } from '@/pages/ReviewReplyPage/types'
import StarRatingList from './StarRatingList'

interface ReplyRatingProps {
  receiverIndex: number
  questionIndex: number
  handleCheckReply: ({ value }: { value: number }) => void
}

type RegisterPath = `replyTargets.${number}.replies.${number}`

const ReplyRating = ({
  receiverIndex,
  questionIndex,
  handleCheckReply,
}: ReplyRatingProps) => {
  const registerPath: RegisterPath = `replyTargets.${receiverIndex}.replies.${questionIndex}`
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
    setValue(`${registerPath}.answerRating`, score)
  }, [score, registerPath, setValue])

  useEffect(() => {
    handleCheckReply({ value: score })
  }, [score, handleCheckReply])

  return (
    <div className="flex justify-center">
      <StarRatingList handleClickStar={changeStar} rates={rates} />
    </div>
  )
}

export default ReplyRating
