//NOTE - 수신자 탭
import { useState } from 'react'
import { UserList, SearchBar } from '@/components'
import { useGetAllResponseByReceiver } from '@/apis/hooks'
import { SortDropDown } from '../components'

const AllResponseReviewByResponser = ({ surveyId }: { surveyId: string }) => {
  const [keyword, setKeyword] = useState('')

  const { data: responseByReceiver } = useGetAllResponseByReceiver({
    surveyId,
  }).data

  const [filteredUsers, setFilteredUsers] = useState(
    responseByReceiver.receiverResponses.filter((user) => {
      return user.user.name.includes(keyword)
    }),
  )

  const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  const sortByName = () => {
    setFilteredUsers(() =>
      [...filteredUsers].sort((a, b) => a.user.name.localeCompare(b.name)),
    )
  }

  const sortByResponse = () => {
    setFilteredUsers(() =>
      [...filteredUsers].sort((a, b) => a.responserCount - b.responserCount),
    )
  }

  const sortByNoResponse = () => {
    setFilteredUsers(() =>
      [...filteredUsers].sort((a, b) => b.responserCount - a.responserCount),
    )
  }

  const findUserBySearchKeyword = filteredUsers
    .map((value) => value.user)
    .filter((user) => user.name.trim().includes(keyword))

  return (
    <div className="flex flex-col gap-5">
      <SearchBar handleChangeKeyword={handleChangeKeyword} />
      <div className="max-h-[30rem] max-w-[550px] overflow-auto rounded-md border border-gray-200 bg-main-yellow text-black dark:border-gray-700 dark:bg-main-red-200 dark:text-white">
        <div className="z-5 sticky top-0 flex items-center whitespace-pre-wrap border-b border-gray-200 bg-main-yellow p-3">
          <span>수신자: </span>
          <span className="text-sub-blue dark:text-sub-skyblue">
            {responseByReceiver.receiverResponses.length}
          </span>
          <span>명</span>
          <SortDropDown
            sortByName={sortByName}
            sortByNoResponse={sortByNoResponse}
            sortByResponse={sortByResponse}
          />
        </div>
        <UserList
          users={findUserBySearchKeyword}
          responserCount={filteredUsers.map((value) => value.responserCount)}
        />
      </div>
    </div>
  )
}

export default AllResponseReviewByResponser
