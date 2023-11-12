//NOTE - 수신자 탭
import { useState } from 'react'
import { UserList, SearchBar } from '@/components'
import { useGetAllResponseByReceiver } from '@/apis/hooks'
import { SortDropDown } from '../components'

const AllResponseReviewByResponser = ({ surveyId }: { surveyId: string }) => {
  const [keyword, setKeyword] = useState('')

  const { data } = useGetAllResponseByReceiver({ surveyId }).data
  const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  const filteredUsers = data.receiverResponses.filter((user) => {
    return user.name.includes(keyword)
  })

  return (
    <div className="flex flex-col gap-5">
      <SearchBar handleChangeKeyword={handleChangeKeyword} />
      <div className="scrollbar-hide max-h-[30rem] max-w-[550px] overflow-auto rounded-md border-gray-200 bg-main-yellow text-black dark:bg-main-red-200 dark:text-white">
        <div className="z-5 sticky top-0 flex w-full items-center justify-between border-l border-r border-t border-gray-200">
          <div className="sticky flex px-3 py-4">
            수신자:
            <span className="text-sub-blue dark:text-sub-skyblue">
              {data.receiverResponses.length}
            </span>
            명
          </div>
          <SortDropDown />
        </div>
        <UserList users={filteredUsers} />
      </div>
    </div>
  )
}

export default AllResponseReviewByResponser
