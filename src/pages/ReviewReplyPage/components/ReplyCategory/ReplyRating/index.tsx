import { useEffect, useState, useMemo } from 'react'
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
  const { changeStar, rates, setRates } = useStarRate()
  const { setValue, getValues } = useFormContext<ReviewReplyType>()

  const prevScore = useMemo(
    () => getValues(`${registerPath}.answerRating`),
    [registerPath, getValues],
  )

  const [score, setScore] = useState(prevScore || 0)

  useEffect(() => {
    setRates(
      prevScore
        ? Array.from({ length: 5 }, (_, index) => index < prevScore)
        : Array(5).fill(false),
    )
    setScore(prevScore || 0)
  }, [prevScore, receiverIndex, setRates])

  useEffect(() => {
    setValue(`${registerPath}.answerRating`, score)
  }, [score, registerPath, setValue])

  useEffect(() => {
    handleCheckReply({ value: score })
  }, [score, handleCheckReply])

  const handleClickStar = (index: number) => {
    setScore(index + 1)
    changeStar(index)
  }

  return (
    <div className="flex justify-center">
      <StarRatingList handleClickStar={handleClickStar} rates={rates} />
    </div>
  )
}

export default ReplyRating
