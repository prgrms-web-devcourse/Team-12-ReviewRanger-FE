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
    <div className="relative flex w-full flex-col bg-transparent p-2.5">
      {isLoading && (
        <div className="spinner-dot-pulse absolute right-6 top-6 [--spinner-color:var(--blue-9)]">
          <div className="spinner-pulse-dot"></div>
        </div>
      )}

      <ReactTextareaAutosize
        onChange={handleChangePrompt}
        className="m-0 w-full shrink-0 resize-none rounded-none border border-gray-200 bg-transparent p-5 text-sm dark:text-white"
        defaultValue={prompt}
        value={result ? result : prompt}
      ></ReactTextareaAutosize>

      <div className="ml-2.5 flex gap-2 p-2.5">
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
