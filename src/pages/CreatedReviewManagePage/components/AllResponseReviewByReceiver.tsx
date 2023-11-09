//NOTE - 수신자 탭
import { useState } from 'react'
import { UserList, SearchBar } from '@/components'
import { ResponseByReceiver } from '@/apis/hooks/useGetAllResponseByReceiver'
import { SortDropDown } from '../components'

const AllResponseReviewByResponser = ({ data }: ResponseByReceiver) => {
  const [keyword, setKeyword] = useState('')

  const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  const filteredUsers = data.receiverResponses.filter((user) => {
    return user.receiverName.includes(keyword)
  })

  return (
    <div className="flex flex-col gap-5">
      <SearchBar handleChangeKeyword={handleChangeKeyword} />
      <div className="max-h-[30rem] max-w-[550px] overflow-auto bg-main-yellow text-black dark:bg-main-red-200 dark:text-white">
        <UserList
          users={filteredUsers ?? []}
          title={
            <div className="flex w-full justify-between">
              <div className="flex"></div>
              <SortDropDown />
            </div>
          }
        />
      </div>
    </div>
  )
}

export default AllResponseReviewByResponser
