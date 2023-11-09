//NOTE - 작성자별 탭
import { useState } from 'react'
import { UserList, SearchBar } from '@/components'
import { ResponseByResponser } from '@/apis/hooks/useGetAllResponseByResponser'

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
        className="flex w-full "
      />
      <div className="bg-white">
        <UserList
          users={filteredUsers ?? []}
          title={
            <div>
              응답완료:
              <span className="text-sub-blue">
                {responserCount}/{responsers.length}
              </span>
              명
            </div>
          }
        />
      </div>
    </div>
  )
}

export default AllResponseReviewByResponser
