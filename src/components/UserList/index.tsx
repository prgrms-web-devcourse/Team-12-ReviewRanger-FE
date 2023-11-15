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
    <div className="flex cursor-pointer flex-col">
      {users.map((user, index) => {
        const date =
          submitAt && submitAt[index]
            ? dayjs(submitAt && submitAt[index].replace('Y', ' ')).format(
                'YYYY. MM. DD, HH:mm',
              )
            : null

        return (
          <div
            key={user.id}
            className="block cursor-pointer hover:bg-main-hover-yellow dark:hover:bg-main-red-100"
          >
            <div
              onClick={() => onClickUser && onClickUser(user.id)}
              className={`flex items-center justify-between p-2 pl-4 text-sm md:text-xl ${
                index === users.length - 1
                  ? 'border border-y-gray-400'
                  : 'border border-t-gray-400'
              }`}
            >
              <Profile name={user.name} />

              <div className="text-sm text-gray-500 md:text-xl ">
                {date ? (
                  `답변일시: ${date}`
                ) : responserCount ? (
                  `응답자: ${responserCount && responserCount[index]}명`
                ) : (
                  <p className="text-sub-red-200">미응답</p>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default UserList
