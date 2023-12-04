import ReactTextareaAutosize from 'react-textarea-autosize'
import { useRefine, useToast } from '@/hooks'
import { IconButton } from '@/components'
import { useUpdateFinalReviewAnswer } from '@/apis/hooks'
import { FilterReplyIcon, SaveIcon } from '@/assets/icons'

interface RenderRefinedSubjectiveProps {
  text: string
  questionId: number
  reviewId: number
  userId: string
}

const RenderRefinedSubjective = ({
  text,
  questionId,
  reviewId,
  userId,
}: RenderRefinedSubjectiveProps) => {
  const { handlers, isLoading, prompt, result } = useRefine({ text })
  const { handleChangePrompt, handleRefine } = handlers
  const { addToast } = useToast()

  const { mutate: updateFinalAnswer } = useUpdateFinalReviewAnswer()
  const handleUpdateFinalAnswer = (newAnswer: string) => {
    updateFinalAnswer(
      {
        questionId,
        reviewId,
        userId,
        answer: newAnswer,
      },
      {
        onSuccess: () =>
          addToast({
            type: 'success',
            message: '성공적으로 저장되었습니다!',
          }),
      },
    )
  }

  return (
    <div className="relative mt-8 flex w-full flex-col bg-transparent">
      {isLoading && (
        <div className="spinner-dot-pulse absolute right-6 top-10 [--spinner-color:var(--blue-9)]">
          <div className="spinner-pulse-dot"></div>
        </div>
      )}

      <h1 className="mb-2 text-base md:text-lg">⭐ 전송될 취합 답변: </h1>

      <ReactTextareaAutosize
        onChange={handleChangePrompt}
        className="w-full shrink-0 resize-none rounded-none border border-gray-200 bg-transparent p-5 text-sm dark:text-white md:text-lg"
        value={result ? result : prompt}
      ></ReactTextareaAutosize>

      <div className="flex w-full justify-end gap-2">
        <IconButton
          className="mt-2.5 h-7 gap-1 rounded-md border border-gray-200 bg-gray-400 text-sm text-black"
          text="정제"
          onClick={() => {
            handleRefine()
          }}
        >
          <FilterReplyIcon className="h-4 w-4" />
        </IconButton>

        <IconButton
          className="mt-2.5 h-7 gap-1 rounded-md border border-gray-200 bg-gray-400 text-sm text-black"
          text="저장"
          onClick={() => {
            if (isLoading) {
              return
            }
            handleUpdateFinalAnswer(prompt)
          }}
        >
          <SaveIcon />
        </IconButton>
      </div>
    </div>
  )
}

export default RenderRefinedSubjective
