import dayjs from 'dayjs'
import { Profile } from '..'

interface User {
  id: string
  image?: string
  name: string
}

interface UserListProps {
  users: User[]
  submitAt?: string[]
  responserCount?: number[]
}

const UserList = ({ users, submitAt, responserCount }: UserListProps) => {
  return (
    <div className="flex flex-col">
      {users.map((user, index) => {
        const date =
          submitAt && submitAt[index]
            ? dayjs(submitAt && submitAt[index].replace('Y', ' ')).format(
                'YYYY. MM. DD, HH:mm',
              )
            : '미응답'

        return (
          <div
            key={user.id}
            className={`hover:bg-main-hover-yellow flex cursor-pointer items-center justify-between p-2 pl-4
            text-sm md:text-xl ${
              index === users.length - 1
                ? 'border border-y-gray-400'
                : 'border border-t-gray-400'
            }`}
          >
            <Profile name={user.name} />
            <div className="text-sm text-gray-500 md:text-xl">
              {!submitAt && !responserCount
                ? '미응답'
                : submitAt
                ? `답변날짜: ${date}`
                : `응답자 수: ${responserCount && responserCount[index]}`}
            </div>

            <div></div>
          </div>
        )
      })}
    </div>
  )
}

export default UserList
