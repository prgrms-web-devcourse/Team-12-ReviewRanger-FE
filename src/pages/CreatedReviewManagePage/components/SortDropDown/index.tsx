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
          className="
        flex h-6 w-14 gap-0.5 rounded-none border-2 border-gray-200 bg-white p-0 text-xs dark:bg-main-gray dark:text-white"
        >
          <ReviewAlignIcon className="fill-black dark:fill-white" />
        </IconButton>
        <div
          className="w-25 dropdown-menu dropdown-menu-bottom-left rounded-none border-2 bg-white
        text-black dark:bg-black dark:text-white
        "
        >
          <a
            tabIndex={1}
            className="dropdown-item w-full text-sm hover:bg-gray-200"
            onClick={sortByName}
          >
            이름순
          </a>
          <a
            tabIndex={2}
            className="dropdown-item w-full text-sm hover:bg-gray-200"
            onClick={sortByNoResponse}
          >
            응답순
          </a>
          <a
            tabIndex={3}
            className="dropdown-item w-full text-sm hover:bg-gray-200"
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
