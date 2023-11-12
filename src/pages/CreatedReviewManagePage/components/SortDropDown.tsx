import { IconButton } from '@/components'
import { ReviewAlignIcon } from '@/assets/icons'

const SortDropDown = () => {
  return (
    <div className="dropdown-container justify-center p-2">
      <div className="dropdown">
        <IconButton
          tabIndex={0}
          text="정렬"
          className="
        flex h-6 w-14 rounded-none border-2 border-gray-200 p-0 text-xs dark:bg-main-gray dark:text-white"
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
          >
            이름순
          </a>
          <a
            tabIndex={2}
            className="dropdown-item w-full text-sm hover:bg-gray-200"
          >
            응답순
          </a>
          <a
            tabIndex={3}
            className="dropdown-item w-full text-sm hover:bg-gray-200"
          >
            미응답순
          </a>
        </div>
      </div>
    </div>
  )
}

export default SortDropDown
