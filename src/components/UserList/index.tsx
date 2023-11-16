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
  onClickUser?: (userId: string) => void
}
const UserList = ({
  users,
  submitAt,
  responserCount,
  onClickUser,
}: UserListProps) => {
  return (
    <ul className="flex cursor-pointer flex-col justify-center">
      {users.map((user, index) => {
        const date =
          submitAt && submitAt[index]
            ? dayjs(submitAt && submitAt[index].replace('Y', ' ')).format(
                'YYYY. MM. DD, HH:mm',
              )
            : null

        return (
          <li
            key={user.id}
            className="cursor-pointer border-b border-b-gray-400 last:border-b-0 hover:bg-main-hover-yellow dark:border-b-gray-200 dark:hover:bg-main-red-100"
          >
            <div
              onClick={() => onClickUser && onClickUser(user.id)}
              className="flex items-center justify-between px-3 py-2 text-sm md:text-lg"
            >
              <Profile name={user.name} />

              <div className="text-xs text-gray-300 dark:text-gray-100 md:text-sm">
                {date ? (
                  `답변일시: ${date}`
                ) : responserCount ? (
                  `응답자: ${responserCount && responserCount[index]}명`
                ) : (
                  <p className="text-sub-red-200">미응답</p>
                )}
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default UserList
