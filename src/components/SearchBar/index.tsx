import { ChangeEvent, FormEvent, InputHTMLAttributes } from 'react'
import { SearchIcon, CloseIcon } from '@/assets/icons'

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  keyword?: string
  handleSubmitKeyword?: (e: FormEvent<HTMLFormElement>) => void
  handleChangeKeyword?: (e: ChangeEvent<HTMLInputElement>) => void
  handleResetKeyword?: () => void
  placeholder?: string
}

const SearchBar = ({
  keyword,
  handleSubmitKeyword,
  handleChangeKeyword,
  handleResetKeyword,
  onFocus,
  placeholder = '검색어를 입력하세요.',
  className,
}: SearchBarProps) => {
  return (
    <form
      onSubmit={handleSubmitKeyword}
      onReset={handleResetKeyword}
      className={`${className} flex items-center gap-2 rounded-md border bg-white p-3 dark:bg-main-red-200`}
    >
      <SearchIcon className="h-4 w-4 dark:fill-white" />
      <input
        className="h-4 w-full bg-white text-sm text-black focus:outline-none dark:bg-main-red-200 dark:text-white"
        onChange={handleChangeKeyword}
        onFocus={onFocus}
        type="text"
        value={keyword}
        placeholder={placeholder}
      />
      <button type="reset">
        <CloseIcon className="h-4 w-4 dark:fill-white" />
      </button>
    </form>
  )
}

export default SearchBar
