import { useState } from 'react'
import { UserList, SearchBar } from '@/components'
import { useGetAllResponseByResponser } from '@/apis/hooks'
import { SortDropDown, NotFoundSearchUser } from '../components'

const AllResponseReviewByResponser = ({ surveyId }: { surveyId: string }) => {
  const { data: responseByResponser } = useGetAllResponseByResponser({
    surveyId,
  }).data
  const [keyword, setKeyword] = useState('')
  const [filteredUsers, setFilteredUsers] = useState(
    responseByResponser.sort((a, b) => a.user.name.localeCompare(b.user.name)),
  )

  const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  const sortByName = () => {
    setFilteredUsers((prevUsers) =>
      [...prevUsers].sort((a, b) => a.user.name.localeCompare(b.user.name)),
    )
  }

  const sortByResponse = () => {
    setFilteredUsers((prevUsers) =>
      [...prevUsers].sort(
        (a, b) => Number(b.isAnswered) - Number(a.isAnswered),
      ),
    )
  }

  const sortByNoResponse = () => {
    setFilteredUsers((prevUsers) =>
      [...prevUsers].sort(
        (a, b) => Number(a.isAnswered) - Number(b.isAnswered),
      ),
    )
  }

  const findUserBySearchKeyword = filteredUsers
    .map((value) => value.user)
    .filter((user) => user.name.trim().includes(keyword))

  const totalResponses = responseByResponser.length
  const completedResponses = responseByResponser.filter(
    (value) => value.isAnswered === true,
  ).length

  return (
    <div className="flex flex-col gap-5">
      <SearchBar
        handleChangeKeyword={handleChangeKeyword}
        className="flex w-full"
      />

      <div className="rounded-md border border-gray-200 bg-main-yellow text-black dark:border-gray-100 dark:bg-main-red-200 dark:text-white md:max-h-[24rem]">
        {findUserBySearchKeyword.length ? (
          <>
            <header className="flex items-center whitespace-pre-wrap rounded-t-md border-b border-b-gray-100 bg-main-yellow p-3 text-xs dark:border-b-gray-200 dark:bg-main-red-200 md:text-sm">
              <span>응답완료: </span>
              <span className="text-sub-blue dark:text-sub-skyblue">
                {completedResponses}/{totalResponses}명
              </span>
              <SortDropDown
                sortByName={sortByName}
                sortByNoResponse={sortByNoResponse}
                sortByResponse={sortByResponse}
              />
            </header>
            <div className="max-h-80 overflow-auto">
              <UserList
                users={findUserBySearchKeyword}
                submitAt={filteredUsers.map((value) => value.submitAt)}
              />
            </div>
          </>
        ) : (
          <NotFoundSearchUser />
        )}
      </div>
    </div>
  )
}

export default AllResponseReviewByResponser
