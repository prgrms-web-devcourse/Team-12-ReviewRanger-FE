import dayjs from 'dayjs'
import { Profile } from '..'

interface User {
  id: number
  image?: string
  name: string
  submitAt?: string
  responserCount?: number
}

interface UserListProps {
  users: User[]
}

const UserList = ({ users }: UserListProps) => {
  return (
    <div className="flex flex-col rounded-md border border-x-gray-200">
      {users.map((user, index) => {
        const date = dayjs(user?.submitAt?.replace('Y', ' ')).format(
          'YYYY. MM. DD, HH:mm',
        )

        return (
          <div
            key={user.id}
            className={`flex items-center justify-between border border-x-gray-400 p-2 pl-4
             text-sm md:text-xl ${
               index === users.length - 1
                 ? 'border-y-gray-400'
                 : 'border-t-gray-400'
             }`}
          >
            <Profile name={user.name} />
            <div className="text-sm text-gray-500 md:text-xl">
              {user.submitAt
                ? `답변날짜: ${date}`
                : `응답자 수: ${user?.responserCount}`}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default UserList
