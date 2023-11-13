import { ChangeEvent, FormEvent } from 'react'
import { SearchIcon, CloseIcon } from '@/assets/icons'

interface SearchBarProps {
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
  placeholder = '검색어를 입력하세요.',
}: SearchBarProps) => {
  return (
    <form
      onSubmit={handleSubmitKeyword}
      onReset={handleResetKeyword}
      className="flex items-center gap-2 rounded-md border bg-main-yellow p-3"
    >
      <SearchIcon className="h-4 w-4" />
      <input
        className="h-4 w-full bg-main-yellow text-black focus:outline-none"
        onChange={handleChangeKeyword}
        type="text"
        value={keyword}
        placeholder={placeholder}
      />
      <button type="reset">
        <CloseIcon className="h-4 w-4" />
      </button>
    </form>
  )
}

export default SearchBar
