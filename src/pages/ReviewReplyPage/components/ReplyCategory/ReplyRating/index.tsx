import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useStarRate } from '@/hooks/useStarRate/useStarRate'
import { ReviewReplyType } from '@/pages/ReviewReplyPage/types'
import StarRatingList from './StarRatingList'

interface ReplyRatingProps {
  registerPath: `replyTargets.${number}.replies.${number}`
  handleCheckReply: ({ value }: { value: number }) => void
}

const ReplyRating = ({ registerPath, handleCheckReply }: ReplyRatingProps) => {
  // NOTE: 이미 만들어진 useStarRate() 훅을 사용하여 상태관리. setRates를 직접 다루어야하여 새롭게 return 받음.
  const { changeStar, rates, setRates, score } = useStarRate()
  const { setValue, getValues } = useFormContext<ReviewReplyType>()

  useEffect(() => {
    const prevScore = getValues(`${registerPath}.answerRating`)
    // 이전에 답변한 데이터가 있다면, 해당 score를 가지고 boolean[]로 초기화
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
    score && handleCheckReply({ value: score })
  }, [score, handleCheckReply])

  return (
    <div className="flex justify-center">
      <StarRatingList handleClickStar={changeStar} rates={rates} />
    </div>
  )
}

export default ReplyRating
