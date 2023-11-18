import { useFormContext } from 'react-hook-form'
import { Question } from '@/apis/hooks/useGetReviewFirst'
import { ReviewReplyType } from '@/pages/ReviewReplyPage/types'
import { ReplyText, ReplyChoice, ReplyChoices } from '../ReplyCategory'

interface QuestionsProps {
  question: Question
  questionIndex: number
  receiverIndex: number
}

type RegisterPath = `replyTargets.${number}.replies.${number}`
type ReplyCompletePath = `replyComplete.${number}.complete.${number}`

const Questions = ({
  question,
  questionIndex,
  receiverIndex,
}: QuestionsProps) => {
  const { title, description, type, questionOptions, isRequired } = question
  const { setValue } = useFormContext<ReviewReplyType>()

  const registerPath: RegisterPath = `replyTargets.${receiverIndex}.replies.${questionIndex}`
  const replyCompletePath: ReplyCompletePath = `replyComplete.${receiverIndex}.complete.${questionIndex}`

  const handleCheckReplyText = ({ text }: { text: string }) => {
    if (text.trim().length > 0) {
      setValue(replyCompletePath, true)
    } else {
      setValue(replyCompletePath, false)
    }
  }

  const handleChangeReplyChoice = ({ choice }: { choice: number }) => {
    setValue(replyCompletePath, choice !== 0)
  }

  const handleChangeReplyChoices = ({ choices }: { choices: number[] }) => {
    setValue(replyCompletePath, choices.length > 0)
  }

  return (
    <div className={`flex flex-col gap-2.5`}>
      <div className="flex justify-between">
        <h2 className="text-lg dark:text-white">{title}</h2>
        {isRequired && (
          <h3 className="text-sm text-sub-red-200 dark:text-active-orange">
            필수 질문
          </h3>
        )}
      </div>
      <p className="text-sm text-gray-300 dark:text-gray-400">{description}</p>
      {type === 'SUBJECTIVE' && (
        <ReplyText
          registerPath={registerPath}
          handleCheckReply={handleCheckReplyText}
        />
      )}
      {type === 'SINGLE_CHOICE' && (
        <ReplyChoice
          registerPath={registerPath}
          options={questionOptions}
          receiverIndex={receiverIndex}
          questionIndex={questionIndex}
          handleCheckReply={handleChangeReplyChoice}
        />
      )}
      {(type === 'MULTIPLE_CHOICE' || type === 'DROPDOWN') && (
        <ReplyChoices
          registerPath={registerPath}
          options={questionOptions}
          receiverIndex={receiverIndex}
          questionIndex={questionIndex}
          handleCheckReply={handleChangeReplyChoices}
        />
      )}
    </div>
  )
}

export default Questions