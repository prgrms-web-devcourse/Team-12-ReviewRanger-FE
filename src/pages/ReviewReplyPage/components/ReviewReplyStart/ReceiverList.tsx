import { Profile } from '@/components'
import { CheckInTheCircleIcon, AlertIcon } from '@/assets/icons'
import { User } from '../../types'

interface ReceiverListProps {
  receiverList: User[]
  handleSelectAllReceivers: (receivers: User[]) => void
  handleSelectReceiver: (receiver: User) => void
  selected?: boolean
}

const ReceiverList = ({
  receiverList,
  handleSelectAllReceivers,
  handleSelectReceiver,
  selected = false,
}: ReceiverListProps) => {
  return (
    <div className="flex flex-col gap-2 rounded-md border bg-white p-2 dark:border-gray-100 dark:bg-main-gray">
      <div className="flex items-center justify-between px-2">
        <div className="dark:text-white">
          <span>{selected ? '선택한 인원: ' : '선택하지 않은 인원: '}</span>
          <span className="text-sub-orange dark:text-sub-yellow">
            {receiverList.length}
          </span>
          <span> 명</span>
        </div>
        <button
          type="button"
          className="rounded-md border border-gray-200 bg-main-hover-yellow px-2 py-1 text-xs dark:border-gray-100 dark:bg-main-red-200 dark:text-white md:text-sm"
          onClick={() => handleSelectAllReceivers(receiverList)}
        >
          {selected ? '전체 해제' : '전체 선택'}
        </button>
      </div>

      {receiverList.length > 0 ? (
        <ul className="flex h-40 flex-col overflow-auto border bg-main-ivory dark:bg-main-gray md:h-48">
          {receiverList.map((receiver, index) => (
            <li
              key={index}
              className="flex cursor-pointer items-center justify-between border-b border-gray-400 px-5 py-1.5 hover:bg-main-yellow dark:bg-gray-300 dark:hover:bg-gray-200 md:px-5 md:py-2"
              onClick={() => handleSelectReceiver(receiver)}
            >
              <Profile name={receiver.name} />
              <CheckInTheCircleIcon
                className={selected ? 'fill-sub-green' : 'fill-gray-100'}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex h-40 flex-col items-center justify-center gap-3 border bg-main-ivory dark:bg-main-gray md:h-48">
          <AlertIcon className="fill-black dark:fill-white" />
          <span className="dark:text-white">
            선택할 수 있는 유저가 없습니다.
          </span>
        </div>
      )}
    </div>
  )
}

export default ReceiverList
