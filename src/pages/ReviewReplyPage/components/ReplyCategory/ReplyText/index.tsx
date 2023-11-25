import { useState, ChangeEvent, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
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
        className="h-80 rounded-md border border-gray-200 p-5 text-sm leading-5 focus:outline-none dark:bg-main-red-200 dark:text-white"
        placeholder="답변을 입력해주세요."
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
