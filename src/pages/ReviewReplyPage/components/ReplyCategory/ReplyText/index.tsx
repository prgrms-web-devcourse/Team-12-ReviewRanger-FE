import { useState, ChangeEvent, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import {
  ReviewReplyStartType,
  ReviewReplyEditType,
} from '@/pages/ReviewReplyPage/types'

interface ReplyTextProps {
  receiverIndex: number
  questionIndex: number
  handleCheckReply: ({ value }: { value: string }) => void
}

type RegisterPath = `replyTargets.${number}.replies.${number}`

const ReplyText = ({
  receiverIndex,
  questionIndex,
  handleCheckReply,
}: ReplyTextProps) => {
  const registerPath: RegisterPath = `replyTargets.${receiverIndex}.replies.${questionIndex}`
  const [text, setText] = useState('')
  const [textCount, setTextCount] = useState<number>(0)
  const { state } = useLocation()
  const { register, getValues } = useFormContext<
    ReviewReplyStartType | ReviewReplyEditType
  >()

  useEffect(() => {
    setTextCount(0)
    setText(getValues(`${registerPath}.answerText`) || '')
  }, [registerPath, getValues])

  const handleChangeReplyText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextCount(e.currentTarget.value.length)
    setText(e.currentTarget.value)
  }

  return (
    <div className="relative flex flex-col">
      <textarea
        value={text}
        className="h-80 rounded-md border border-gray-200 bg-white p-5 text-sm leading-5 placeholder:text-gray-100 focus:outline-none dark:border-gray-100 dark:bg-main-red-200 dark:text-white placeholder:dark:text-gray-200"
        placeholder="답변을 입력해주세요."
        disabled={state.status === 'END' || state.status === 'DEADLINE'}
        maxLength={500}
        {...register(`${registerPath}.answerText`, {
          setValueAs: (value) => value.trim(),
          onChange: handleChangeReplyText,
          onBlur: () => handleCheckReply({ value: text }),
        })}
      />
      <p className="absolute bottom-5 right-5">
        <span className="text-sm text-gray-300 dark:text-gray-400">{`${textCount} / 500자`}</span>
      </p>
    </div>
  )
}

export default ReplyText
