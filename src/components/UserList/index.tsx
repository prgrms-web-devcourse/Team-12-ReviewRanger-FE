import dayjs from 'dayjs'
import { Profile } from '..'

interface User {
  id: number
  image?: string
  name: string
  updated_at?: string
  responser_count?: number
}

interface UserListProps {
  users: User[]
}

const UserList = ({ users }: UserListProps) => {
  return (
    <div className="flex flex-col">
      {users.map((user, index) => {
        const date = dayjs(user?.updated_at?.replace('Y', ' ')).format(
          'YYYY. MM. DD, HH:mm',
        )

        return (
          <div
            key={user.id}
            className={`flex items-center justify-between border border-x-black p-2 ${
              index === users.length - 1 ? 'border-y-black' : 'border-t-black'
            }`}
          >
            <Profile name={user.name} />
            <div className="text-gray-500">
              {user.updated_at
                ? `답변날짜: ${date}`
                : `응답자 수: ${user?.responser_count}`}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default UserList
