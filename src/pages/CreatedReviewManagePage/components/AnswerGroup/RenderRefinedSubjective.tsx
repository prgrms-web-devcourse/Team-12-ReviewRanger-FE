import ReactTextareaAutosize from 'react-textarea-autosize'
import { useRefine } from '@/hooks'
import { IconButton } from '@/components'
import { FilterReplyIcon, SaveIcon } from '@/assets/icons'

interface RenderRefinedSubjectiveProps {
  text: string
}

const RenderRefinedSubjective = ({ text }: RenderRefinedSubjectiveProps) => {
  const { handlers, isLoading, prompt, result } = useRefine({ text })
  const { handleChangePrompt, handleRefine } = handlers

  return (
    <div className="relative mt-8 flex w-full flex-col bg-transparent">
      {isLoading && (
        <div className="spinner-dot-pulse absolute right-6 top-6 [--spinner-color:var(--blue-9)]">
          <div className="spinner-pulse-dot"></div>
        </div>
      )}

      <h1 className="mb-2 text-base md:text-lg">⭐ 전송될 취합 답변: </h1>

      <ReactTextareaAutosize
        onChange={handleChangePrompt}
        className="m-0 w-full shrink-0 resize-none rounded-none border border-gray-200 bg-transparent p-5 text-sm dark:text-white"
        value={result ? result : prompt}
      ></ReactTextareaAutosize>

      <div className="flex gap-2">
        <IconButton
          className="mt-2.5 h-7 gap-1 rounded-md border border-gray-200 bg-gray-400 text-sm text-black"
          text="정제"
          onClick={handleRefine}
        >
          <FilterReplyIcon className="h-4 w-4" />
        </IconButton>

        <IconButton
          disabled
          className="mt-2.5 h-7 gap-1 rounded-md border border-gray-200 bg-gray-400 text-sm text-black"
          text="저장"
          onClick={() => {
            if (isLoading) {
              return
            }
            //TODO: 저장 API 호출
          }}
        >
          <SaveIcon />
        </IconButton>
      </div>
    </div>
  )
}

export default RenderRefinedSubjective
