//NOTE - 작성자별 탭
import { useState } from 'react'
import { UserList, SearchBar } from '@/components'
import { useGetAllResponseByResponser } from '@/apis/hooks'
import { SortDropDown } from '../components'

const AllResponseReviewByResponser = ({ surveyId }: { surveyId: string }) => {
  const { data: responseByResponser } = useGetAllResponseByResponser({
    surveyId,
  }).data
  const [keyword, setKeyword] = useState('')
  const [filteredUsers, setFilteredUsers] = useState(
    responseByResponser.filter(({ user }) => {
      return user.name.includes(keyword)
    }),
  )

  const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  const sortByName = () => {
    setFilteredUsers(() =>
      [...filteredUsers].sort((a, b) => a.user.name.localeCompare(b.user.name)),
    )
  }

  const sortByResponse = () => {
    setFilteredUsers(() =>
      [...filteredUsers].sort(
        (a, b) => Number(b.isAnswered) - Number(a.isAnswered),
      ),
    )
  }

  const sortByNoResponse = () => {
    setFilteredUsers(() =>
      [...filteredUsers].sort(
        (a, b) => Number(a.isAnswered) - Number(b.isAnswered),
      ),
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <SearchBar
        handleChangeKeyword={handleChangeKeyword}
        className="flex w-full"
      />
      <div className="max-h-[30rem] max-w-[550px] overflow-auto rounded-md border border-gray-200 bg-main-yellow text-black dark:border-gray-700 dark:bg-main-red-200 dark:text-white">
        <div className="z-5 sticky top-0 flex items-center whitespace-pre-wrap border-b border-gray-200 bg-main-yellow p-3">
          <span>응답완료: </span>
          <span className="text-sub-blue dark:text-sub-skyblue">
            {
              responseByResponser.filter((value) => value.isAnswered === true)
                .length
            }
            /{responseByResponser.length}
          </span>
          <span>명</span>
          <SortDropDown
            sortByName={sortByName}
            sortByNoResponse={sortByNoResponse}
            sortByResponse={sortByResponse}
          />
        </div>

        <UserList
          users={filteredUsers
            .map((value) => value.user)
            .filter((user) => user.name.trim().includes(keyword))}
          submitAt={filteredUsers.map((value) => value.submitAt)}
        />
      </div>
    </div>
  )
}

export default AllResponseReviewByResponser
