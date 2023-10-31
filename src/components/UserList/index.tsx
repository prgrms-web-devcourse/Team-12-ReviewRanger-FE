import { Profile } from '..'

interface User {
  surveyResultId: number
  id: number
  name: string
  updatedAt?: string
  responserCount?: number
}

interface UserListProps {
  users: User[]
}

const UserList = ({ users }: UserListProps) => {
  const convertDate = (dates: string) => {
    let [date, time] = dates.split('Y')
    const timeArr = time.split(':')

    date = date.split('-').join('. ')
    time = timeArr[0] + ':' + timeArr[1]

    return date + ', ' + time
  }

  return (
    <div className="flex flex-col">
      {users.map((user, index) => (
        <div
          key={user.id}
          className={`flex flex-row items-center justify-between border border-x-black p-2 ${
            index === users.length - 1 ? 'border-y-black' : 'border-t-black'
          }`}
        >
          <Profile name={user.name} />
          <div className="text-gray-500">
            {user.updatedAt
              ? `답변날짜: ${convertDate(user.updatedAt)}`
              : `응답자 수: ${user.responserCount}`}
          </div>
        </div>
      ))}
    </div>
  )
}

export default UserList
