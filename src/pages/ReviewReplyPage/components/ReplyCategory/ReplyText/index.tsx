import { useState, ChangeEvent, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { ReviewReplyType } from '@/pages/ReviewReplyPage/types'

interface ReplyTextProps {
  registerPath: `replyTargets.${number}.replies.${number}`
  receiverIndex: number
  questionIndex: number
  handleCheckReply: ({ text }: { text: string }) => void
}

const ReplyText = ({ registerPath, handleCheckReply }: ReplyTextProps) => {
  const [text, setText] = useState('')
  const [textCount, setTextCount] = useState<number>(0)
  const { register, getValues } = useFormContext<ReviewReplyType>()

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
        className="h-80 rounded-md border border-gray-200 p-5 text-sm focus:outline-none dark:bg-main-red-200 dark:text-white"
        placeholder="답변을 입력해주세요."
        maxLength={500}
        {...register(`${registerPath}.answerText`, {
          required: '내용을 입력해주세요.',
          setValueAs: (value) => value.trim(),
          onChange: handleChangeReplyText,
          onBlur: () => handleCheckReply({ text }),
        })}
      />
      <p className="absolute bottom-5 right-5">
        <span className="text-sm text-gray-300 dark:text-gray-400">{`${textCount} / 500자`}</span>
      </p>
    </div>
  )
}

export default ReplyText
