import { MenuIcon, MultipleCheckIcon } from '@/assets/icons'

const QuestionItem = () => {
  return (
    <div className="rounded-md border border-gray-200 bg-white p-2.5 dark:border-gray-100 dark:bg-main-gray">
      <div className="mb-2.5 flex justify-between">
        <div className="flex gap-2">
          <MultipleCheckIcon className="stroke-black dark:stroke-white" />
          <p className="text-lg text-black dark:text-white">
            객관식 (다중 선택)
          </p>
        </div>

        <MenuIcon className="cursor-pointer" />
      </div>
      <input
        placeholder="질문 제목을 입력해주세요."
        className="w-full border border-gray-200 bg-white p-2.5 text-sm text-black outline-none dark:text-white"
      />
    </div>
  )
}

export default QuestionItem
