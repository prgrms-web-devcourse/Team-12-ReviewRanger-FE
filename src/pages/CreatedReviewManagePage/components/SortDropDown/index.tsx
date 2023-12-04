import { IconButton } from '@/components'
import { ReviewAlignIcon } from '@/assets/icons'

interface SortDropDownProps {
  sortByName: () => void
  sortByResponse: () => void
  sortByNoResponse: () => void
}

const SortDropDown = ({
  sortByName,
  sortByNoResponse,
  sortByResponse,
}: SortDropDownProps) => {
  return (
    <div className="dropdown-container grow justify-end">
      <div className="dropdown ">
        <IconButton
          tabIndex={0}
          text="정렬"
          className="flex h-fit gap-1 rounded-none border border-gray-200 bg-white px-2 py-0 text-xs dark:bg-main-gray dark:text-white md:text-base"
        >
          <ReviewAlignIcon className="fill-black dark:fill-white" />
        </IconButton>
        <div
          className="dropdown-menu dropdown-menu-bottom-left w-28 rounded-none border bg-white
        px-0 text-center text-black dark:bg-main-gray dark:text-white"
        >
          <a
            tabIndex={1}
            className="dropdown-item w-full text-sm hover:bg-main-yellow dark:hover:bg-gray-300"
            onClick={sortByName}
          >
            이름순
          </a>
          <a
            tabIndex={2}
            className="dropdown-item w-full text-sm hover:bg-main-yellow dark:hover:bg-gray-300"
            onClick={sortByNoResponse}
          >
            응답순
          </a>
          <a
            tabIndex={3}
            className="dropdown-item w-full text-sm hover:bg-main-yellow dark:hover:bg-gray-300"
            onClick={sortByResponse}
          >
            미응답순
          </a>
        </div>
      </div>
    </div>
  )
}

export default SortDropDown
