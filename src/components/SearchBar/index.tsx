import { ChangeEvent, FormEvent } from 'react'
import { SearchIcon, CloseIcon } from '@/assets/icons'

interface SearchBarProps {
  keyword?: string
  handleSubmitKeyword?: (e: FormEvent<HTMLFormElement>) => void
  handleChangeKeyword?: (e: ChangeEvent<HTMLInputElement>) => void
  handleResetKeyword?: () => void
  placeholder?: string
  className?: string
}

const SearchBar = ({
  keyword,
  handleSubmitKeyword,
  handleChangeKeyword,
  handleResetKeyword,
  className,
  placeholder = '검색어를 입력하세요.',
}: SearchBarProps) => {
  return (
    <form
      onSubmit={handleSubmitKeyword}
      onReset={handleResetKeyword}
      className={`relative flex flex-row items-center ${className}`}
    >
      <SearchIcon className="absolute ml-3" />
      <input
        className="align-center  input input-block w-full justify-center bg-white pl-8 text-black"
        onChange={handleChangeKeyword}
        type="text"
        value={keyword}
        placeholder={placeholder}
      />
      <button className="absolute right-3" type="reset">
        <CloseIcon />
      </button>
    </form>
  )
}

export default SearchBar
