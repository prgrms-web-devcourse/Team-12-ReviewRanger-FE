import { ChangeEvent, InputHTMLAttributes } from 'react'
import { SearchIcon, CloseIcon } from '@/assets/icons'

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  keyword?: string
  handleChangeKeyword?: (e: ChangeEvent<HTMLInputElement>) => void
  handleResetKeyword?: () => void
  placeholder?: string
  className?: string
}

const SearchBar = ({
  keyword,
  handleChangeKeyword,
  handleResetKeyword,
  onFocus,
  placeholder = '검색어를 입력하세요.',
  className,
}: SearchBarProps) => {
  return (
    <div
      className={`${className} flex items-center gap-2 rounded-md border border-gray-200 bg-white p-3 dark:border-gray-100 dark:bg-main-red-200`}
    >
      <SearchIcon className="h-4 w-4 dark:fill-white" />
      <input
        className="h-4 w-full bg-white text-sm text-black focus:outline-none dark:bg-main-red-200 dark:text-white md:text-lg"
        onChange={handleChangeKeyword}
        onFocus={onFocus}
        type="text"
        value={keyword}
        placeholder={placeholder}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
          }
        }}
      />
      <button type="reset" onClick={handleResetKeyword}>
        <CloseIcon className="h-4 w-4 fill-black dark:fill-white" />
      </button>
    </div>
  )
}

export default SearchBar
