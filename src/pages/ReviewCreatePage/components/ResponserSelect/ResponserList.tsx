import { Profile } from '@/components'
import { CheckInTheCircleIcon } from '@/assets/icons'
import { User } from '../../types'

interface ResponserListProps {
  responserList: User[]
  handleSelectAllResponsers: (responsers: User[]) => void
  handleSelectResponser: (responser: User, index: number) => void
  selected?: boolean
}

const ResponserList = ({
  responserList,
  handleSelectAllResponsers,
  handleSelectResponser,
  selected = false,
}: ResponserListProps) => {
  if (responserList.length) {
    return (
      <div className="mt-7">
        <div className="mb-2 flex items-center justify-between">
          <div className="dark:text-white">
            <span>{selected ? '선택한 인원: ' : '선택하지 않은 인원: '}</span>
            <span className="text-sub-blue dark:text-sub-skyblue">
              {responserList.length}
            </span>
            <span> 명</span>
          </div>
          <button
            type="button"
            className="btn h-6 rounded-md border border-gray-200 bg-main-hover-yellow px-2 text-xs dark:border-gray-100 dark:bg-main-red-200 dark:text-white md:h-8 md:text-sm"
            onClick={() => handleSelectAllResponsers(responserList)}
          >
            {selected ? '전체 해제' : '전체 선택'}
          </button>
        </div>

        <ul className="flex flex-col gap-2">
          {responserList.map((responser, index) => (
            <li
              key={responser.id}
              className="flex cursor-pointer items-center justify-between border-b border-gray-400 py-2"
              onClick={() => handleSelectResponser(responser, index)}
            >
              <Profile name={responser.name} />
              <CheckInTheCircleIcon
                className={selected ? 'fill-sub-green' : 'fill-gray-100'}
              />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default ResponserList
