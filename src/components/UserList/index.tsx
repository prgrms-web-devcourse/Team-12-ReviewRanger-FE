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
  onClickUser?: ({ id, name }: { id: string; name: string }) => void
  hasDrawer?: boolean
  ResponserList?: number[]
  questionType?: 'PROCEEDING' | 'DEADLINE' | 'END'
}

const UserList = ({
  users,
  submitAt,
  responserCount,
  onClickUser,
  hasDrawer,
  ResponserList,
  questionType,
}: UserListProps) => {
  const handleClick = (id: string, name: string) => {
    onClickUser && onClickUser({ id, name })
  }

  const hasSavedResult = (id: string) => {
    return (
      typeof ResponserList !== 'undefined' &&
      ResponserList?.includes(Number(id))
    )
  }

  return (
    <ul className="flex cursor-pointer flex-col justify-center">
      {users?.map((user, index) => {
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
            {hasDrawer ? (
              <label
                htmlFor="drawer-bottom"
                className="block cursor-pointer hover:bg-main-hover-yellow hover:dark:bg-main-red-100"
              >
                <div
                  onClick={() => handleClick(user.id, user.name)}
                  className="flex items-center justify-between px-3 py-2 text-sm md:text-lg"
                >
                  <div className="flex items-center gap-2">
                    {responserCount &&
                      responserCount[index] &&
                      questionType !== 'PROCEEDING' && (
                        <span
                          className={`dot ${
                            hasSavedResult(user.id)
                              ? 'bg-blue-600'
                              : 'bg-red-600'
                          }`}
                        ></span>
                      )}
                    <Profile name={user.name} />
                  </div>
                  <div className="text-xs text-gray-300 dark:text-gray-100 md:text-sm">
                    {date ? (
                      `답변일시: ${date}`
                    ) : responserCount ? (
                      <span>
                        응답자:{responserCount && responserCount[index]}명
                      </span>
                    ) : (
                      <p className="text-sub-red-200 dark:text-sub-yellow">
                        미응답
                      </p>
                    )}
                  </div>
                </div>
              </label>
            ) : (
              <div
                onClick={() => handleClick(user.id, user.name)}
                className="flex items-center justify-between px-3 py-2 text-sm md:text-lg"
              >
                <div className="flex items-center gap-2">
                  {responserCount &&
                    responserCount[index] &&
                    questionType !== 'PROCEEDING' && (
                      <span
                        className={`dot ${
                          hasSavedResult(user.id) ? 'bg-blue-600' : 'bg-red-600'
                        }`}
                      ></span>
                    )}
                  <Profile name={user.name} />
                </div>
                <div className="text-xs text-gray-300 dark:text-gray-100 md:text-sm">
                  {date ? (
                    `답변일시: ${date}`
                  ) : responserCount ? (
                    <span>
                      응답자:{responserCount && responserCount[index]}명
                    </span>
                  ) : (
                    <p className="text-sub-red-200 dark:text-sub-yellow">
                      미응답
                    </p>
                  )}
                </div>
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default UserList
