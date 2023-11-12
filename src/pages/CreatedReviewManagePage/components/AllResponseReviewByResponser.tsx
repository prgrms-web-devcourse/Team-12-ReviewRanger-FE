//NOTE - 작성자별 탭
import { useState } from 'react'
import { UserList, SearchBar } from '@/components'
import { ResponseByResponser } from '@/apis/hooks/useGetAllResponseByResponser'
import { SortDropDown } from '../components'

const AllResponseReviewByResponser = ({ data }: ResponseByResponser) => {
  const { responserCount, responsers } = data
  const [keyword, setKeyword] = useState('')

  const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  const filteredUsers = responsers?.filter((user) => {
    return user.name.includes(keyword)
  })

  return (
    <div className="flex flex-col gap-5">
      <SearchBar
        handleChangeKeyword={handleChangeKeyword}
        className="flex w-full"
      />
      <div className="scrollbar-hide max-h-[30rem] max-w-[550px] overflow-auto bg-main-yellow text-black dark:bg-main-red-200 dark:text-white">
        <div className="flex w-full items-center justify-between">
          <div className="flex px-3 py-4">
            응답완료:
            <span className="text-sub-blue dark:text-sub-skyblue">
              {responserCount}/{responsers.length}
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