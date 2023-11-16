import { useState } from 'react'
import { UserList, SearchBar } from '@/components'
import { useGetAllResponseByReceiver } from '@/apis/hooks'
import { NotFoundSearchUser } from '../components'

const AllResponseReviewByResponser = ({ surveyId }: { surveyId: string }) => {
  const [keyword, setKeyword] = useState('')

  const { data: responseByReceiver } = useGetAllResponseByReceiver({
    surveyId,
  })

  const [filteredUsers] = useState(
    responseByReceiver.data.receiverResponses.sort((a, b) =>
      a.user.name.localeCompare(b.name),
    ),
  )

  const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  const findUserBySearchKeyword = filteredUsers
    .map((value) => value.user)
    .filter((user) => user.name.trim().includes(keyword))

  const shouldDisplayUserList =
    findUserBySearchKeyword.length !== 0 ||
    responseByReceiver.data.receiverResponses.length === 0

  return (
    <div className="flex flex-col gap-5">
      <SearchBar handleChangeKeyword={handleChangeKeyword} />
      <div className="rounded-md border border-gray-200 bg-main-yellow text-black dark:border-gray-100 dark:bg-main-red-200 dark:text-white md:max-h-[24rem]">
        <header className="flex items-center whitespace-pre-wrap rounded-md border-b border-b-gray-100 bg-main-yellow p-3 text-xs dark:border-b-gray-200 dark:bg-main-red-200 md:text-sm">
          <span>수신자: </span>
          <span className="text-sub-blue dark:text-sub-skyblue">
            {responseByReceiver.data.receiverResponses.length}
          </span>
          <span>명</span>
        </header>

        {shouldDisplayUserList ? (
          <div className="max-h-80 overflow-auto">
            <UserList
              users={findUserBySearchKeyword}
              responserCount={filteredUsers.map(
                (value) => value.responserCount,
              )}
            />
          </div>
        ) : (
          <NotFoundSearchUser />
        )}
      </div>
    </div>
  )
}

export default AllResponseReviewByResponser
