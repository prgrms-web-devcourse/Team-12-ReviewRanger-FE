import { useEffect, useState, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import { useStarRate } from '@/hooks/useStarRate/useStarRate'
import {
  ReviewReplyStartType,
  ReviewReplyEditType,
} from '@/pages/ReviewReplyPage/types'
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
  const { state } = useLocation()
  const { changeStar, rates, setRates } = useStarRate()
  const { setValue, getValues } = useFormContext<
    ReviewReplyStartType | ReviewReplyEditType
  >()

  const prevScore = useMemo(
    () => getValues(`${registerPath}.answerRating`),
    [registerPath, getValues],
  )

  const [score, setScore] = useState(prevScore || 0)
  const [zero, setZero] = useState(false)

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
    if (state.status === 'END' || state.status === 'DEADLINE') {
      return
    }

    if (index !== 0) {
      setZero(false)
      setScore(index + 1)
      changeStar(index)

      return
    }

    if (zero) {
      setZero(false)
      setScore(index)
      changeStar(index - 1)
    } else {
      setZero(true)
      setScore(index + 1)
      changeStar(index)
    }
  }

  return (
    <div className="flex justify-center">
      <StarRatingList handleClickStar={handleClickStar} rates={rates} />
    </div>
  )
}

export default ReplyRating
