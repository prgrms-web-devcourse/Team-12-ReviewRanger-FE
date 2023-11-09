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
    <>
      <div>responsers : {responserCount}</div>
      <SearchBar handleChangeKeyword={handleChangeKeyword} className="w-full" />
      <UserList users={filteredUsers ?? []} />
    </>
  )
}

export default AllResponseReviewByResponser
