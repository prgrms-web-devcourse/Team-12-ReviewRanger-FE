import { MouseEvent } from 'react'
import { useLocation } from 'react-router-dom'
import { Profile } from '@/components'
import { CheckInTheCircleIcon } from '@/assets/icons'
import { Receiver } from '@/types'

interface ReceiverItemProps {
  receiver: Receiver
  index?: number
  selectedReceiver: Receiver
  individualReplyCompletes?: boolean[]
  handleClickReceiver: (e: MouseEvent<HTMLLIElement>) => void
  checkReplyComplete?: () => void
}

const ReceiverItem = ({
  receiver,
  index,
  selectedReceiver,
  individualReplyCompletes,
  handleClickReceiver,
  checkReplyComplete,
}: ReceiverItemProps) => {
  const { state } = useLocation()
  const { receiverId, name, path } = receiver

  console.log(receiver)

  return (
    <li
      value={receiverId}
      onClick={(e) => {
        handleClickReceiver(e)
        checkReplyComplete && checkReplyComplete()
      }}
      className={`flex h-fit shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md border px-2 
              py-1.5
              ${
                selectedReceiver.receiverId === receiverId
                  ? 'border-2 border-black bg-main-yellow dark:border-white dark:bg-gray-500'
                  : 'border-gray-100 bg-white dark:border-gray-300 dark:bg-main-red-200'
              } ${
                individualReplyCompletes &&
                index !== undefined &&
                individualReplyCompletes[index] &&
                'border-1 !border-sub-green'
              } ${
                (state.status === 'END' || state.status === 'DEADLINE') &&
                'border-1 !border-sub-green'
              }`}
    >
      <Profile
        name={name}
        image={path}
        className={`${
          selectedReceiver.name === name
            ? 'text-black dark:text-white'
            : 'text-gray-300 dark:text-gray-100'
        }`}
      />
      <div className="h-4 w-4">
        {((individualReplyCompletes &&
          index !== undefined &&
          individualReplyCompletes[index]) ||
          state.status === 'END' ||
          state.status === 'DEADLINE') && (
          <CheckInTheCircleIcon className="h-4 w-4 fill-sub-green" />
        )}
      </div>
    </li>
  )
}

export default ReceiverItem
