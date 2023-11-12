//NOTE - 수신자 탭
import { useState } from 'react'
import { UserList, SearchBar } from '@/components'
import { useGetAllResponseByReceiver } from '@/apis/hooks'
import { SortDropDown } from '../components'

const AllResponseReviewByResponser = ({ surveyId }: { surveyId: string }) => {
  const [keyword, setKeyword] = useState('')

  const { data } = useGetAllResponseByReceiver({ surveyId })
  const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  const filteredUsers = data.data.receiverResponses.filter((user) => {
    return user.name.includes(keyword)
  })

  return (
    <div className="flex flex-col gap-5">
      <SearchBar handleChangeKeyword={handleChangeKeyword} />
      <div className="scrollbar-hide max-h-[30rem] max-w-[550px] overflow-auto bg-main-yellow text-black dark:bg-main-red-200 dark:text-white">
        <div className="flex w-full items-center justify-between">
          <div className="flex px-3 py-4">
            수신자:
            <span className="text-sub-blue dark:text-sub-skyblue">
              {data.data.receiverResponses.length}
            </span>
            명
          </div>
          <SortDropDown />
        </div>
        <UserList users={filteredUsers ?? []} />
      </div>
    </div>
  )
}

export default AllResponseReviewByResponser
