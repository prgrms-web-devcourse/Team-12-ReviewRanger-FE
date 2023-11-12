//NOTE - 작성자별 탭
import { useState } from 'react'
import { UserList, SearchBar } from '@/components'
import { useGetAllResponseByResponser } from '@/apis/hooks'
import { SortDropDown } from '../components'

const AllResponseReviewByResponser = ({ surveyId }: { surveyId: string }) => {
  const { data } = useGetAllResponseByResponser({ surveyId }).data
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
      <div className="scrollbar-hide max-h-[30rem] max-w-[550px] overflow-auto rounded-md border-gray-200 bg-main-yellow text-black dark:bg-main-red-200 dark:text-white">
        <div className="z-5 sticky top-0 flex w-full items-center justify-between border-l border-r border-t border-gray-200">
          <div className="flex px-3 py-4">
            응답완료:
            <span className="text-sub-blue dark:text-sub-skyblue">
              {responserCount}/{responsers.length}
            </span>
            명
          </div>
          <SortDropDown />
        </div>
        <div className="overflow-auto">
          {' '}
          {/* 이 부분을 추가했습니다. */}
          <UserList users={filteredUsers ?? []} />
        </div>
      </div>
    </div>
  )
}

export default AllResponseReviewByResponser
