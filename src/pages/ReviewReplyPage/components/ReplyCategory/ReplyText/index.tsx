import { useState, ChangeEvent } from 'react'
// import { useFormContext } from 'react-hook-form'
// import { ReplyType } from '@/pages/ReviewReplyPage/types'

const ReplyText = () => {
  const [textCount, setTextCount] = useState<number>(0)
  // const { register } = useFormContext<ReplyType>()

  const handleChangeReplyText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextCount(e.currentTarget.value.length)
  }

  return (
    <div className="relative flex flex-col">
      <textarea
        onChange={handleChangeReplyText}
        className="h-80 rounded-md border border-gray-200 p-5 text-sm focus:outline-none dark:bg-main-red-200 dark:text-white"
        placeholder="답변을 입력해주세요."
        maxLength={500}
      />
      <p className="absolute bottom-5 right-5">
        <span className="text-sm text-gray-300 dark:text-gray-400">{`${textCount} / 500자`}</span>
      </p>
    </div>
  )
}

export default ReplyText
