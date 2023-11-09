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
  //NOTE - 유저리스트 위에 표시될 문자들 ex)응답완료 몇명
  title?: React.ReactNode
}

const UserList = ({ users, title }: UserListProps) => {
  return (
    <div className="flex flex-col rounded-md border border-x-gray-200">
      <div className="px-3 py-4">{title}</div>
      {users.map((user, index) => {
        const date = dayjs(user?.submitAt?.replace('Y', ' ')).format(
          'YYYY. MM. DD, HH:mm',
        )

        return (
          <div
            key={user.id}
            className={`flex items-center justify-between border border-x-gray-400 p-2
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
